import { Component } from '@angular/core';
import { AuthorizationService } from '../autorization/autorization.service';
import { Client } from '../clients/client.model';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { ProfileService } from './profile.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  
})
export class ProfileComponent  {

  private client: Client;
  constructor (private _appComponent: AppComponent, private router: Router, private profileService: ProfileService){}

  get profile(): Client{
    this.client = this._appComponent.profile
    return this.client
  }
  
  public logOut(): void {
    this._appComponent._authData = null;
    this._appComponent.authStatus = false;
    this.router.navigate(['/autorization'])
  }
}
