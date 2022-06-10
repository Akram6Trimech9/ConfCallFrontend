import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  url = 'http://127.0.0.1:3000/admin';// backend url 

  constructor(private httpClient:HttpClient) { }//we call a httpclient module for communicate with our backend
  
  postAdmin(admin: any): Observable<any> {
    return  this.httpClient.post<any>(`${this.url}/create`, admin);
  }///function  
}
