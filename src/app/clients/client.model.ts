import { Orders } from "../orders/orders.model";

export class Client {
    
    constructor(
    public idClients: number,
    public name: string,
    public surname: string,
    public email: string,
//    public password: string,
    public roles: string,
    public dateofbirth:{
        year: number,
        month: string,
        dayOfMonth: number
    },
    public adress:{
        city: string,
        country: string,
        postalcode: string,
        street: string,
        house: string,
        flat: string
    },
    public orders: Orders[]
    )
 { }

}
