import { Router, Request, Response } from 'express';
import { Observable } from 'rxjs/Rx';
import * as _ from 'underscore';
import { CustomerModel } from '../database/models/customer.model';
import { ProductModel } from '../database/models/product.model';
import { AreaModel } from '../database/models/area.model';
import { InvoiceModel } from '../database/models/invoice.model';

export class InvoiceController {
    constructor() { }

    //get invoices of this month for active users
    static getRecentInvoice(res: Response) {
        CustomerModel.find({
            $and: [
                { status: true },
                {
                    productList: {
                        $exists: true, $not: { $size: 0 }
                    }
                }
            ]
        }, function (err, data) {
            if (!err) {
                res.send(data);
            }
        });
    }

    // create new invoice
    static storeInvoice(res: Response, data: any) {
        let invoice = new InvoiceModel({
            customer_id: data.customer_id,
            payment_due_date: data.payment_due_date,
            amount_due: data.amount_due,
            status: data.status,
            total: data.total,
            discount: data.discount,
            invoice_created_date: data.invoice_created_date,
            paid_date: data.paid_date,
            amount_partially_paid: data.amount_partially_paid,
            productList: data.productList,
        });

        invoice.save(function (err, data) {
            if (err) {
                res.send({ status: false });
            } else {
                res.send({ status: true, id: data._id });
            }
        });
    }


    static generateInvoice(res: Response, data: any) {
        console.log(data.html);
        res.send(data);
    }

    //get invoice by _id
    static getInvoiceById(res: Response, id) {
        InvoiceModel.findById(id, function (err, data) {
            if (!err) {
                res.send(data);
            }
        })
    }



}