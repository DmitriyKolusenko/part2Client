import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthData } from './autorization.model';
import { LoginID } from './loginId.model';
import { Client } from '../clients/client.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  public loginId: Observable<String>;
  public currentUser: Client;
//  public str: string;
//  public authStatus:boolean = false;
  constructor(private http: HttpClient) { }

  public login(authData: AuthData): Observable<String> {
    let body = `username=${authData.userName}&password=${authData.password}`
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    this.loginId = this.http.post<'token'>('http://localhost:8080/loginAction',body,options);//{
    return this.loginId;
  }
}
