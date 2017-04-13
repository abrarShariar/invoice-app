import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../invoice.service';
import { Customer } from '../../customer/customer';
import * as _ from 'underscore';
import { Invoice } from '../invoice';
import { ProductService } from '../../product/product.service';
import { AreaService } from '../../area/area.service';

@Component({
  selector: 'app-invoice-recent',
  templateUrl: './invoice-recent.component.html',
  styleUrls: ['./invoice-recent.component.css']
})
export class InvoiceRecentComponent implements OnInit {

  public invoiceList: Invoice[] = [];
  constructor(private invoiceService: InvoiceService, private productService: ProductService, private areaService: AreaService) { }

  ngOnInit() {
    this.getRecentInvoice();
  }

  getRecentInvoice() {
    this.invoiceService.getRecentInvoice()
      .subscribe(
      (res: Customer[]) => {
        _.each(res, (customer: Customer) => {
          let tempInvoice: Invoice;

          // get product
          // this.productService.getProductById(customer.product)
          //   .subscribe(
          //   (res) => {
              
          //   }
          //   )

          // get area
          this.areaService.getAreaById(customer.area)
            .subscribe(
            (res) => {
              customer.areaData = res;
            }
            )
          //prepare invoice
          tempInvoice = {
              customerData: customer,
              payment_due_date: Date.now(),
              status: 'Due',
              discount: 0,
              invoice_created_date: Date.now(),
              productList: customer.productList
          }
        });
      },
      (err) => {
        console.log(err);
      }
      )
  }

}
