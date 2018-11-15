import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../products/product.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
  })
  export class SalesStatisticsService{
    public products: Observable<Product[]>;
    constructor (private http: HttpClient){ }
    public getBestSalesProducts(): Observable<Product[]>{
        return this.http.get<Product[]>("http://localhost:8080/bestsales")
    }
  }