/*
 * API endpoints are defined here
 * all routes start with /api
 */
import {Router, Request, Response} from 'express';
import {CustomerController} from '../controllers/customer.controller';
import {ProductController} from '../controllers/product.controller';
import {AreaController} from '../controllers/area.controller';
import {InvoiceController} from '../controllers/invoice.controller';
import {PayDateCounterController} from '../controllers/payDateCounter.controller';
import {ReportController} from '../controllers/report.controller';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send("Welcome to API routes");
});

//customer file upload
router.post('/customer/create', (req: Request, res: Response) => {
    CustomerController.createNewCustomer(res, req.body);
});

//all customers
router.get('/customer/all/page=:paginator', (req: Request, res: Response) => {
    CustomerController.getAllCustomers(res, req.params.paginator);
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
router.get('/invoice/:type/id/:id', (req: Request, res: Response) => {
    InvoiceController.getInvoiceById(res, req.params.type, req.params.id);
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
router.get('/invoice/recent_invoice_db/paginator=:paginator', (req: Request, res: Response) => {
    InvoiceController.getRecentInvoiceDB(res, req.params.paginator);
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

router.delete('/invoice/delete/id/:id', (req: Request, res: Response) => {
    InvoiceController.deleteRecentInVoiceById(res, req.params.id);
});

// get all invoices
router.get('/invoice/all/page=:paginator', (req: Request, res: Response) => {
    InvoiceController.getAllInvoices(res, req.params.paginator);
});

//pay date coounter clean
router.get('/home/pay-date-counter/clean-build', (req: Request, res: Response) => {
    PayDateCounterController.checkAndCleanPayDateCounter(res);
});

//set pay date counter
router.post('/invoice/set_paid_date_counter', (req: Request, res: Response) => {
    PayDateCounterController.setPayDateCounter(res, req.body);
});

// get pay date counter
router.get('/invoice/get_paid_date_counter', (req: Request, res: Response) => {
    PayDateCounterController.getPayDateCounter(res);
});

// get all invoice count
router.get('/invoice/all_invoice_count', (req: Request, res: Response) => {
    InvoiceController.getAllInvoiceCount(res);
});

//get customer by area
router.get('/report/customer_by_area/:id', (req: Request, res: Response) => {
    ReportController.getCustomerByArea(res, req.params.id);
});

// generate report for a list of customers
router.get('/report/report_for_customers/:id', (req: Request, res: Response) => {
    ReportController.getReportForCustomers(res, req.params.id);
});

// check status change for generate invoice monthly
router.post('/customer/check_change_generate_invoice_monthly', (req: Request, res: Response) => {
    CustomerController.setCheckGenerateInvoice(res, req.body);
});

router.post('/upload-file', (req: Request, res: Response) => {
    CustomerController.uploadFile(res, req.body);
});

router.post('/customer/upload-file-contents', (req: Request, res: Response) => {
    CustomerController.getFileContents(res, req.body);
});

router.get('/customer/customer-count', (req: Request, res: Response) => {
    CustomerController.getTotalCustomerCount(res);
});

router.get('/customer/generate-auto-invoice/:id', (req: Request, res: Response) => {
    CustomerController.generateAutoInvoice(res, req.params.id);
});

router.get('/customer/get-auto-generate-list', (req: Request, res: Response) => {
    CustomerController.getAutoGenerateCustomerList(res);
})


export const ApiRoute: Router = router;
