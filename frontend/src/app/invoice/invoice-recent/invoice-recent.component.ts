import {Router, NavigationExtras} from '@angular/router';
import {Product} from '../../product/product';
import {Component, OnInit} from '@angular/core';
import {InvoiceService} from '../invoice.service';
import {Customer} from '../../customer/customer';
import * as _ from 'underscore';
import {Invoice} from '../invoice';
import {ProductService} from '../../product/product.service';
import {AreaService} from '../../area/area.service';
import {CustomerService} from '../../customer/customer.service';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-invoice-recent',
  templateUrl: './invoice-recent.component.html',
  styleUrls: ['./invoice-recent.component.css']
})
export class InvoiceRecentComponent implements OnInit {
  public currentDate: number = Date.now();
  public invoiceList: Invoice[] = [];
  public searchMode = 'username';
  public partialInvoice: Invoice;
  public partialPaymentForm: FormGroup;
  public paymentStatus: string;
  public partialPay: any;
  public isInvoiceSaved: boolean = false;
  public isInvoiceError: boolean = false;

  constructor(private fb: FormBuilder, private customerService: CustomerService, private router: Router, private invoiceService: InvoiceService, private productService: ProductService, private areaService: AreaService) {
  }

  ngOnInit() {
    this.wakeUpInvoiceDemon();
  }

  // New methods ---- New plans
  wakeUpInvoiceDemon() {
    this.invoiceService.cleanInvoice()
      .subscribe(
        (res) => {
          if (res.status) {
            this.generateNewInvoice();
          } else {
            this.getRecentInvoiceDB();
          }
        },
        (err) => {
          console.log("Error in clean Invoice");
        }
      )
  }

  generateNewInvoice() {
    // 1) prepare invoice
    // 2) Save to DB
    // 3) Fetch and display all recent invoices
    this.buildRecentInvoice();
  }

  getRecentInvoiceDB() {
    this.invoiceList = [];
    this.invoiceService.getRecentInvoiceDB()
      .subscribe(
        (res: Invoice[]) => {
          _.each(res, (invoice: Invoice) => {
            let customer: Customer;
            this.customerService.getCustomerDetails(invoice.customer_id)
              .subscribe(
                (res: Customer) => {
                  customer = res;
                  customer.productData = [];
                  if (invoice.productList.length > 0) {
                    _.each(invoice.productList, (element) => {
                      this.productService.getProductById(element)
                        .subscribe(
                          (res: Product) => {
                            customer["productData"].push(res);
                          }
                        )
                    });
                  }
                  this.areaService.getAreaById(customer.area)
                    .subscribe(
                      (res) => {
                        customer["areaData"] = res;
                      },
                    )
                  invoice.customerData = customer;
                  this.invoiceList.push(invoice);
                }
              )
          });
        },
      )
  }


  buildRecentInvoice() {
    this.invoiceService.getRecentInvoice()
      .subscribe(
        (res: Customer[]) => {
          let tempInvoice: Invoice;
          _.each(res, (customer: Customer) => {
            tempInvoice.customer_id = customer['_id'];
            tempInvoice.productList = customer.productList;
            let date = new Date();
            let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            tempInvoice.payment_due_date = firstDay;
            tempInvoice.status = 'Due';
            tempInvoice.discount = 0;
            tempInvoice.total = 0;
            tempInvoice.amount_due = 0;
            _.each(customer.productList, (item) => {
              this.productService.getProductById(item)
                .subscribe(
                  (res: Product) => {
                    tempInvoice.total = tempInvoice.total + res.rate;
                    tempInvoice.amount_due = tempInvoice.total;
                  }
                )
            });
          });
        }
      )
  }


  // ----------------------------


  buildRecentInvoiceOld() {
    this.invoiceList = [];
    this.invoiceService.getRecentInvoice()
      .subscribe(
        (res: Customer[]) => {
          _.each(res, (customer: Customer) => {
            customer.productData = [];
            let tempInvoice: Invoice;

            if (customer.productList.length > 0) {
              _.each(customer.productList, (element) => {
                this.productService.getProductById(element)
                  .subscribe(
                    (res: Product) => {
                      customer.productData.push(res);
                    }
                  )
              });
            }

            this.areaService.getAreaById(customer.area)
              .subscribe(
                (res) => {
                  customer.areaData = res;
                }
              )

            let date = new Date();
            let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

            //prepare invoice
            tempInvoice = {
              customerData: customer,
              payment_due_date: firstDay,
              status: 'Due',
              discount: 0,
              invoice_created_date: firstDay,
              total: 0,
              amount_due: 0,
              productList: customer.productList
            }

            _.each(customer.productList, (item) => {
              this.productService.getProductById(item)
                .subscribe(
                  (res: Product) => {
                    tempInvoice.total = tempInvoice.total + res.rate;
                    tempInvoice.amount_due = tempInvoice.total;
                  },
                  (err) => {
                  }
                )
            });
            this.invoiceList.push(tempInvoice);
          });
        },
        (err) => {
          console.log(err);
        }
      )
  }


