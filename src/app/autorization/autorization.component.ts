import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { AuthorizationService } from './autorization.service';
import { NgForm } from '@angular/forms';
import {AuthData} from './autorization.model'
import { LoginID } from './loginId.model';
import { Observable } from 'rxjs/internal/Observable';
import { Client } from '../clients/client.model';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-autorization',
  templateUrl: './autorization.component.html',
  styleUrls: ['./autorization.component.css'],
  
})
export class AutorizationComponent  {
  public value:AuthData;
  public _authData: [LoginID, Client];
  public authStatus: boolean = false;
  
  constructor(private authorizationService: AuthorizationService, private appComponent: AppComponent) {
  //  this.authService = authorizationService;
  }

  public login(form:NgForm): void {
    this.value = form.value;
    console.log(this.value.userName);
    console.log(this.value.password);
    this.authorizationService.login(this.value);
    this.appComponent.authLogin();
  }

 /* get sessionId(): string{
    return this._authData[0].sessionId;
  }
  get profile(): Client{
    return this._authData[1];
  }*/
}
