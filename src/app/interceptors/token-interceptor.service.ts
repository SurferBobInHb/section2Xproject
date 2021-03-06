import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

/*
NOTE: USING JwtInterceptor AND TOKEN-INTERCEPTOR. BOTH DO THE SAME THING.  THIS WAS DONE FOR TESTING DURING LEARNING
*/

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(this.addAuthenticationToken(request));
  }

  addAuthenticationToken(request: HttpRequest<any>) {
    const accessToken = this.auth.getAccessToken();
    if (!accessToken) {
      return request;
    }

    // We clone the request, because the original request is immutable
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ` + accessToken
      }
    });
  }
}
