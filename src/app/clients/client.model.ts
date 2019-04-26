import { Orders } from "../orders/orders.model";
import { Adress } from "./adress.model";
import { DateOfBirth } from "./dateOfBirth.model";

export class Client {
    
    constructor(
    public idClients: number,
    public name: string,
    public surname: string,
    public email: string,
//    public password: string,
    public roles: string,
    public dateofbirth: DateOfBirth,
    public formatteddateofbirth: string,
    public adress:Adress,
    public orders: Orders[]
    )
 { }

}
