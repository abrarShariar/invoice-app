import { Router, Request, Response } from 'express';
import { CustomerModel } from '../database/models/customer.model';
import { Customer } from '../classes/Customer';
import { Observable } from 'rxjs/Rx';
import * as _ from 'underscore';
/*
* Controller to handle request to api/customer/ 
*/
export class CustomerController {
    constructor() { }

    //create a new customer
    static createNewCustomer(res: Response, data: any) {
        let isDataInserted: boolean = false;
        let customer = new CustomerModel({
            username: data.username,
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
            status: true
        });

        customer.save(function (err) {
            if (err) {
                res.send({ status: false });
            } else {
                res.send({ status: true });
            }
        });
    }


    //get all customers
    static getAllCustomers(res: Response) {
        CustomerModel.find({}, (err, customers) => {
            let allCustomers = [];
            if (!err) {
                _.each(customers, (item) => {
                    if (item.username != 'user_name') {
                        allCustomers.push(item);
                    }
                });
                res.send(allCustomers);
            }
        })
    }


    //changing status - active/inactive
    static changeStatus(res: Response, data: any) {
        CustomerModel.update({ _id: data.id }, { $set: { status: data.status } }, function (err) {
            if (err) {
                res.send({ status: false });
            } else {
                res.send({ status: true });
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
        CustomerModel.update({ _id: data.id }, {
            $set: {
                username: data.username,
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
                status: data.status
            }
        }, function (err) {
            if (err) {
                res.send({ status: false });
            } else {
                res.send({ status: true });
            }
        })
    }

    
}