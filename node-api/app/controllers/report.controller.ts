import {Router, Request, Response} from 'express';
import {CustomerModel} from '../database/models/customer.model';
import * as _ from 'underscore';
import {AreaModel} from '../database/models/area.model';
import {AllInvoiceModel, RecentInvoiceModel} from '../database/models/invoice.model';
import {ProductModel} from '../database/models/product.model';
import * as async from 'async';

class Report {
    username: string;
    mobile_no: string;
    current_due: number = 0;
    previous_due: number = 0;
    total_due: number = 0;
    location: string;
}

export class ReportController {

    static getCustomerByArea(res: Response, id) {
        CustomerModel.find(
            {
                $and: [
                    {
                        'area': id
                    },
                    {
                        'status': true
                    }
                ]
            },
            function (err, data) {
                if (!err) {
                    res.send(data);
                } else {
                    res.send({status: false});
                }
            });
    }

    static getReportForCustomers(res: Response, id) {
        let result = {
            current_due: 0,
            previous_due: 0,
            total_due: 0
        };
        RecentInvoiceModel.findOne({
            $and: [
                {
                    customer_id: id
                },
                {
                    status: {
                        $ne: "Paid"
                    }
                }
            ]

        }, function (err, recentInvoice) {
            if (!err) {
                if (!_.isNull(recentInvoice)) {
                    result['current_due'] = recentInvoice['amount_due'];
                }
            } else {
                res.send({status: false});
            }
            AllInvoiceModel.find({
                $and: [
                    {
                        customer_id: id
                    },
                    {
                        status: {
                            $ne: "Paid"
                        }
                    }
                ]
            }, function (err, allInvoice) {
                if (!err) {
                    _.each(allInvoice, (item) => {
                        if (!_.isNull(item)) {
                            result['previous_due'] += item['amount_due'];
                        }
                    });
                } else {
                    res.send({status: false});
                }
                result['total_due'] = result['previous_due'] + result['current_due'];
                res.send(result);
            });
        });
    }


}