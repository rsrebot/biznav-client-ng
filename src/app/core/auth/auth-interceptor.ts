import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {TOKEN_NAME, AuthService} from './auth.service';


const AUTH_HEADER_KEY = 'Authorization';
const AUTH_PREFIX = 'Bearer';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
      private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const token = localStorage.getItem(TOKEN_NAME);
    if(token) {
      // TODO: might want to store the expiration data unencoded and use it instead of decoding the token
      const expDate = this.authService.getTokenExpirationDate(token);
      const now = new Date().getUTCDate();

      let secondsUntilExpiration = (expDate.getTime() - now) / 1000;
      if(secondsUntilExpiration > 0 && secondsUntilExpiration < 10){
        // refresh token
        // service.refresh(token);
      }

      req.headers.append(AUTH_HEADER_KEY, `${AUTH_PREFIX} ${token}`);
    }

    return next.handle(req);
  }
}