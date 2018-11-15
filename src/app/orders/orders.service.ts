import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthorizationService } from "../autorization/autorization.service";
import { Orders } from "./orders.model";
import { Observable } from "rxjs";
import { AppComponent } from "../app.component";
import { LoginID } from "../autorization/loginId.model";
import { Client } from "../clients/client.model";

@Injectable({
    providedIn: 'root'
  })
  export class OrdersService {
    public orders: Observable<Orders[]>;
    public _loginId: [LoginID, Client];
  
    constructor(private http: HttpClient, private appComponent: AppComponent) {
     }
  
   /* public getOrders(str: string): Orders[] {
      return this.appComponent._authData.orders
      this.orders = this.http.get<Orders[]>('http://localhost:8080/orders?sessionId='
      +str);//=============================
      return this.orders;
      return this.http.get<Client[]>('../../assets/clients.json').pipe(delay(5000));
    }*/
  
  }
  