import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Admin } from '../models/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminsService {

  url = 'http://127.0.0.1:3000/admin';
  constructor(private http: HttpClient) { }
  getAdmin(admin_id: string): Observable<Admin> {
    return this.http.get<Admin>(`${this.url}/getAdmin/${admin_id}`);
  }

  addAdmin(admin: Admin): Observable<Admin> {
    return  this.http.post<Admin>(`${this.url}/registre`, admin);
  }
  updateAdmin(admin_id:string, adminCor: any): Observable<any> {
    return this.http.post<any>(`${this.url}/update/${admin_id}`, adminCor);
  }
 
}
