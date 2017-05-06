import {Router, Request, Response} from 'express';
import * as _ from 'underscore';
import {CustomerModel} from '../database/models/customer.model';
import {AllInvoiceModel, RecentInvoiceModel} from '../database/models/invoice.model';

declare var Date: any;
export class InvoiceController {
    constructor() {
    }

    static getRecentInvoice(res: Response) {
        CustomerModel.find({
            $and: [
                {status: true},
                {
                    productList: {
                        $exists: true, $not: {$size: 0}
                    }
                }
            ]
        }, function (err, data) {
            if (!err) {
                res.send(data);
            }
        });
    }

    static storeInvoice(res: Response, data: any) {
        let invoice = new AllInvoiceModel({
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
                res.send({status: false});
            } else {
                res.send({status: true, id: data._id});
            }
        });
    }

    static generateInvoice(res: Response, data: any) {
        res.send(data);
    }

    static getInvoiceById(res: Response, id) {
        AllInvoiceModel.findById(id, function (err, data) {
            if (!err) {
                res.send(data);
            }
        })
    }

    static searchByUsername(res: Response, data: any) {
        AllInvoiceModel.find({"username": {$regex: ".*" + data.text + ".*", $options: 'i'}}, function (err, data) {
            if (!err) {
                res.send(data);
            }
        });
    }

    static saveRecentInvoice(res: Response, data: any) {
        let invoice = new RecentInvoiceModel({
            customer_id: data.customer_id,
            payment_due_date: data.payment_due_date,
            amount_due: data.amount_due,
            status: data.status,
            total: data.total,
            discount: data.discount,
            paid_date: data.paid_date,
            amount_partially_paid: data.amount_partially_paid,
            productList: data.productList,
        });

        invoice.save(function (err, data) {
            if (err) {
                res.send({status: false});
            } else {
                res.send({status: true, id: data._id});
            }
        });
    }

    static dropRecentInvoiceAll(res: Response) {
        if (RecentInvoiceModel.collection.drop()) {
            res.send({status: true});
        } else {
            res.send({status: false});
        }
    }

    static checkRecentInvoiceExists(res: Response) {
        RecentInvoiceModel.count({}, function (err, count) {
            res.send({"count": count});
        });
    }

    static getRecentInvoiceDB(res: Response) {
        RecentInvoiceModel.find({}, (err, data) => {
            if (!err) {
                res.send(data);
            }
        });
    }

    static cleanInvoice(res: Response) {
        let isClean: boolean = false;
        let date = new Date();
        let firstDay = new Date(date.getFullYear(), date.getMonth(), 2);

        RecentInvoiceModel.find({
                "created_on": {
                    $lt: firstDay
                }
            }, (err, data) => {
                if (data.length <= 0) {
                    res.send({"status": false});
                }
                _.each(data, (obj) => {
                    isClean = true;
                    let invoice = new AllInvoiceModel({
                        id: obj['_id'],
                        customer_id: obj['customer_id'],
                        payment_due_date: obj['payment_due_date'],
                        amount_due: obj['amount_due'],
                        status: obj['status'],
                        total: obj['total'],
                        discount: obj['discount'],
                        invoice_created_date: obj['invoice_created_date'],
                        paid_date: obj['paid_date'],
                        amount_partially_paid: obj['amount_partially_paid'],
                        productList: obj['productList'],
                        created_on: obj['created_on']
                    });

                    invoice.save(function (err, newData) {
                        if (!err) {
                            RecentInvoiceModel.find({'_id': newData['id']}).remove(function (err, removed) {
                                if (!err) {
                                    isClean = true;
                                }
                            });
                        }
                    });
                });
            },
            () => {
                res.send({"status": isClean});
            });

    }

    static changeStatus(res: Response, data: any) {
        RecentInvoiceModel.update({_id: data['_id']}, {
            $set: {
                customer_id: data['customer_id'],
                payment_due_date: data['payment_due_date'],
                amount_due: data['amount_due'],
                status: data['status'],
                total: data['total'],
                discount: data['discount'],
                invoice_created_date: data['invoice_created_date'],
                paid_date: data['paid_date'],
                amount_partially_paid: data['amount_partially_paid'],
                productList: data['productList']
            }
        }, function (err) {
            if (err) {
                res.send({status: false});
            } else {
                res.send({status:true});
            }
        })
    }


}

