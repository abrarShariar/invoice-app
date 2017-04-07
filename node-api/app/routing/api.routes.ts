/*
* API endpoints are defined here 
* all routes start with /api
*/
import * as express from 'express';
import { Router, Request, Response } from 'express';
import { CustomerController } from '../controllers/customer.controller';
import { ProductController } from '../controllers/product.controller';
import { AreaController } from '../controllers/area.controller';

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

//get product by id
router.get('/product/id/:id', (req: Request, res: Response) => {
    ProductController.getProductById(res, req.params.id);
});

//set active/inactive status
router.put('/product/status_change', (req: Request, res: Response) => {
    ProductController.changeStatus(res, req.body);
});

//update product
router.put('/product/update', (req: Request, res: Response) => {
    ProductController.update(res, req.body);
});


//create a new area
router.post('/area/create', (req: Request, res: Response) => {
    AreaController.create(res, req.body);
});

//get all areas
router.get('/area/all',(req: Request, res: Response)=>{
    AreaController.getAllArea(res);
});

//set active/inactive status
router.put('/area/status_change', (req: Request, res: Response) => {
    AreaController.changeStatus(res, req.body);
});

//get area by id
router.get('/area/id/:id', (req: Request, res: Response) => {
    AreaController.getAreaById(res, req.params.id);
});

//update area
router.put('/area/update', (req: Request, res: Response) => {
    AreaController.update(res, req.body);
});





export const ApiRoute: Router = router;
