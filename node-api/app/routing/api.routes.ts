/*
* API endpoints are defined here 
* all routes start with /api
*/
import * as express from 'express';
import { Router, Request, Response } from 'express';
import { CustomerController } from '../controllers/customer.controller';
import { ProductController } from '../controllers/product.controller';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send("Welcome to API routes");
});

//customer file upload
router.post('/customer/create', (req: Request, res: Response) => {
    CustomerController.createNewCustomer(res, req.body);
});

//all customers
router.get('/customer/all', (req: Request, res: Response) => {
    CustomerController.getAllCustomers(res);
});

//set active/inactive status
router.put('/customer/status_change', (req: Request, res: Response) => {
    CustomerController.changeStatus(res, req.body);
});

//get details of specific customer by id
router.get('/customer/details/:id', (req: Request, res: Response) => {
    CustomerController.getCustomerDetails(res, req.params.id);
});

//update customer details
router.put('/customer/details/update', (req: Request, res: Response) => {
    CustomerController.updateCustomerDetails(res, req.body);
});

// create new product
router.post('/product/create', (req: Request, res: Response) => {
    ProductController.create(res, req.body);
});

// get all product
router.get('/product/all', (req: Request, res: Response) => {
    ProductController.getAllProduct(res);
});

//set active/inactive status
router.put('/product/status_change', (req: Request, res: Response) => {
    ProductController.changeStatus(res, req.body);
});








export const ApiRoute: Router = router;
