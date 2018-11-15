import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private http1: HttpClient) { }

  public getProducts(): Observable<Product[]> {
    
    return this.http.get<Product[]>('http://localhost:8080/api/products');
  }

  public placeOrder(products: Product[], str: string):Observable<any>{
    return this.http1.post<any>('http://localhost:8080/createorr',{
      sessionId: str,
      order: products
    });
  }
}
