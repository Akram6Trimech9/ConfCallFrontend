import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {equipe} from '../models/equipe';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipeService {
  url = 'http://127.0.0.1:3000/equipe';
  constructor(private http : HttpClient) {}
    getAllEquipe(): Observable<equipe[]> {
      return this.http.get<equipe[]>(`${this.url}/getAll`);
    }
    addEquipe(equipe: any): Observable<any> {
      return  this.http.post<any>(`${this.url}/create`, equipe);
    }
    addemployeetoequi(employeeId : string , equipeId : string  , employee : any ) :  Observable<any> {
      return  this.http.post<any>(`${this.url}/addEmployeeToEquipe/${employeeId}/${equipeId}`, employee);
    }
  
    getEquipe(_id: string): Observable<equipe> {
      return this.http.get<equipe>(`${this.url}/${_id}`);
    }
    updateequipe(formdata: any, _id:string): Observable<any> {
      return this.http.post<any>(`${this.url}/update/${_id}`, formdata);
    }
    deleteEquipe(_id: string): Observable<any> {
      return this.http.delete<any>(`${this.url}/delete/${_id}`)
    }
   
}
