import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthData } from './autorization.model';
import { Client } from '../clients/client.model';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  public loginProcess: Observable<any>;

  constructor(private http: HttpClient) { }

  public login(authData: AuthData) {
    
    let body = `username=${authData.userName}&password=${authData.password}`
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    this.loginProcess = this.http.post<'token'>('/loginAction',body,options);

    }
}
