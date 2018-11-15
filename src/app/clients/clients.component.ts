import { Component, OnInit } from '@angular/core';
import { Client } from './client.model';
import { ClientService } from './client.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  private _clients: Client[];
  private _isLoading: boolean = false;
  public str: string;

  constructor(private clientService: ClientService, private _appComponent: AppComponent) { }

  get isLoading(): boolean {
    return this._isLoading;
  }

  ngOnInit() {
    this.getClients();
  }

  private getClients(): void {
    this._isLoading = true;
    this.str = this._appComponent.sessionId;
    console.log(this.str);
    
    this.clientService.getClients(this.str).subscribe(
      (clients: Client[]) => {
        this._clients = clients;
        this._isLoading = false;
      },
      (error) => {
        console.log(error);
        this._isLoading = false;
      }
    )
  }

  get clients(): Client[] {
    return this._clients;
  }

}
