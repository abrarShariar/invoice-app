import {Router, Request, Response} from 'express';
declare var Date: any;
import {PayDateCounterModel} from '../database/models/payDateCounter.model';


export class PayDateCounterController {
    constructor() {
    }

    static setPayDateCounter(res: Response, id) {
        let date = new Date();
        let current_date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        PayDateCounterModel.findOne({
            "date": {
                $eq: current_date
            }
        }, function (err, data) {
            if (!data) {
                let payDataCounter = new PayDateCounterModel({
                    date: current_date,
                    invoice_id: [id],

                });
                payDataCounter.save(function (err, docs) {
                    if (!err) {
                        res.send({status: true});
                    } else {
                        res.send({status: false});
                    }
                });
            } else {
                PayDateCounterModel.update({date: current_date}, {
                    $addToSet: {invoice_id: id}
                }, function (err, docs) {
                    if (!err) {
                        res.send({status: true});
                    } else {
                        res.send({status: false});
                    }
                });
            }
        })
    }

    static checkAndCleanPayDateCounter(res: Response) {
        let date = new Date();
        let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        PayDateCounterModel.find({
            "date": {
                $lt: firstDay
            }
        }).remove().exec(function (err, data) {
            res.send({"remove_count": data});
        });
    }

    static getPayDateCounter(res: Response) {
        let date = new Date();
        let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        PayDateCounterModel.find({
            "date": {
                $gt: firstDay
            }
        }, function (err, data) {
            if (!err) {
                res.send(data);
            } else {
                res.send({status: false});
            }
        })
    }
}

