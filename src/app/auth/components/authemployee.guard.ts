import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthemployeeGuard implements   CanActivate{
  constructor(private authService: UserService, private router: Router){}
  canActivate(_route:ActivatedRouteSnapshot, _state: RouterStateSnapshot):Observable<boolean> | Promise<boolean> | boolean{
      if(this.authService.loggedIn())
      {
          return true;
      }
      else{
          this.router.navigate(['/signin']);
          return false;
      }
  } 
  
}
