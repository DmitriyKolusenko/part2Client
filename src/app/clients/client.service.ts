import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { Client } from './client.model';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/internal/operators';
import { AuthorizationService } from '../autorization/autorization.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  public clients: Observable<Client[]>;

  constructor(private http: HttpClient, private _authorisationService: AuthorizationService) {
   }

  public getClients(str: string): Observable<Client[]> {
    this.clients = this.http.get<Client[]>('http://localhost:8080/api/clients');
    return this.clients;
  /*  return this.http.get<Client[]>('../../assets/clients.json').pipe(delay(5000));*/
  }

}
