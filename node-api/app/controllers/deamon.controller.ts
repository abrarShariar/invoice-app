import {Router, Request, Response} from 'express';
import * as _ from 'underscore';
import {CustomerModel} from '../database/models/customer.model';
import {AllInvoiceModel, RecentInvoiceModel} from '../database/models/invoice.model';


export class DeamonController {
    constructor() {
    }

    static autoGenerateInvoice() {
        /*
         clean recent invoice and push data into all invoice
         */
        RecentInvoiceModel.find({}, (err, data) => {
            _.each(data, (invoice) => {
                //save to all InvoiceDB
                let newInvoice = new AllInvoiceModel({
                    customer_id: invoice["customer_id"],
                    payment_due_date: invoice["payment_due_date"],
                    amount_due: invoice["amount_due"],
                    status: invoice["status"],
                    total: invoice["total"],
                    discount: invoice["discount"],
                    invoice_created_date: invoice["invoice_created_date"],
                    paid_date: invoice["paid_date"],
                    productList: invoice["productList"],
                    amount_partially_paid: invoice["amount_partially_paid"],
                    type: "all"
                });

                newInvoice.save((err, newData) => {
                    if (err) {
                        console.log("Error in allInvoice save");
                    } else {
                        RecentInvoiceModel.find({_id: invoice['_id']}).remove((err) => {
                            if (!err) {
                                console.log("removed recent invoice");
                            }
                        });
                    }
                });
            });
        });
    }
}