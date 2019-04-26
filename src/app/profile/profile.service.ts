import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { AppComponent } from "../app.component";
import { Observable } from "rxjs";
import { Client } from "../clients/client.model";

@Injectable({
    providedIn: 'root'
  })
  
  export class ProfileService {

    constructor(private http: HttpClient) {}


    get getclient(): Observable<Client>{
        return this.http.get<Client>('/api/clients/user');
    }

    public setData(client: Client): Observable<any>{
      return this.http.post<any>('/api/clients/changeuser',
        client)
    }
  }

 