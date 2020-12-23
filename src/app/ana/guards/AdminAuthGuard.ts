import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { MyUser } from "../login/my-user";

@Injectable()
export class AdminAuthGuard implements CanActivate {

    constructor(protected router: Router, protected authService: AuthService) { }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        let user: MyUser = this.authService.currentUser;
        let ans = user.role === "admin";
        if (ans) return true;

        this.router.navigate(['/no-access']);
        
    }
    
}