import {Router, Request, Response} from 'express';
import {CustomerModel} from '../database/models/customer.model';
import * as _ from 'underscore';
import {AreaModel} from '../database/models/area.model';
import {RecentInvoiceModel} from '../database/models/invoice.model';
import {ProductModel} from '../database/models/product.model';
/*
 * Controller to handle request to api/customer/
 */
export class CustomerController {
    constructor() {
    }

    static searchAllCustomer(res: Response, text: any) {
        let query = CustomerModel.find(
            {
                $or: [
                    {
                        "username": {
                            $regex: ".*" + text + ".*",
                            $options: "i"
                        }
                    },
                    {
                        "fullname": {
                            $regex: ".*" + text + ".*",
                            $options: "i"
                        }
                    }
                ]
            }, ["username", "fullname"]);
        query.exec((err, data) => {
            if (!err) {
                res.send(data);
            } else {
                res.send({status: false});
            }
        })
    }

    static getFileContents(res: Response, obj: any) {
        let data = obj['content'].split(',');
        if (_.isEmpty(data[0]) || _.isUndefined(data[0]) || data[0] == '') {
            res.send({status: false});
            return;
        }

        if (data[14] == '1900') {
            res.send({status: false});
            return;
        }

        let isDataInserted: boolean = false;
        let timestamp = Date.now();
        let status: boolean = false;
        if (data[15] == 1) {
            status = true;
        }

        AreaModel.findOneAndUpdate({name: data[10]},
            {
                $set: {
                    name: data[10]
                }
            },
            {
                upsert: true,
                new: true
            }, (err, docs) => {
                if (!err) {
                    let area_id = docs['_id'];
                    //get product id
                    let product_name = "";
                    if (!_.isUndefined(data[14])) {
                        product_name = data[14];
                        product_name = product_name.trim();
                    }
                    if (data[14] == '1900') {
                        product_name = '';
                    }
                    ProductModel.findOneAndUpdate({name: product_name},
                        {
                            $set: {
                                name: data[14],
                                rate: 0,
                                description: '',
                                status: true,
                                vat: 0
                            }
                        },
                        {
                            upsert: true,
                            new: true
                        }, (err, pdocs) => {
                            if (!err) {
                                let product_id = pdocs['_id'];
                                let customer = new CustomerModel({
                                    username: data[0],
                                    nid: "",
                                    email: data[1],
                                    fullname: data[2] + " " + data[3],
                                    customer_currency: data[4],
                                    mobile_primary: '+880' + data[5],
                                    mobile_secondary: '+880' + data[6],
                                    website: data[7],
                                    country: data[8],
                                    location: "",
                                    area: area_id,
                                    city: data[12],
                                    postal_code: data[13],
                                    status: status,
                                    productList: [product_id]
                                });
                                customer.save((err, cdocs) => {
                                    if (!err) {
                                        res.send({status: true});
                                    } else {
                                        res.send({status: false});
                                    }
                                })
                            }
                        })
                }
            })
    }

    static uploadFile(res: Response, data: any) {
        res.send(true);
    }

    //create a new customer
    static createNewCustomer(res: Response, data: any) {
        let isDataInserted: boolean = false;
        let timestamp = Date.now();
        let customer = new CustomerModel({
            username: data.username,
            nid: data.nid,
            email: data.email,
            fullname: data.fullname,
            customer_currency: data.customer_currency,
            mobile_primary: data.mobile_primary,
            mobile_secondary: data.mobile_secondary,
            website: data.website,
            country: data.country,
            location: data.location,
            area: data.area,
            city: data.city,
            postal_code: data.postal_code,
            status: data.status,
            productList: data.productList
        });
        customer.save(function (err, newData) {
            if (err) {
                res.send({status: false});
            } else {
                let date = new Date();
                let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
                let invoice = new RecentInvoiceModel({
                    customer_id: newData['_id'],
                    payment_due_date: firstDay,
                    amount_due: 0,
                    status: 'Due',
                    total: 0,
                    discount: 0,
                    amount_partially_paid: [],
                    productList: newData['productList'],
                    type: 'recent'
                });

                ProductModel.find({"_id": {"$in": data['productList']}}, function (err, docs) {
                    _.each(docs, (item) => {
                        invoice['total'] += item['rate'];
                    });
                    invoice['amount_due'] = invoice['total'];
                    invoice.save(function (err) {
                        if (!err) {
                            console.log('Invoice created allright');
                        }
                    });
                });

            }
            res.send({status: true});
        });

    }

