import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Admin } from '../models/admin';
import { AdminsService } from './admins.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://127.0.0.1:3000/admin';
  token!: string;
 adminAuth!: Admin;
  constructor(private http: HttpClient, private adminsService:AdminsService) { }
  signUpAdmin(admin: Admin): Observable<any> {
    return  this.http.post<any>(`${this.url}/register`, admin);
  }
  signInAdmin(adminCor: any): Observable<any> {
    return  this.http.post<any>(`${this.url}/login`, adminCor);
  }
  loggedIn(): boolean {
    return localStorage.getItem('access_token') !== null ;
  }
  logOut(): void{
    this.token ='';
    localStorage.removeItem('access_token');
  }
   getadminloggedin(token : any){
    this.token = token;
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    var tokenInfo = JSON.parse(window.atob(base64));
    this.adminsService.getAdmin(tokenInfo.admin_id).subscribe(
      (data) =>{
return data
      }
    );
   }
  getTokenClaims(token: any){
    this.token = token;
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    var tokenInfo = JSON.parse(window.atob(base64));
    this.adminsService.getAdmin(tokenInfo.admin_id).subscribe(
      (data) =>{
        this.initializerAdminAuth(data);
      }
    );
  }
  initializeLocalStorage(token: string): void{
    localStorage.setItem('access_token', token);
  }
  initializerAdminAuth(admin: Admin): void{
      this.adminAuth = admin;
  }


}
