import { Component, OnInit } from '@angular/core';
import { Product } from './product.model';
import { ProductService } from './product.service';
import { ProductCategory } from './product-category.enum';
import { AppComponent } from '../app.component';

@Component({
  selector: 'ts-shop-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  private _products: Product[];
  private _filters: any = {};
  private _isLoading: boolean = false;
  private _productsOrdered: Product[] = [];
  private _anyResponse: any;
  private bool: boolean = true;

  constructor(private productService: ProductService, private _appComponent: AppComponent) { }

  public setProductToOrder(product: Product): void{
    for (var i=0; i<this._productsOrdered.length; i++){
      if (this._productsOrdered[i]==product){
        this._productsOrdered[i].count = this._productsOrdered[i].count + 1;
        return;
      }
    }
    this.bool = false;
    product.count = 1;
    this._productsOrdered[this._productsOrdered.length] = product;
  }

  public clearOrder(): void {
    this._productsOrdered = [];
    this.bool = true;
  }

  public placeOrder(): void{
    this.productService.placeOrder(this._productsOrdered, this._appComponent.sessionId).subscribe(
      (anydata: any)=>{
        this._anyResponse = anydata;
        this.clearOrder();
      }
        
    );
  }

  get getOrderedProducts(): Product[]{
    return this._productsOrdered;
  }

  get products(): Product[] {
    return this._products;
  }

  get filters(): any {
    return this._filters;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  ngOnInit() {
    this.getProducts();
  }

  private getProducts(): void {
    this._isLoading = true;
    this.productService.getProducts().subscribe((products: Product[]) => {
      this._products = products;
      this._isLoading = false;
    },
    (error) => {
      console.log(error);
      this._isLoading = false;
    });
  }

  public filterProducts(): void {
    this._filters = { ... this.filters};
  }

  public isFiltersEmpty(): boolean {
    return !this.filters || Object.keys(this.filters).length === 0;
  }

  public clearFilters(): void {
    this._filters = {};
  }

  private isDeviceNotAvailable(product: Product): boolean {
    return product.instock === 0;
  }

  public isNotAvailable(product: Product): boolean {
    if (product.goodsparameters == ProductCategory.DEVICE) {
      return this.isDeviceNotAvailable(product);
    }
    return false;
  }

  public setAvailabilityColour(product: Product): any {
    return {
      'background-color': this.isNotAvailable(product) ? '#e2cdcd' : 'inherit'
    }
  }
  
  get bucketMessage(): boolean {
    return this.bool;
  }

  get isLoggined(): boolean {
    return this._appComponent.authStatus;
  }
}
