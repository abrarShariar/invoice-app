import {Router, Request, Response} from 'express';
import * as _ from 'underscore';
import {CustomerModel} from '../database/models/customer.model';
import {AllInvoiceModel, RecentInvoiceModel} from '../database/models/invoice.model';
declare var Date: any;
import {ProductModel} from '../database/models/product.model';


export class InvoiceController {
    constructor() {
    }

    static getRecentInvoiceCustomers(res: Response) {
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

    static getInvoiceById(res: Response, type, id) {
        if (type == 'recent') {
            RecentInvoiceModel.findById(id, function (err, data) {
                res.send(data);
            })
        }
        else if (type == 'all') {
            AllInvoiceModel.findById(id, function (err, data) {
                res.send(data);
            })
        } else {
            res.send({status: false});
        }

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
        let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

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
                        recent_id: obj['_id'],
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
                            RecentInvoiceModel.findOne({'_id': newData['recent_id']}).remove(function (err) {
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
        if (data['type'] == 'recent') {
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
                    res.send({status: true});
                }
            })
        } else {
            AllInvoiceModel.update({_id: data['_id']}, {
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
                    res.send({status: true});
                }
            })
        }
    }

    static buildAndSaveRecentInvoice(res: Response) {
        CustomerModel.find({
                productList: {
                    $exists: true, $not: {$size: 0}
                }
            },
            function (err, data) {
                let date = new Date();
                let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
                _.each(data, (customer) => {
                    let invoice = new RecentInvoiceModel({
                        customer_id: customer['_id'],
                        payment_due_date: firstDay,
                        amount_due: 0,
                        status: 'Due',
                        total: 0,
                        discount: 0,
                        amount_partially_paid: [],
                        productList: customer['productList']
                    });

                    ProductModel.find({"_id": {"$in": customer['productList']}}, function (err, docs) {
                        _.each(docs, (item) => {
                            invoice['total'] += item['rate'];
                        });
                        invoice['amount_due'] = invoice['total'];
                        invoice.save(function () {
                            // console.log(data);
                        });
                    });
                });
                res.send({status: true});
            }
    }

    static savePartialPay(res: Response, data: any) {
        let pay_data = {
            date: Date.now(),
            amount: data['amount_partially_paid']
        };
        RecentInvoiceModel.findByIdAndUpdate(
            data['id'],
            {$push: {"amount_partially_paid": {date: pay_data['date'], amount: pay_data['amount']}}},
            {safe: true, upsert: true, new: true},
            function (err, docs) {
                let total_partial_pay = 0;
                _.each(docs['amount_partially_paid'], (item) => {
                    total_partial_pay += item['amount'];
                });
                if (total_partial_pay >= docs['total']) {
                    RecentInvoiceModel.update({_id: data['id']}, {
                        $set: {
                            status: 'Paid',
                            amount_due: 0,
                            paid_date: Date.now()
                        }
                    }, function (err) {
                        if (err) {
                            res.send({status: false});
                        } else {
                            res.send({status: true});
                        }
                    });
                } else {
                    RecentInvoiceModel.update({_id: data['id']}, {
                        $set: {
                            status: 'Partially Paid',
                            amount_due: docs['total'] - total_partial_pay
                        }
                    }, function (err) {
                        if (err) {
                            res.send({status: false});
                        } else {
                            res.send({status: true});
                        }
                    });
                }

            }
        );
    }

    static preGenerateUpdate(res: Response, data: any) {
        if (data['type'] == 'recent') {
            RecentInvoiceModel.update({_id: data.id}, {
                $set: {
                    amount_due: data.amount_due,
                    discount: data.discount,
                    productList: data.productList,
                    total: data.total,
                    amount_partially_paid: data.amount_partially_paid
                }
            }, function (err) {
                if (err) {
                    res.send({status: false});
                } else {
                    res.send({status: true});
                }
            });
        }
        else if (data['type'] == 'all') {
            AllInvoiceModel.update({_id: data.id}, {
                $set: {
                    amount_due: data.amount_due,
                    discount: data.discount,
                    productList: data.productList,
                    total: data.total,
                    amount_partially_paid: data.amount_partially_paid
                }
            }, function (err) {
                if (err) {
                    res.send({status: false});
                } else {
                    res.send({status: true});
                }
            });
        }
        else {
            res.send({status: false});
        }
    }

    static deleteRecentInVoiceById(res: Response, id) {
        RecentInvoiceModel.find({_id: id}).remove(function (err) {
            if (!err) {
                res.send({status: true});
            } else {
                res.send({status: false});
            }
        });
    }

    static getAllInvoices(res: Response) {
        AllInvoiceModel.find({}, (err, data) => {
            res.send(data);
        });
    }

}

