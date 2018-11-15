import { Component, OnInit } from '@angular/core';
import { OrdersService } from './orders.service';
import { Orders } from './orders.model';
import { AppComponent } from '../app.component';
import { Product } from '../products/product.model';
import { HtmlParser } from '@angular/compiler';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  
})
export class OrdersComponent implements OnInit {
  private _orders: Orders[];
  sum: number;
  constructor(private ordersService: OrdersService, private appComponent: AppComponent){}

  ngOnInit(): void {
  //  this.getOrders();
  }

 /* private getOrders(): void{
        this._orders = this.appComponent._authData.orders;
  }

  get client(): string{
    return this.appComponent._authData.name + ' ' + this.appComponent._authData.surname;
  }

  get orders(): Orders[]{
    return this._orders;
  }
  
  public getTotalCost(products: Product[]): number {
    this.sum = 0;
    products.forEach(product =>{
      this.sum = this.sum + product.count*product.price;
    })
    return this.sum;
  }

  public getLabel(bool: boolean): string {
    if (bool){return 'V'} else{return '-'}
  }

  public getStyle(bool: boolean): string {
    if (bool){return 'ts-shop-label-true'} else{return 'ts-shop-label-false'}
  }*/
}
