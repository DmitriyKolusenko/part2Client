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
  
    constructor(private http: HttpClient) {
     }
  
    public getOrders(): Observable<Client> {
      return this.http.get<Client>('/api/clients/user');
    }

    public sendOrders(orders: Orders[]): Observable<Client> {
      return this.http.post<Client>('/api/writeorder/change', orders)
    }
  }
  