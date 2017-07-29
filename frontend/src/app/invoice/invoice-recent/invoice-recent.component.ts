import {Router} from '@angular/router';
import {Product} from '../../product/product';
import {Component, OnInit} from '@angular/core';
import {InvoiceService} from '../invoice.service';
import {Customer} from '../../customer/customer';
import * as _ from 'underscore';
import {Invoice} from '../invoice';
import {ProductService} from '../../product/product.service';
import {AreaService} from '../../area/area.service';
import {CustomerService} from '../../customer/customer.service';

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
  public paymentStatus: string;
  public partialPay: any;
  public isInvoiceSaved: boolean = false;
  public isInvoiceError: boolean = false;
  public showRemoveConfirmation: boolean = false;
  public delInvoice: any;
  public paginator = 1;
  totalCustomerCount: number = 0;

  constructor(private customerService: CustomerService, private router: Router, private invoiceService: InvoiceService, private productService: ProductService, private areaService: AreaService) {
  }

  ngOnInit() {
    this.customerService.getTotalCustomerCount()
      .subscribe(
        (res) => {
          this.totalCustomerCount = res.count;
        }
      )
    this.getRecentInvoiceDB();
    // this.wakeUpInvoiceDemon();
  }

  //useless shitty method
  wakeUpInvoiceDemon() {
    this.invoiceService.cleanInvoice()
      .subscribe(
        (res) => {
          if (res.status) {
            this.generateNewInvoice();
          } else {
            this.getRecentInvoiceDB();
          }
        }
      )
  }

  //useless shitty method
  generateNewInvoice() {
    this.invoiceService.dropRecentInvoice()
      .subscribe(
        (res) => {
          this.buildAndSaveRecentInvoice();
        }
      )
  }

  getRecentInvoiceDB() {
    this.invoiceList = [];
    this.invoiceService.getRecentInvoiceDB(this.paginator)
      .subscribe(
        (res: Invoice[]) => {
          _.each(res, (invoice: Invoice) => {
            let customer: Customer;
            this.customerService.getCustomerDetails(invoice.customer_id)
              .subscribe(
                (res: Customer) => {
                  if (res['status']) {
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
                }
              )
          });
        },
        (err) => {

        },
        () => {
          for (let i = 0; i < this.invoiceList.length; i++) {
            console.log("Hello World");
          }
        }
      )
  }

  buildAndSaveRecentInvoice() {
    this.invoiceService.buildAndSaveRecentInvoice()
      .subscribe(
        (res) => {
          this.getRecentInvoiceDB();
        },
        (err) => {
          console.log('Error in build and save');
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

  filterChange(event: any) {
    this.searchMode = event;
  }

  quickSearch(event: any) {
    if (event == '') {
      this.getRecentInvoiceDB();
      return;
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

  changeStatus(status: string, invoice: Invoice) {
    if (status == 'Paid') {
      this.setPaidDateCounter(invoice);
      invoice.status = 'Paid';
      invoice.paid_date = Date.now();
      invoice.amount_due = 0;
    } else if (status == 'Due') {
      invoice.status = 'Due';
      invoice.amount_due = invoice.total;
      invoice.amount_partially_paid = [];
    } else if (status == 'Partially Paid') {
      this.partialInvoice = invoice;
    }

    invoice['type'] = 'recent';
    this.invoiceService.changeInvoiceStatus(invoice)
      .subscribe(
        (res) => {
        }
      )
  }

  setPaidDateCounter(invoice: Invoice) {
    this.invoiceService.setPaidDateCounter(invoice)
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log("Error in setpaiddatecounter");
        }
      )
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

  savePartialPay() {
    let data = {
      id: this.partialInvoice['_id'],
      amount_partially_paid: this.partialPay
    }

    this.invoiceService.savePartialPay(data)
      .subscribe(
        (res) => {
          if (res['status']) {
            this.partialPay = 0;
            this.getRecentInvoiceDB();
          }
        },
        (err) => {

        }
      )
  }

  remove(delInvoice) {
    this.showRemoveConfirmation = true;
    this.delInvoice = delInvoice;
  }

  removeConfirmation(status) {
    if (status) {
      this.invoiceService.deleteInvoice(this.delInvoice)
        .subscribe(
          (res) => {
            if (res['status']) {
              this.invoiceList = _.without(this.invoiceList, _.findWhere(this.invoiceList, {
                _id: this.delInvoice['_id']
              }));
              this.showRemoveConfirmation = false;
            }
          },
          (err) => {
          }
        )
    } else {
      this.delInvoice = undefined;
      this.showRemoveConfirmation = false;
    }
  }

  //  for pagination
  onPaginate(event: any) {
    this.paginator = event;
    this.getRecentInvoiceDB();
  }

}
