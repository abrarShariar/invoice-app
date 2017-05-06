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
import {FormGroup, FormBuilder} from "@angular/forms";

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
  private tempInvoice: Invoice;

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
    this.invoiceService.dropRecentInvoice()
      .subscribe(
        (res) => {
          this.buildRecentInvoice();
        }
      )
  }

  getRecentInvoiceDB() {
    this.invoiceList = [];
    this.invoiceService.getRecentInvoiceDB()
      .subscribe(
        (res: Invoice[]) => {
          if (res.length == 0) {
            this.generateNewInvoice();
          } else {
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
          }
        }
      )
  }

  buildRecentInvoice() {
    this.invoiceService.getRecentInvoice()
      .subscribe(
        (res: Customer[]) => {
          _.each(res, (customer: Customer) => {
            let date = new Date();
            let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            this.tempInvoice = {
              customer_id: customer['_id'],
              productList: customer.productList,
              payment_due_date: firstDay,
              status: 'Due',
              discount: 0,
              total: 0,
              amount_due: 0,
              amount_partially_paid: 0
            };

            this.getTotal(customer.productList);
            // this.saveRecentInvoice(this.tempInvoice);
          });
          this.getRecentInvoiceDB();
        }
      )
  }


  saveRecentInvoice(invoice: Invoice) {
    this.invoiceService.saveRecentInvoice(invoice)
      .subscribe(
        (res) => {
        },
        (err) => {

        }
      )
  }


//  get total pay of all product list
  getTotal(productList){
    let data = {
      "productList" : productList
    };
    this.invoiceService.getTotal(data)
      .subscribe(
        (res)=>{
          console.log(res);
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
      this.getRecentInvoiceDB();
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
    let navextras: NavigationExtras = {
      queryParams: {"invoice": JSON.stringify(invoice)}
    };
    this.router.navigate(['/invoice/edit'], navextras);
  }

  changeStatus(status: string, invoice: Invoice) {
    invoice.status = status;
    if (status == 'Paid') {
      invoice.paid_date = Date.now();
      invoice.amount_due = 0;
    } else if (status == 'Due') {
      invoice.amount_due = invoice.total;
    } else if (status == 'Partially Paid') {
      this.partialInvoice = invoice;
    }

    this.invoiceService.changeInvoiceStatus(invoice)
      .subscribe(
        (res) => {
        }
      )
  }

  submitPartialPaymentForm() {
    let data = {
      amount_partially_paid: this.partialPaymentForm.value.amount_partially_paid
    };
  }

  toggleSearchStatus(event: any) {
    this.getRecentInvoiceDB();
    this.paymentStatus = event.target.value;
    if (this.paymentStatus == 'All') {
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
