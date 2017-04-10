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






    // static getRecentInvoice(res: Response) {
    //     let result = [];
    //     CustomerModel.find({ status: true }, (err, customers) => {
    //         if (!err) {
    //             _.each(customers, (item) => {
    //                 let invoiceData = {
    //                     username: item.username,
    //                     fullname: item.fullname,
    //                     mobile: item.mobile_primary,
    //                     email: item.email,
    //                     productData: {},
    //                     areaData: {}
    //                 };
    //                 ProductModel.findById({ _id: item.product }, (err, data) => {
    //                     if (!err) {
    //                         invoiceData.productData = data;
    //                         AreaModel.findById({ _id: item.area }, (err, data) => {
    //                             if (!err) {
    //                                 invoiceData.areaData = data;
    //                                 result.push(invoiceData);
    //                             }
    //                         })
    //                     }
    //                 })

    //             });
    //         }
    //     });
    //     res.send(result);
    // }

}