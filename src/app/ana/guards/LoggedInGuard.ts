import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { MyUser } from "../login/my-user";

@Injectable()
export class LoggedInGuard implements CanActivate {

    constructor(protected router: Router, protected authService: AuthService) { }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        let user: MyUser = this.authService.currentUser;
        if (user == null) {
            this.router.navigate(['ana/login'], { queryParams: { returnUrl: state.url }});
            return false;
        }

        return true;
        
    }
    
}