    //get all customers
    static getAllCustomers(res: Response, paginationCount: any) {
        if (paginationCount == 'all') {
            CustomerModel.find({}, function (err, data) {
                res.send(data);
            })
        } else {
            let skip_count = (paginationCount - 1) * 20;
            CustomerModel.find({}).sort('normalize').skip(skip_count).limit(20).exec((err, customers) => {
                let allCustomers = [];
                if (!err) {
                    _.each(customers, (item) => {
                        if (item.username != 'user_name') {
                            allCustomers.push(item);
                        }
                    });
                    res.send(allCustomers);
                }
            });
        }
    }

    //changing status - active/inactive
    static changeStatus(res: Response, data: any) {
        CustomerModel.update({_id: data.id}, {$set: {status: data.status}}, function (err) {
            if (err) {
                res.send({status: false});
            } else {
                res.send({status: true});
            }
        });
    }


    //get details of a customer by id
    static getCustomerDetails(res: Response, id) {
        CustomerModel.findById(id, function (err, data) {
            if (!err) {
                res.send(data);
            }
        })
    }


    //update customer details data
    static updateCustomerDetails(res: Response, data: any) {
        CustomerModel.update({_id: data.id}, {
            $set: {
                username: data.username,
                nid: data.nid,
                email: data.email,
                fullname: data.fullname,
                customer_currency: data.customer_currency,
                mobile_primary: data.mobile_primary,
                mobile_secondary: data.mobile_secondary,
                website: data.website,
                country: data.country,
                location: data.location,
                area: data.area,
                city: data.city,
                postal_code: data.postal_code,
                status: data.status,
                productList: data.productList
            }
        }, function (err) {
            if (err) {
                res.send({status: false});
            } else {
                res.send({status: true});
            }
        })
    }


    //search customers list by username
    static searchByUsername(res: Response, data: any) {
        CustomerModel.find({"username": {$regex: ".*" + data.text + ".*", $options: 'i'}}, function (err, data) {
            if (!err) {
                res.send(data);
            }
        });
    }

    //search customers list by mobile number
    static searchByMobileNumber(res: Response, data: any) {
        CustomerModel.find({"mobile_primary": {$regex: ".*" + data.text + ".*", $options: 'i'}}, function (err, data) {
            if (!err) {
                res.send(data);
            }
        });
    }

    //search customers list by area
    static searchByArea(res: Response, data: any) {
        AreaModel.find({"name": {$regex: ".*" + data.text + ".*", $options: 'i'}}, function (err, data) {
            if (!err) {
                res.send(data);
            }
        });
    }

    static customerByArea(res: Response, data: any) {
        CustomerModel.find({"area": data.text}, function (err, data) {
            if (!err) {
                res.send(data);
            }
        })
    }

    static getIdByUsername(res: Response, username) {
        CustomerModel.find({"username": {$regex: ".*" + username + ".*", $options: 'i'}}, function (err, data) {
            if (!err) {
                res.send(data);
            }
        });
    }


    static setCheckGenerateInvoice(res: Response, data: any) {
        CustomerModel.update({_id: data.id}, {$set: {isGenerateInvoiceMonthly: data.isGenerateInvoiceMonthly}}, function (err) {
            if (err) {
                res.send({status: false});
            } else {
                res.send({status: true});
            }
        });
    }

    static getTotalCustomerCount(res: Response) {
        CustomerModel.count((err, c) => {
            if (!err) {
                res.send({count: c});
            } else[
                res.send({count: 0})
            ]
        })
    }

    static generateAutoInvoice(res: Response, id) {
        CustomerModel.findOne({_id: id}, (err, data) => {
            if (!err) {
                let invoice = {
                    customerData: data,
                    total: 0,
                    productData: [],
                    amount_due: 0,
                    status: 'Due',
                    discount: 0
                }

                ProductModel.find({"_id": {"$in": invoice.customerData['productList']}}, (err, pdata) => {
                    _.each(pdata, (item) => {
                        item['amount_with_vat'] = item['rate'] + (item['rate'] * (item['vat'] / 100));
                        invoice.productData.push(item);
                        invoice.total = invoice.total + item['amount_with_vat'];
                        invoice.amount_due = invoice.total;
                    });
                    res.send(invoice);
                });
            } else {
                res.send({status: false});
            }
        })
    }


    static getAutoGenerateCustomerList(res: Response) {
        let query = CustomerModel.find({isGenerateInvoiceMonthly: true}).select('_id');
        query.exec(function (err, data) {
            if (!err) {
                res.send(data);
            } else {
                res.send({status: false});
            }
        })
    }

}