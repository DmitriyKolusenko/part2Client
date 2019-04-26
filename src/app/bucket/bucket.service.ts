import { Injectable } from "@angular/core";
import { Product } from "../products/product.model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Card } from "./card.model";

@Injectable({
    providedIn: 'root'
  })
  export class BucketService {
      
      constructor(private http: HttpClient){}

      public placeOrder(products: Product[]):Observable<any>{
        return this.http.post<any>('/api/writeorder',{
          products
        });
      }

      public getPayment(card: Card):Observable<any>{
        return this.http.post<any>('/api/cardreq',
          card
        );
      }

      public sendConfirmCode(confirmcode: string):Observable<boolean>{
        return this.http.get<boolean>('/api/cardreq/'+confirmcode);
      }

  }