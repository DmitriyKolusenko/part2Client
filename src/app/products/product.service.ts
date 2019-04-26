import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/products');
  }

  public loadProducts(products: Product[]): Observable<Product[]> {
    return this.http.post<Product[]>('api/products/writenew',products);
  }

  public loadReceipts(products: Product[]): Observable<Product[]> {
    return this.http.post<Product[]>('api/products/addreceipts',products);
  }
}
