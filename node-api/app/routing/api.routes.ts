/*
 * API endpoints are defined here
 * all routes start with /api
 */
import {Router, Request, Response} from 'express';
import {CustomerController} from '../controllers/customer.controller';
import {ProductController} from '../controllers/product.controller';
import {AreaController} from '../controllers/area.controller';
import {InvoiceController} from '../controllers/invoice.controller';

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
router.get('/area/all', (req: Request, res: Response) => {
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

//search all customers data by username
router.post('/customer/search/username', (req: Request, res: Response) => {
    CustomerController.searchByUsername(res, req.body);
});

//search all customers data by mobile number
router.post('/customer/search/mobile_number', (req: Request, res: Response) => {
    CustomerController.searchByMobileNumber(res, req.body);
});

//search all customers data by area
router.post('/customer/search/area', (req: Request, res: Response) => {
    CustomerController.searchByArea(res, req.body);
});

//search all customers data by area id
router.post('/customer/search/customerByArea', (req: Request, res: Response) => {
    CustomerController.customerByArea(res, req.body);
});

router.get('/customer/id/username=:username', (req: Request, res: Response) => {
    CustomerController.getIdByUsername(res, req.params.username);
});

//get recent invoices (this month)
router.get('/invoice/recent/customers', (req: Request, res: Response) => {
    InvoiceController.getRecentInvoiceCustomers(res);
});

//search all products data by name
router.post('/product/search/name', (req: Request, res: Response) => {
    ProductController.searchByName(res, req.body);
});

// post invoice
router.post('/invoice/create', (req: Request, res: Response) => {
    InvoiceController.storeInvoice(res, req.body);
});

// generate invoice as PDF
router.post('/invoice/generate/pdf', (req: Request, res: Response) => {
    InvoiceController.generateInvoice(res, req.body);
});

// get invoice by id
router.get('/invoice/id/:id', (req: Request, res: Response) => {
    InvoiceController.getInvoiceById(res, req.params.id);
});

//search all customers data by username
router.post('/invoice/search/username', (req: Request, res: Response) => {
    InvoiceController.searchByUsername(res, req.body);
});

// insert recent invoice into DB
router.post('/invoice/recent/save', (req: Request, res: Response) => {
    InvoiceController.saveRecentInvoice(res, req.body);
});

//drop all recent invoices
router.get('/invoice/drop/recent/all', (req: Request, res: Response) => {
    InvoiceController.dropRecentInvoiceAll(res);
});

//check if recent invoices exists
router.get('/invoice/recent_invoice/exists', (req: Request, res: Response) => {
    InvoiceController.checkRecentInvoiceExists(res);
});

// get invoice from db
router.get('/invoice/recent_invoice_db', (req: Request, res: Response) => {
    InvoiceController.getRecentInvoiceDB(res);
});

// clean and nuke recent invoices
router.get('/invoice/clean_invoice', (req: Request, res: Response) => {
    InvoiceController.cleanInvoice(res);
});

router.put('/invoice/change_status', (req: Request, res: Response) => {
    InvoiceController.changeStatus(res, req.body);
});

router.post('/invoice/product_list/total', (req: Request, res: Response) => {
    ProductController.getTotal(res, req.body);
});

router.get('/invoice/recent/build_and_save', (req: Request, res: Response) => {
    InvoiceController.buildAndSaveRecentInvoice(res);
});

router.post('/invoice/recent/partial_pay/save', (req: Request, res: Response) => {
    InvoiceController.savePartialPay(res, req.body);
});

router.post('/invoice/pre_generate_update', (req: Request, res: Response) => {
    InvoiceController.preGenerateUpdate(res, req.body);
});

export const ApiRoute: Router = router;
