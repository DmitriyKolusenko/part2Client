import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { Client } from './client.model';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  public clients: Observable<Client[]>;

  constructor(private http: HttpClient) {
   }

  public getClients(): Observable<Client[]> {
    this.clients = this.http.get<Client[]>('/api/clients');
    return this.clients;
  }

  public setRole(client: Client): Observable<Client[]> {
    return this.http.post<Client[]>('/api/clients/setrole',client)
  }

}
