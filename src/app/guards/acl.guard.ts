import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../authentication/services/login.service';

@Injectable({
    providedIn: 'root'
})
export class AclGuard implements CanActivate {

    constructor(
        private loginService: LoginService,
        private router: Router
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const loggedUser = this.loginService.getUserFromStorage();

        if (loggedUser.organisationName == undefined) {
            window.alert("Login as an organisation to have access to this page!");
            this.router.navigate(['/']);

            return false;
        }

        return true;
    }
}