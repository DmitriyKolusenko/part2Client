import { Component, OnInit } from '@angular/core';
import { Client } from '../clients/client.model';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { ProfileService } from './profile.service';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { SendedData } from './sendedData.model';
import { Adress } from '../clients/adress.model';
import { DateOfBirth } from '../clients/dateOfBirth.model';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  
})
export class ProfileComponent implements OnInit {

  private client: Client;
  private clientEdited: Client;
  private date: Date;
  private _editProfile: boolean = false;
  private sendedData: SendedData;

  constructor (private router: Router, private profileService: ProfileService,
    private appComponent: AppComponent, private http: HttpClient){}

  ngOnInit(): void {
    this.profileService.getclient.subscribe(
      (_client: Client) => {
        this.client = _client;
      }
    )
  }

  get profile(): Client{
    return this.client
  }

  get editProfile(): boolean{
    return this._editProfile;
  }
  
  public logOut(): void {
    this.http.get<any>('/logout').subscribe(
      () => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('bucket');
        this.appComponent.authStatus = false;
        this.appComponent.role = '';
        this.router.navigate(['/autorization']);
      }
    );
  }

  public setEditProfile():void {
    if (this._editProfile){
      this._editProfile = false;
    } else {
      this._editProfile = true;
    }
  }

  public setData (form: NgForm): void {

    this.sendedData = form.value;
    this.date = new Date(this.sendedData.dateofbirth);
    this.clientEdited = new Client(null, null, null, null, null, null, null, new Adress(null,null,null,null,null,null), null);
    this.clientEdited.idClients = this.client.idClients;
    this.clientEdited.surname = this.sendedData.surname;
    this.clientEdited.formatteddateofbirth = this.sendedData.dateofbirth;
    this.clientEdited.email = this.sendedData.email;
    this.clientEdited.adress.postalcode = this.sendedData.postalcode;
    this.clientEdited.adress.country = this.sendedData.country;
    this.clientEdited.adress.city = this.sendedData.city;
    this.clientEdited.adress.street = this.sendedData.street;
    this.clientEdited.adress.house = this.sendedData.house;
    this.clientEdited.adress.flat = this.sendedData.flat;
    console.log(JSON.stringify(this.clientEdited))
    this.profileService.setData(this.clientEdited).subscribe(
      (clientRES: Client) => {
        this._editProfile = false;
        this.client = clientRES;
      }
    )
  }
}
