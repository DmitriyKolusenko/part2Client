import { Component, Input, Injectable, OnInit } from '@angular/core';
import {AutorizationComponent} from './autorization/autorization.component'
import { Observable } from 'rxjs';
import { Client } from './clients/client.model';
import { AuthorizationService } from './autorization/autorization.service';
import { LoginID } from './autorization/loginId.model';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthorizationService]
})
@Injectable()
export class AppComponent implements OnInit {
  title = 'TS-Shop';
  public _authData: string;
  public authStatus: boolean = false;
  public _client: Client;
  //public xhr: XMLHttpRequest = new XMLHttpRequest()
  constructor(private authorizationService: AuthorizationService, private router: Router,
    private http: HttpClient){  
  }

  ngOnInit(): void { 
  //  this.addStatus = this.authorizationSerice.authStatus
  
  }

  public authLogin(): void{
    let that = this;
    this.authorizationService.loginId.subscribe(
      (data) => {
        //that._authData = this.authorizationService.currentUser;
        that._authData = data['token'];
       // this.xhr.open('GET',that._authData,false);
        
        console.log(that._authData);
        let token: string = that._authData;
        console.log(that.authStatus);
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.set('x-auth-token', token);
        //headers = headers.append('x-requested-with', token);
        console.log(token);
        console.log(headers);
        this.http.get<Client>('http://localhost:8080/api/clients/user',
         {headers : headers}).subscribe(
           (client: Client)=> {
             this._client = client;
             console.log(this._client);
             that.authStatus = true;
             that.router.navigate(['/profile']);
           }
         )       
      },
      (error) => {
        console.log(error);
      }
      )
      
  }

  public hasRole(role: string): boolean {
    return this._client.roles == role;
  }
  
  get addStatus(): boolean {
    return this.authStatus;
  }

  get sessionId(): string{
    return this._authData;
  }

  get profile(): Client{
    return this._client;
  }
}
