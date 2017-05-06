import {Router, Request, Response} from 'express';
import {ProductModel} from '../database/models/product.model';
import * as _ from 'underscore';

export class ProductController {
    constructor() {
    }

    //create new product
    static create(res: Response, data: any) {
        let isDataInserted: boolean = false;
        let product = new ProductModel({
            name: data.name,
            rate: data.rate,
            description: data.description,
            status: data.status,
            vat: data.vat
        });

        product.save(function (err) {
            if (err) {
                res.send({status: false});
            } else {
                res.send({status: true});
            }
        });
    }


    //get all product
    static getAllProduct(res: Response) {
        ProductModel.find({}, (err, products) => {
            if (!err) {
                res.send(products);
            }
        })
    }


    //changing status - active/inactive
    static changeStatus(res: Response, data: any) {
        ProductModel.update({_id: data.id}, {$set: {status: data.status}}, function (err) {
            if (err) {
                res.send({status: false});
            } else {
                res.send({status: true});
            }
        });
    }

    //get product by _id
    static getProductById(res: Response, id) {
        ProductModel.findOne({_id: id}, function (err, data) {
            res.send(data);
        });
    }

    //update product
    static update(res: Response, data: any) {
        console.log(data);
        ProductModel.update({_id: data.id}, {
            $set: {
                name: data.name,
                rate: data.rate,
                description: data.description,
                status: data.status,
                vat: data.vat
            }
        }, function (err) {
            if (err) {
                res.send({status: false});
            } else {
                res.send({status: true});
            }
        });
    }

    //search products list by name
    static searchByName(res: Response, data: any) {
        ProductModel.find({"name": {$regex: ".*" + data.text + ".*", $options: 'i'}}, function (err, data) {
            if (!err) {
                res.send(data);
            }
        });
    }

    // get total of all products of productList
    static getTotal(res: Response, data: any) {
        let total = 0;
        _.each(data['productList'], (item) => {
            ProductModel.findOne({_id: item}, function (err, result) {
                total += result['rate'];
            });
        });
        res.send({total:total});
    }

}