  //change search filter
  filterChange(event: any) {
    this.searchMode = event;
  }

  //quick search
  quickSearch(event: any) {
    if (event == '') {
      this.buildRecentInvoice();
      return;
    }
    let data = {
      text: event
    }
    let reg = new RegExp(event, "i");
    let resArray = [];
    if (this.searchMode == 'username') {
      _.each(this.invoiceList, (item) => {
        if (reg.test(item['customerData']['username'])) {
          resArray.push(item);
        }
      });
      this.invoiceList = resArray;
    }
    else if (this.searchMode == 'mobile_number') {
      _.each(this.invoiceList, (item) => {
        if (reg.test(item['customerData']['mobile_primary'])) {
          resArray.push(item);
        }
      });
      this.invoiceList = resArray;
    }
    else if (this.searchMode == 'area') {
      _.each(this.invoiceList, (item) => {
        if (reg.test(item['customerData']['areaData']['name'])) {
          resArray.push(item);
        }
      });
      this.invoiceList = resArray;
    }
  }

  //edit invoice
  editInvoice(invoice: Invoice) {
    console.log(invoice);
    let navextras: NavigationExtras = {
      queryParams: {"invoice": JSON.stringify(invoice)}
    };
    this.router.navigate(['/invoice/edit'], navextras);
  }

  changeStatus(status: string, invoice: Invoice) {
    invoice.status = status;

    if (invoice.status == 'Paid') {
      invoice.paid_date = Date.now();
      invoice.amount_due = 0;
    } else if (invoice.status == 'Due') {
      invoice.amount_due = invoice.total;
    } else if (invoice.status == 'Partially Paid') {
      this.partialInvoice = invoice;
    }
  }

  submitPartialPaymentForm() {
    let data = {
      amount_partially_paid: this.partialPaymentForm.value.amount_partially_paid
    };
  }

  toggleSearchStatus(event: any) {

    this.paymentStatus = event.target.value;
    if (this.paymentStatus == 'Due') {
      this.buildRecentInvoice();
      return;
    }
    let resArray = [];
    _.each(this.invoiceList, (item) => {
      if (_.isEqual(item.status, this.paymentStatus)) {
        resArray.push(item);
      }
    });
    this.invoiceList = resArray;
  }

  savePartialPay(invoice: Invoice) {
    invoice.status = 'Partially Paid';
    if (this.partialPay <= invoice.total) {
      invoice.amount_due = invoice.total - this.partialPay;
      invoice.partially_paid = this.partialPay;
    }
    if (this.partialPay == invoice.total) {
      invoice.status = 'Paid';
      invoice.paid_date = Date.now();
    }
    this.partialPay = 0;
  }

  resetInvoiceAll() {
    this.buildRecentInvoice();
  }

  saveInvoiceAll() {
    //first clean recent invoices
    this.invoiceService.dropRecentInvoice()
      .subscribe(
        (res) => {
        },
        (err) => {
          console.log("ERR");
        }
      )

    let data = {};
    _.each(this.invoiceList, (item) => {
      data = {
        customer_id: item['customerData']['_id'],
        payment_due_date: item['payment_due_date'],
        amount_due: item['amount_due'],
        status: item['status'],
        total: item['total'],
        discount: item['discount'],
        invoice_created_date: item['invoice_created_date'],
        paid_date: item['paid_date'],
        amount_partially_paid: item['partially_paid'],
        productList: item['productList'],
        action: 'Not Downloaded'
      }

      this.invoiceService.saveRecentInvoice(data)
        .subscribe(
          (res) => {
            if (res.status) {
              this.isInvoiceSaved = true;
            } else {
              this.isInvoiceError = true;
            }
          },
          (err) => {
            this.isInvoiceError = true;
          }
        )
    });
  }
}
