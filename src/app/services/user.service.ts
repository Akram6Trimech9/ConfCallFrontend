import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { employee } from '../models/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://127.0.0.1:3000/client';
  employees: any =[] ; 
  token!: string;
  employeeAuth!: employee; 
  constructor(private http:HttpClient) { }
  

  singupEmployee(employeecor:any): Observable<any> {
    return  this.http.post<any>(`${this.url}/register`, employeecor);
  }

  
   signInemployee(employeecor:any): Observable<any> {
    return  this.http.post<any>(`${this.url}/login`, employeecor);
  }

  loggedIn(): boolean {
    return localStorage.getItem('access_token') !== null ;
  }

  logOut(): void{
    this.token ='';
    localStorage.removeItem('access_token');
  }

   getuserloggedin(token : any){
    this.token = token;
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    var tokenInfo = JSON.parse(window.atob(base64));
    this.getemployee(tokenInfo.employee_id).subscribe(
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
    this.getemployee(tokenInfo.employee_id).subscribe(
      (data) =>{
        this.initializeremployeeAuth(data);
      }
    ); }
    initializeLocalStorage(token: string): void{
      localStorage.setItem('access_token', token);
    }
    initializeremployeeAuth(employee: employee): void{
        this.employeeAuth = employee;
    }
  
 getemployee(employee_id: string ): Observable<employee>{
return this.http.get<employee>(`${this.url}/getEmployee/${employee_id}`)
 }   
 getallemployee():Observable<employee[]> {
   return this.http.get<employee[]>(`${this.url}/getAll`)
 }
 deleteEmployee(employee_id: any): Observable<employee>{
 return this.http.delete<employee>(`${this.url}/delete/${employee_id}`)
}
UpdateEmployee(employee_id: any ,newemployee: any ) : Observable<any>{
  return this.http.post<any>(`${this.url}/update/${employee_id}`,newemployee)
}
}
