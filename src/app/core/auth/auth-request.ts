import { Headers, Http, BaseRequestOptions } from '@angular/http';
import { TOKEN_NAME } from './auth.service';
import { AuthService } from "@app/core";

const AUTH_HEADER_KEY = 'Authorization';
const AUTH_PREFIX = 'Bearer';

export class AuthRequestOptions extends BaseRequestOptions {
  
  constructor(
      private authService: AuthService) {
    super();
    
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

      this.headers.append(AUTH_HEADER_KEY, `${AUTH_PREFIX} ${token}`);
    }
  }

}