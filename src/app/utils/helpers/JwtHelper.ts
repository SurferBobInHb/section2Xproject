import { MyUser } from "src/app/ana/login/my-user";
import { FakeBackendInterceptor } from "./fake-backend";

export class JwtHelper {

    decodeToken(token) : MyUser {
        let fakeBackendInterceptor = new FakeBackendInterceptor();
        return fakeBackendInterceptor.getUserNameFromToken(token);
    }

    static tokenNotExpired(token) : string {
        let tokenNotExpired = localStorage.getItem(token);
        tokenNotExpired = tokenNotExpired || null;
        return tokenNotExpired;
    }
}