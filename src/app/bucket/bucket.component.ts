import { OnInit, Component } from "@angular/core";
import { Product } from "../products/product.model";
import { BucketService } from "./bucket.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Card } from "./card.model";
import { ConfirmCode } from "./confirmcode.model";

@Component({
    selector: 'ts-shop-bucket',
    templateUrl: './bucket.component.html',
    styleUrls: ['./bucket.component.css']
  })

  export class BucketComponent implements OnInit{

    constructor (private bucketService: BucketService, private router: Router){}

    private _productsOrdered: Product[] = [];
    private _totalCost: number = 0;
    private _card: Card;
    private _confirmcode: ConfirmCode;
    public isCardMenu: boolean = false;
    public isConfirmMenu: boolean = false;

    ngOnInit(): void {
        const products = localStorage.getItem('bucket')
        if (products){
            this._productsOrdered = JSON.parse(products);
        }
    }

    get totalCost(): number {
        this._totalCost = 0;
        this._productsOrdered.forEach(product => {
            this._totalCost = this._totalCost + product.count*product.price;
        });
        return this._totalCost;
    }

    get _isCardMenu():boolean{
        return this.isCardMenu;
    }
    get _isConfirmMenu():boolean{
        return this.isConfirmMenu;
    }

    get productsOrdered(): Product[] {
        return this._productsOrdered;
    }

    public confirmMenu(): void{
        this.isConfirmMenu = true;
    }

    public cardMenu(): void{
        const user = localStorage.getItem('currentUser')
        if (user){
            this.isCardMenu = true;
        } else {
            this.router.navigate(['/autorization']);
        }
    }

    public sendConfirmCode(form: NgForm): void{
        this._confirmcode = form.value;
        console.log("confirm code is: " + this._confirmcode.confirmcode);
        this.bucketService.sendConfirmCode(this._confirmcode.confirmcode).subscribe(
            (isConfirmed: boolean) => {
                if (isConfirmed){
                    this.placeOrder();
                }
            },(error) => {
                console.log(error);
            }
        );
    }

    public placeOrder(): void{
        const user = localStorage.getItem('currentUser')
        if (user){
            this.bucketService.placeOrder(this._productsOrdered).subscribe(
                ()=>{
                  this.clearOrder();
                  this.isConfirmMenu = false;
                }
            );
        } else {
            this.router.navigate(['/autorization']);
        }
      }

    get bucketMessage():boolean{
        if (this._productsOrdered.length > 0){
            return false;
        }
        return true;
    }

    public clearOrder(): void {
        this._productsOrdered = [];
        localStorage.removeItem('bucket')
    }

    public removeProductFromOrder(product: Product): void {
        var i = this._productsOrdered.indexOf(product);
        if (this._productsOrdered[i].count > 1){
            this._productsOrdered[i].count = this._productsOrdered[i].count - 1;
            localStorage.setItem('bucket',JSON.stringify(this._productsOrdered));
        } else {
            this._productsOrdered.splice(i,1);
            localStorage.setItem('bucket',JSON.stringify(this._productsOrdered));
        }
    }

    public setData (form: NgForm): void {
        this._card = form.value;
        this._card.ordersum = this._totalCost;
        this.bucketService.getPayment(this._card).subscribe(
            () => {
                this.isCardMenu = false;
                this.isConfirmMenu = true;
        });
    }

  }