import { Product } from '../product/product';

export class Invoice {
    id?:string;
    invoice_date?:string;
    payment_due?:string;
    amount_due?:number;
    producList?:Product[];
    status?:any;    //Due / Paid / Partially Paid
    total?:number;
    discount?:number;
    
}
