/*
* API endpoints are defined here 
* all routes start with /api
*/
import * as express from 'express';
import { Router, Request, Response } from 'express';
import { CustomerController } from '../controllers/customer.controller';

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

export const ApiRoute: Router = router;
