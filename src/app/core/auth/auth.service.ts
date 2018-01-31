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

  private url = environment.apiUrl + '/token';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private currentUserSubject = new BehaviorSubject<User>(null);

  constructor(private http: Http) {
    const token = this.getToken();
    this.currentUserSubject.next(this.getCurrentUserFromToken(token));
  }

  private getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  private setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
  }

  getTokenExpirationDate(token: string): Date {
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

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }
    return !(date.valueOf() > new Date().valueOf());
  }

  login(user, password): Promise<string> {
    return this.http
      .post(`${this.url}`, JSON.stringify({'username': user, 'password': password}), { headers: this.headers })
      .toPromise()
      .then(res => {
          const token = res.json().accessToken;
          this.setToken(token);
          const userData = this.getCurrentUserFromToken(token);

          this.currentUserSubject.next(userData);

          return res.text();
        });
  }

  private getCurrentUserFromToken(token: string): User {
    if (token == null) {
      return null;
    }
    const decoded: any = jwt_decode(token);
    const userData = new User(1, 'Test User', 'rsrebot@gmail.com');

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
