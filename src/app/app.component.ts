import { Component, Input, Injectable, OnInit } from '@angular/core';
import { Client } from './clients/client.model';
import { AuthorizationService } from './autorization/autorization.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './products/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthorizationService]
})
@Injectable()
export class AppComponent implements OnInit {

  title = 'TS-Shop';
  public role: string = '';
  private client: Client;
  public authStatus: boolean = false;

  constructor(private router: Router, private autorizationService: AuthorizationService,
     private http: HttpClient){  
  }

  ngOnInit(): void { 
    const currentUser = localStorage.getItem('currentUser');
    if(currentUser){
      this.authStatus = true;
      this.client = JSON.parse(currentUser);
      this.role = this.client.roles;

    } 
  }

  public setData(){
    this.autorizationService.loginProcess.subscribe(
      () => {
        this.http.get<Client>('/api/clients/user').subscribe(
              (client: Client) => {
                this.role = client.roles;
                localStorage.setItem('currentUser',JSON.stringify(client));
                this.router.navigate(['/profile']);
                this.authStatus = true;
                
              }
            );
      }
    )
  }

  public hasRole(roles: string): boolean {
    return this.role == roles;
  }
  
  get addStatus(): boolean {
    return this.authStatus;
  }
}
