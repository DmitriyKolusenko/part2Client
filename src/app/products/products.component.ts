import { Component, OnInit } from '@angular/core';
import { Product } from './product.model';
import { ProductService } from './product.service';
import { ProductCategory } from './product-category.enum';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Client } from '../clients/client.model';

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
  private _bucketMessage: boolean = true;
  private _productsLoaded: Product[];
  private _isProductsLoaded: boolean = false;

  constructor(private productService: ProductService, private router: Router) { }

  public setProductToOrder(product: Product): void{
    for (var i=0; i<this._productsOrdered.length; i++){
      if (this._productsOrdered[i]==product){
        this._productsOrdered[i].count = this._productsOrdered[i].count + 1;
        localStorage.setItem('bucket',JSON.stringify(this._productsOrdered));
        return;
      }
    }
    this._bucketMessage = false;
    product.count = 1;
    this._productsOrdered[this._productsOrdered.length] = product;
    localStorage.setItem('bucket',JSON.stringify(this._productsOrdered))
  }

  public clearOrder(): void {
    this._productsOrdered = [];
    this._bucketMessage = true;
    localStorage.removeItem('bucket')
  }

  public placeOrder(): void{
    const user = localStorage.getItem('currentUser')
    if (user){
     this.router.navigate(['/bucket'])
    } else {
      this.router.navigate(['/autorization']);
  }
  }

  get isProductsLoaded(): boolean {
    return this._isProductsLoaded;
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
    const bucket = localStorage.getItem('bucket')
    if(bucket){
      this._productsOrdered = JSON.parse(bucket);
      this._bucketMessage = false;
    }
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
    return this._bucketMessage;
  }

 /* public load(): void {
    var file = document.getElementById('file1').files[0];
    const reader = new FileReader();
    reader.onload = e => {
      var contents = event.target.result;
      this._productsLoaded = JSON.parse(contents);
      this._isProductsLoaded = true;
  };
   
  reader.onerror = function(event) {
      console.error("Файл не может быть прочитан! код " + event.target.error.code);
  };
  reader.readAsText(file);
  }*/

  public send(): void {
    this.productService.loadProducts(this._productsLoaded).subscribe(
      (productsNew:Product[]) => {
        this._products = productsNew;
        this._isProductsLoaded = false;
      }
    )
  }

  get isAccess():boolean {
    const user = localStorage.getItem('currentUser');
    if (user){
      var client: Client = JSON.parse(user);
      if(client.roles == "MANAGER"){
        return true;
      }
    }
    return false;
  }
}
