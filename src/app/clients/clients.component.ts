import { Component, OnInit } from '@angular/core';
import { Client } from './client.model';
import { ClientService } from './client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  private _clients: Client[];
  private _isLoading: boolean = false;
  private _clientSelected: Client;

  constructor(private clientService: ClientService) { }

  get isLoading(): boolean {
    return this._isLoading;
  }

  ngOnInit() {
    this.getClients();
  }

  private getClients(): void {
    this._isLoading = true;
    this.clientService.getClients().subscribe(
      (clientsObs: Client[]) => {
        this._clients = clientsObs;
        this._isLoading = false;
      }
    )
  }

  get clients(): Client[] {
    return this._clients;
  }

  get clientSelected(): Client {
    return this._clientSelected;
  }

  public isClientSelected(): boolean {
    if (this._clientSelected){
      return true;
    } else {
      return false;
    }
  }

  public selectClient(client: Client): void {
    this._clientSelected = client;
  }

  public setRole(): void {
    var clientSel = new Client(this._clientSelected.idClients,null,null,null,null,null,null,null,null);
    this.clientService.setRole(clientSel).subscribe(
      (clients: Client[]) => {
        this._clients = clients;
        for (var i = 0; i < this._clients.length; i++){
          if (this._clientSelected.idClients == this._clients[i].idClients){
            this._clientSelected = this._clients[i]
          }
        }
      }
    )
  }
}
