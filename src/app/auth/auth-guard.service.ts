import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private authService: AuthService, private router: Router){}
    canActivate(_route:ActivatedRouteSnapshot, _state: RouterStateSnapshot):Observable<boolean> | Promise<boolean> | boolean{
        if(this.authService.loggedIn())
        {
            return true;
        }
        else{
            this.router.navigate(['/adminlogin']);
            return false;
        }
    }
    
}