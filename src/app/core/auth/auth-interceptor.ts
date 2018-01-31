import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import {TOKEN_NAME, AuthService} from './auth.service';


const AUTH_HEADER_KEY = 'Authorization';
const AUTH_PREFIX = 'Bearer';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
      private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const expDate = this.authService.getTokenExpirationDate();
    if (expDate) {
      // TODO: might want to store the expiration data unencoded and use it instead of decoding the token
      // const expDate = this.authService.getTokenExpirationDate();
      const token = this.authService.getToken();
      const now = new Date();

      const secondsUntilExpiration = (expDate.getTime() - now.getTime()) / 1000;
      if (secondsUntilExpiration > 0 && secondsUntilExpiration < 30) {
        // refresh token
        this.authService.refreshAuthToken().then(res => {
          // token refreshed
        }).catch(err => {
          // log ?
        });
      }

      let headers = new HttpHeaders();
      headers = req.headers.append('Accept', 'application/json');
      headers = headers.append(AUTH_HEADER_KEY, `${AUTH_PREFIX} ${token}`);

      req = req.clone({headers: headers});
    }

    return next.handle(req);
  }
}