import { Component, OnInit } from '@angular/core';
import { OrdersService } from './orders.service';
import { Orders } from './orders.model';
import { Product } from '../products/product.model';
import { Client } from '../clients/client.model';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  
})
export class OrdersComponent implements OnInit {
  private _orders: Orders[] = [];
  private _sendedOrders: Orders[] = [];
  sum: number;
  private _client: Client;
  constructor(private ordersService: OrdersService){}

  ngOnInit(): void {
    this.getOrders();
  }

  private getOrders(): void{
    this.ordersService.getOrders().subscribe(
      (clientObs: Client) => {
        this._client = clientObs;
        this._orders = clientObs.orders;
        for (var i = 0; i < this._orders.length; i++){
          this._orders[i].deliverynewstat = false;
        }
      }
    )
  }

  public onClick(order: Orders): void {
    if (!order.delivery){
      if (order.deliverynewstat){
        order.deliverynewstat = false;
      } else {
        order.deliverynewstat = true;
      }
      for( var i = 0; i< this._orders.length; i++){
        if (this._orders[i].ordernumber == order.ordernumber){
          this._orders[i] = order;
        }
      }
    }
  }

  public ordersChangedStat(orders: Orders[]):boolean{
    for (var i = 0; i< orders.length; i++){
      if (this.orders[i].deliverynewstat){
        return true;
      }
    }
    return false;
  }

  get client(): string{
    return this._client.name + ' ' + this._client.surname;
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

  public getLabelClicked(order: Orders): string {
    if (order.delivery || order.deliverynewstat){return 'V'} else {return '-'}
  }

  public getStyle(bool: boolean): string {
    if (bool){return 'ts-shop-label-true'} else{return 'ts-shop-label-false'}
  }

  public getStyleClick(order: Orders): string{
    if (order.delivery){
      return 'ts-shop-label-true';
    } else {
      if (order.deliverynewstat){
        return 'ts-shop-label-clicked';
      } else {
        return 'ts-shop-label-false';
      }
    }
  }

  public onClickSendChange(): void {
    var j: number = -1;
    var sendedOrders: Orders[] = [];
    for (var i=0; i<this._orders.length; i++){
      if (this._orders[i].deliverynewstat){
        j++;
        sendedOrders[j]=this._orders[i];
      }
    }
    if (sendedOrders){
      this.ordersService.sendOrders(sendedOrders).subscribe(
        (client: Client) => {
          this._client = client;
          this._orders = client.orders;
          for (var i = 0; i < this._orders.length; i++){
            this._orders[i].deliverynewstat = false;
          }
        }
      )
    }
  }
}
