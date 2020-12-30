import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { domain } from 'process';
import { MyUser } from 'src/app/ana/login/my-user';

// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    users: MyUser [];

    constructor () {
        users.push({username: "mosh@domain.com", password: "1234", role: "admin"});
        users.push({username: "mosh1@domain.com", password: "1234", role: "customer"});
        users.push({username: "bob", password: "1234", role: "admin"});
        users.push({username: "nay", password: "1234", role: "customer"});
    }

    getUserNameFromToken(token: string) : MyUser {
        if (token === 'fake-jwt-token0') return  users[0];
        if (token === 'fake-jwt-token1') return  users[1];
        if (token === 'fake-jwt-token2') return  users[2];
        if (token === 'fake-jwt-token3') return  users[3];
        return {username: "no user for the token in fake backend", password: "", role: ""};
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                case url.endsWith('/api/authenticate') && method === 'POST':
                        return authenticate();
                case url.endsWith('/users/register') && method === 'POST':
                    return register();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.match(/\/users\/\d+$/) && method === 'DELETE':
                    return deleteUser();
                default:
                    console.log("didn't find url in fakeback end - " + url);
                    // pass through any requests not handled above
                    return next.handle(request);
            }    
        }

        // route functions

        function authenticate() {
            const { username, password } = JSON.parse(body);
            let user = users.find(x => x.username === username && x.password === password);
            if (!user) 
                return error('Username or password is incorrect');

            let fakejwttoken;

            if (username === 'nay') {
                fakejwttoken = "fake-jwt-token3";
                user = {username: username, password: password, id: 1, firstName: "nay", lastName: "ddd"};
            }
            if (username === 'bob') {
                fakejwttoken = "fake-jwt-token2";
                user = {username: username, password: password, id: 1, firstName: "bob", lastName: "ddd"};
            }
            if (username === 'mosh1@domain.com') {
                fakejwttoken = "fake-jwt-token1";
                user = {username: username, password: password, id: 1, firstName: "mosh1", lastName: "ddd"};
            }
            if (username === 'mosh@domain.com') {
                fakejwttoken = "fake-jwt-token0";
                user = {username: username, password: password, id: 1, firstName: "mosh", lastName: "ddd"};
            }

            return ok({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token: fakejwttoken
            })
        }

        function register() {
            const user = body

            if (users.find(x => x.username === user.username)) {
                return error('Username "' + user.username + '" is already taken')
            }

            user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));

            return ok();
        }

        function getUsers() {
            if (!isLoggedIn()) return unauthorized();
            return ok(users);
        }

        function deleteUser() {
            if (!isLoggedIn()) return unauthorized();

            users = users.filter(x => x.id !== idFromUrl());
            localStorage.setItem('users', JSON.stringify(users));
            return ok();
        }

        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};