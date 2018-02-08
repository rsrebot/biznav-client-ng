import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import {TOKEN_NAME, AuthService} from './auth.service';
import { Log, Level } from 'ng2-logger/client';
import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
// import 'rxjs/add/operator/throw';

const AUTH_HEADER_KEY = 'Authorization';
const AUTH_PREFIX = 'Bearer';
const REFRESH_WINDOW_SECS = 60 * 15;
const log = Log.create('AuthInterceptor');

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
      private authService: AuthService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const expDate = this.authService.getTokenExpirationDate();
    if (expDate) {
      // TODO: might want to store the expiration data unencoded and use it instead of decoding the token
      const token = this.authService.getToken();
      const now = new Date();

      const secondsUntilExpiration = (expDate.getTime() - now.getTime()) / 1000;
      if (secondsUntilExpiration > 0 && secondsUntilExpiration < REFRESH_WINDOW_SECS) {
        // refresh token
        this.authService.refreshAuthToken().then(res => {
          log.info('Token refreshed!');
        }).catch(err => {
          log.warn('Failed to refresh token', err);
        });
      }

      let headers = new HttpHeaders();
      headers = req.headers.append('Accept', 'application/json');
      headers = headers.append(AUTH_HEADER_KEY, `${AUTH_PREFIX} ${token}`);

      req = req.clone({headers: headers});
    }

    return next.handle(req)
    // .map((event: HttpEvent<any>) => {
    //   return event;
    // });
    .catch(err => {
      if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigateByUrl('/login');
          }
      }
      return Observable.throw(err);
    });
  }
}
