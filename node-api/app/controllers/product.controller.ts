import { Router, Request, Response } from 'express';
import { Observable } from 'rxjs/Rx';
import * as _ from 'underscore';
import { ProductModel } from '../database/models/product.model';


export class ProductController {
    constructor() { }

    //create new product
    static create(res: Response, data: any) {
        let isDataInserted: boolean = false;
        let product = new ProductModel({
            name: data.name,
            rate: data.rate,
            description: data.description,
            status: data.status
        });

        product.save(function (err) {
            if (err) {
                res.send({ status: false });
            } else {
                res.send({ status: true });
            }
        });
    }


    //get all product
    static getAllProduct(res: Response) {
        ProductModel.find({}, (err, products) => {
            let allProducts = [];
            if (!err) {
                res.send(products);
            }
        })
    }


    //changing status - active/inactive
    static changeStatus(res: Response, data: any) {
        ProductModel.update({ _id: data.id }, { $set: { status: data.status } }, function (err) {
            if (err) {
                res.send({ status: false });
            } else {
                res.send({ status: true });
            }
        });
    }

}