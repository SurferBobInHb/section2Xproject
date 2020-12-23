import { FakeBackendInterceptor } from "./fake-backend";

export class JwtHelper {

    decodeToken(token) {
        return FakeBackendInterceptor.getUserNameFromToken(token);
    }

    static tokenNotExpired(token) : string {
        let tokenNotExpired = localStorage.getItem(token);
        console.log('tokenNotExpired 1 = ' + tokenNotExpired);
        tokenNotExpired = tokenNotExpired || null;
        console.log('tokenNotExpired 2 = ' + tokenNotExpired);
        return tokenNotExpired;
    }
}