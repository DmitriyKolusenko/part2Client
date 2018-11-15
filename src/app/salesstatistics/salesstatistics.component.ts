import { Component, OnInit } from '@angular/core';
import { Product } from '../products/product.model';
import { SalesStatisticsService } from './salesstatistics.service';


@Component({
  selector: 'app-salesstatistics',
  templateUrl: './salesstatistics.component.html',
  styleUrls: ['./salesstatistics.component.css'],
  
})
export class SalesstatisticsComponent implements OnInit {

  constructor (private salesStatisticsService: SalesStatisticsService){ }

  private _products: Product[];
  ngOnInit(): void {
    this.getBestSalesProducts();
  }

  public getBestSalesProducts(){
    this.salesStatisticsService.getBestSalesProducts().subscribe(
      (products: Product[])=>{
        this._products = products;
      }
    )
  }
  
  get bestSalesProducts(): Product[]{
    return this._products;
  }
}
