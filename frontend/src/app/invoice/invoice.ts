import { Product } from '../product/product';
import { Area } from '../area/area';
import { Customer } from '../customer/customer';

export class Invoice {
    id?: string;
    customerData?: Customer;
    productList?: any[] = [];
    payment_due_date?: number;
    amount_due?: number;
    status?: string;    //Due / Paid / Partially Paid
    total?: number;
    discount?: number;
    invoice_created_date?: number;
}
