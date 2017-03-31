import { Router, Request, Response } from 'express';
import { CustomerModel } from '../database/models/customer.model';
import { Customer } from '../classes/Customer';
import { Observable } from 'rxjs/Rx';
/*
* Controller to handle request to api/customer/ 
*/
export class CustomerController {
    constructor() { }

    static createNewCustomer(res:Response,data: any) {
        let isDataInserted:boolean = false;
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
            postal_code: data.postal_code
        });

        customer.save(function(err){
             if(err){
                 res.send({status:false});
             }else{
                 res.send({status:true});
             }
        });

    }
}