import { Router, Request, Response } from 'express';
import { Observable } from 'rxjs/Rx';
import * as _ from 'underscore';
import { AreaModel } from '../database/models/area.model';


export class AreaController {
    constructor() { }

    //create new areas
    static create(res: Response, data: any) {
        let isDataInserted: boolean = false;
        let area = new AreaModel({
            name: data.name,
            status: true
        });
        area.save(function (err) {
            if (err) {
                res.send({ status: false });
            } else {
                res.send({ status: true });
            }
        });
    }


    //get all areas
    static getAllArea(res: Response) {
        AreaModel.find({}, (err, areas) => {
            if (!err) {
                res.send(areas);
            }
        })
    }

    //changing status - active/inactive
    static changeStatus(res: Response, data: any) {
        AreaModel.update({ _id: data.id }, { $set: { status: data.status } }, function (err) {
            if (err) {
                res.send({ status: false });
            } else {
                res.send({ status: true });
            }
        });
    }

    //get area by _id
    static getAreaById(res: Response, id) {
        AreaModel.findById(id, function (err, data) {
            if (!err) {
                res.send(data);
            }
        })
    }

    //update area
    static update(res: Response, data: any) {
        AreaModel.update({ _id: data.id }, {
            $set: {
                name: data.name,
                status: true
            }
        }, function (err) {
            if (err) {
                res.send({ status: false });
            } else {
                res.send({ status: true });
            }
        });
    }
}