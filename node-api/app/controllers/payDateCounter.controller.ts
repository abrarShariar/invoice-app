import {Router, Request, Response} from 'express';
import * as _ from 'underscore';
declare var Date: any;
import {PayDateCounterModel} from '../database/models/payDateCounter.model';


export class PayDateCounterController {
    constructor() {
    }

    static setPayDateCounter() {

    }

    static checkAndCleanPayDateCounter(res: Response) {
        let date = new Date();
        let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        PayDateCounterModel.count({}, function (err, count) {
            if (count > 0) {
                PayDateCounterModel.find({
                    "date": {
                        $lt: firstDay
                    }
                }, (err, data) => {
                    if (data.length <= 0) {
                        res.send({"status": false});
                    }
                    else {
                        PayDateCounterModel.find({'_id': data['_id']}).remove(function (err, data) {
                            if (!err) {
                                res.send({"status": true});
                            }
                        });
                    }
                })
            } else {
                res.send({"status": true})
            }
        });
    }

    static getPayDateCounter() {

    }
}

