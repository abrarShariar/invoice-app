import {Router, Request, Response} from 'express';
import {CustomerModel} from '../database/models/customer.model';
import * as _ from 'underscore';
import {AreaModel} from '../database/models/area.model';
import {AllInvoiceModel, RecentInvoiceModel} from '../database/models/invoice.model';
import {ProductModel} from '../database/models/product.model';

class Report {
    username: string;
    mobile_no: string;
    current_due: number = 0;
    previous_due: number = 0;
    total_due: number = 0;
    location: string;

}

export class ReportController {

    static buildAndSendAreaReport(res: Response, id) {
        let reportList: Report[] = [];
        var query = CustomerModel.find({'area': id});
        query.exec(function (err, data) {
            if (!err) {
                _.each(data, (customer) => {
                    let id = customer['_id'];
                    let report = new Report();
                    report.username = customer['username'];
                    report.mobile_no = customer['mobile_primary'];
                    report.location = customer['location'];
                    //get current due
                    RecentInvoiceModel.findOne({
                        $and: [
                            {
                                "customer_id": id
                            },
                            {
                                "status": "Due"
                            }
                        ]
                    }, function (err, recentinvoice) {
                        if (recentinvoice) {
                            report.current_due = recentinvoice['amount_due'];
                            //get all previous due
                            AllInvoiceModel.find({
                                $and: [
                                    {
                                        "customer_id": id
                                    },
                                    {
                                        "status": "Due"
                                    }
                                ]
                            }, function (err, allInvoice) {
                                _.each(allInvoice, (item) => {
                                    report.previous_due += item['amount_due'];
                                });
                                reportList.push(report);
                            });
                        }
                    });
                });
                res.send(reportList);
            } else {
                res.send({status: false});
            }
        });
    }
}