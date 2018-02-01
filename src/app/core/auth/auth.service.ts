import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import * as jwt_decode from 'jwt-decode';
import { environment } from '@env/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '@app/core/auth/user';
import { Observable } from 'rxjs/Observable';

export const TOKEN_NAME = 'jwt_token';

@Injectable()
export class AuthService {

  private tokenUrl = environment.apiUrl + '/token';
  private refreshUrl = environment.apiUrl + '/refresh';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private currentUserSubject = new BehaviorSubject<User>(null);

  constructor(private http: Http) {
    const token = this.getToken();
    this.currentUserSubject.next(this.getCurrentUserFromToken(token));
  }

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  private setToken(token: string): void {
    if (token == null) {
      localStorage.removeItem(TOKEN_NAME);
    }
    localStorage.setItem(TOKEN_NAME, token);
  }

  getTokenExpirationDate(): Date {
    const token = this.getToken();

    if (!token) {
      return null;
    }

    const decoded: any = jwt_decode(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      token = this.getToken();
    }

    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate();
    if (date === undefined) {
      return false;
    }
    return !(date.valueOf() > new Date().valueOf());
  }

  login(user, password): Promise<string> {
    return this.http
      .post(`${this.tokenUrl}`, JSON.stringify({'username': user, 'password': password}), { headers: this.headers })
      .toPromise()
      .then(res => {
          const token = res.json().accessToken;
          this.setToken(token);
          const userData = this.getCurrentUserFromToken(token);

          this.currentUserSubject.next(userData);

          return res.text();
        });
  }

  refreshAuthToken(): Promise<string> {
    return this.http
      .get(this.refreshUrl,
        { headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': 'bearer ' + this.getToken()}) })
      .toPromise()
      .then(res => {
        const token = res.json().accessToken;
        this.setToken(token);

        return res.text();
      });
  }

  private getCurrentUserFromToken(token: string): User {
    if (!token || token == null) {
      return null;
    }
    const decoded: any = jwt_decode(token);
    const userData = new User(decoded.sub, decoded.Name, decoded.Email);

    return userData;
  }

  logout() {
    this.setToken(null);
    this.currentUserSubject.next(null);
  }

  currentUser(): Observable<User> {
    return this.currentUserSubject.asObservable();
  }
}
