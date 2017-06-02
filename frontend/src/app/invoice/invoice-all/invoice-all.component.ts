import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {InvoiceService} from '../invoice.service';
import {Invoice} from '../invoice';
import {Customer} from '../../customer/customer';
import {Product} from '../../product/product';
import {AreaService} from '../../area/area.service';
import {CustomerService} from '../../customer/customer.service';
import {ProductService} from '../../product/product.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-invoice-all',
  templateUrl: './invoice-all.component.html',
  styleUrls: ['./invoice-all.component.css']
})
export class InvoiceAllComponent implements OnInit {

  public invoiceList: Invoice[] = [];
  public partialInvoice: Invoice;
  totalInvoiceCount: number = 0;
  public paginator = 1;

  constructor(private customerService: CustomerService, private router: Router, private invoiceService: InvoiceService, private productService: ProductService, private areaService: AreaService) {
  }

  ngOnInit() {
    this.invoiceService.getAllInvoiceCount()
      .subscribe(
        (res) => {
          this.totalInvoiceCount = res.count;
        }
      );
    this.getAllInvoice();

  }

  getAllInvoice() {
    this.invoiceList = [];
    this.invoiceService.getAllInvoice(this.paginator)
      .subscribe(
        (res: Invoice[]) => {
          if (res.length == 0) {
            this.invoiceList = [];
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
                              customer['productData'].push(res);
                            }
                          )
                      });
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
                )
            });
          }
        },
        (err) => {
          console.log('ERROR in getAllInvoice');
        }
      )
  }

  toggleSearchStatus(event: any) {
    console.log(event);
  }

  filterChange(event: any) {

  }

  quickSearch(event: any) {

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

    invoice['type'] = 'all';

    this.invoiceService.changeInvoiceStatus(invoice)
      .subscribe(
        (res) => {

        }
      )
  }

  //  for pagination
  onPaginate(event: any) {
    this.paginator = event;
    this.getAllInvoice();
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

}
