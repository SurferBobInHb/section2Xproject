import { FakeBackendInterceptor } from './../utils/helpers/fake-backend';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtHelper } from '../utils/helpers/JwtHelper';
import { MyUser } from '../ana/login/my-user';

@Injectable()
export class AuthService {
  currentUser: MyUser;

  constructor(private http: HttpClient) {
    let token = localStorage.getItem('token');
    if (token) {
      let jwtHelper = new JwtHelper();
      let jwt: string = localStorage.getItem('token');
      this.currentUser = jwtHelper.decodeToken(jwt);
    }
  }

  getAccessToken () : string {
    let token = localStorage.getItem('token');
    return token;
  }

  login(credentials) {
    return this.http.post('/api/authenticate', JSON.stringify(credentials)).pipe(map(response => {
      let result: any = response;
      if (result && result.token) {
        localStorage.setItem('token', result.token);
        let jwtHelper = new JwtHelper();
        this.currentUser = jwtHelper.decodeToken(result.token);
        return true;
      }
      else
        return false
    }));
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUser = null;
  }

  isLoggedIn() {
    let token = JwtHelper.tokenNotExpired('token');
    let q: boolean = token != null;
    if (q) {
      let jwtHelper = new JwtHelper();
      this.currentUser = jwtHelper.decodeToken(token);
    }
    return q;
  }
}

