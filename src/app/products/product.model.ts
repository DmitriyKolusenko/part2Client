import { ProductCategory } from "./product-category.enum";

export class Product {

    constructor(
    public idgoods: number,
    public goodsname: string,
    public price: number,
    public weight: number,
    public instock: number,
    public goodsparameters: string, //ProductCategory
    public volume: number,
    public count: number,
    public totalsaled: number) {}

}
