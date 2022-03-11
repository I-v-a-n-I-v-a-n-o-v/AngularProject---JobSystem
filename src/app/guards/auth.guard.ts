import { CanLoad, Route, Router, UrlSegment } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from '../authentication/services/login.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanLoad {

    constructor(
        private loginService: LoginService,
        private router: Router
    ) {
    }

    canLoad(route: Route, segments: UrlSegment[]): boolean {
        const loggedUser = this.loginService.getUserFromStorage();

        if (!loggedUser) {
            // this.router.navigate(['/authentication', 'login']);
            this.router.navigate(['/login']);
            return false;
        }

        return true;
    }
}