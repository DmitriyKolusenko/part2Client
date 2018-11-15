import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { AppComponent } from "../app.component";
import { Observable } from "rxjs";
import { Client } from "../clients/client.model";

@Injectable({
    providedIn: 'root'
  })
  
  export class ProfileService implements OnInit{

    private client: Observable<Client>;

    constructor(private http: HttpClient, private appComponent: AppComponent) {}

    ngOnInit(): void {
        console.log('token:' + this.appComponent.sessionId)
        
    }

    get getclient(): Observable<Client>{
        return this.client;
    }
  }

 