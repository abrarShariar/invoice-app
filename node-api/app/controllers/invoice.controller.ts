import { Router, Request, Response } from 'express';
import { Observable } from 'rxjs/Rx';
import * as _ from 'underscore';
import { CustomerModel } from '../database/models/customer.model';
import { ProductModel } from '../database/models/product.model';
import { AreaModel } from '../database/models/area.model';


export class InvoiceController {
    constructor() { }

    //get invoices of this month for active users
    static getRecentInvoice(res: Response) {
        CustomerModel.find({ status: true, product: { $ne: '' } }, function (err, data) {
            if(!err){
                res.send(data);
            }
        });
    }
}