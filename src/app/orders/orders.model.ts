import { Client } from "../clients/client.model";
import { Product } from "../products/product.model";

export class Orders{
    constructor(
        public ordernumber: number,
        public iscash: boolean,
        public client: Client,
        public products: Product[],
        public ispaid: boolean,
        public delivery: boolean
    ){}
    

}