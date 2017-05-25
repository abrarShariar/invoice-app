import {Router, Request, Response} from 'express';
import * as _ from 'underscore';
import {CustomerModel} from '../database/models/customer.model';

export class DeamonController {
    constructor() {
    }

    static autoGenerateInvoice() {
        CustomerModel.find({
            $and: [
                {isGenerateInvoiceMonthly: true},
                {
                    productList: {
                        $exists: true, $not: {$size: 0}
                    }
                }
            ]
        })
    }

}