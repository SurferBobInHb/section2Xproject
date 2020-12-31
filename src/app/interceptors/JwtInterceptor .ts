import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

/*
NOTE: USING JwtInterceptor AND TOKEN-INTERCEPTOR. BOTH DO THE SAME THING.  THIS WAS DONE FOR TESTING DURING LEARNING
*/

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = this.authenticationService.currentUser;
        let token = this.authenticationService.getAccessToken();
        if (currentUser && token) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ` + token
                }
            });
        }

        console.log(request.headers);
        return next.handle(request);
    }
}