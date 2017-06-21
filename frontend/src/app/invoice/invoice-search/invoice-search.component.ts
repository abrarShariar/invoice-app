import {Component, OnInit} from '@angular/core';
import {Invoice} from '../invoice';
import {InvoiceService} from '../invoice.service';
import {Customer} from '../../customer/customer';
import {Product} from '../../product/product';
import {AreaService} from '../../area/area.service';
import {CustomerService} from '../../customer/customer.service';
import {ProductService} from '../../product/product.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-invoice-search',
  templateUrl: './invoice-search.component.html',
  styleUrls: ['./invoice-search.component.css']
})
export class InvoiceSearchComponent implements OnInit {
  public searchText: string;
  public searchResults: any[] = [];
  public invoiceList: Invoice[] = [];
  public partialInvoice: Invoice;
  public partialPay: any;
  public delInvoice: Invoice;
  public showRemoveConfirmation: boolean = false;

  constructor(private customerService: CustomerService, private invoiceService: InvoiceService, private productService: ProductService, private areaService: AreaService) {
  }

  ngOnInit() {
  }


  getSearchText(event: any) {
    this.invoiceList = [];
    this.searchResults = [];
    this.searchText = event.target.value;
    this.getGlobalInvoiceSearchByCustomer();
  }


  getGlobalInvoiceSearchByCustomer() {
    this.invoiceService.globalInvoiceSearchByCustomer(this.searchText)
      .subscribe(
        (res) => {
          this.searchResults = res;
        }
      )
  }

  getSearchDetails(data) {
    let id = data['_id'];
    this.invoiceList = [];
    this.invoiceService.getInvoiceByCustomerId(id)
      .subscribe(
        (res) => {
          _.each(res, (invoice: Invoice) => {
            let customer: Customer;

            if (invoice['type']=='') {
              invoice['type'] = 'recent';
            }

            this.customerService.getCustomerDetails(invoice.customer_id)
              .subscribe(
                (res: Customer) => {
                  customer = res;
                  if (customer['status']) {
                    customer.productData = [];
                    if (invoice.productList.length > 0) {
                      _.each(invoice.productList, (element) => {
                        this.productService.getProductById(element)
                          .subscribe(
                            (res: Product) => {
                              customer['productData'].push(res);
                            }
                          )
                      })
                    }

                    this.areaService.getAreaById(customer.area)
                      .subscribe(
                        (res) => {
                          customer['areaData'] = res;
                        }
                      )
                    invoice.customerData = customer;
                    this.invoiceList.push(invoice);
                  }
                }
              )
          })
        },
        (err) => {
          console.log('Error in getSearchDetails');
        }
      )
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

    if (invoice['type'] != 'recent') {
      invoice['type'] = 'all';
    }
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
          // console.log(res);
        },
        (err) => {
          console.log("Error in setpaiddatecounter");
        }
      )
  }

  savePartialPay(invoice: Invoice) {
    let data = {
      id: this.partialInvoice['_id'],
      amount_partially_paid: this.partialPay
    }

    this.invoiceService.savePartialPay(data)
      .subscribe(
        (res) => {
          if (res['status']) {
            this.partialPay = 0;
            this.getSearchDetails({_id: invoice.customer_id});
          }
        },
        (err) => {

        }
      )
  }

  remove(invoice: Invoice) {
    this.showRemoveConfirmation = true;
    this.delInvoice = invoice;
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


}
