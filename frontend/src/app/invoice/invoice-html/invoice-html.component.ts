import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {InvoiceService} from '../invoice.service';
import {Router} from "@angular/router";
import {ActivatedRoute} from '@angular/router';
import {Subscription} from "rxjs";
import {Invoice} from '../invoice';
import {CustomerService} from '../../customer/customer.service';
import {ProductService} from '../../product/product.service';
import * as _ from 'underscore';

declare let jsPDF;
declare let html2canvas;

@Component({
  selector: 'app-invoice-html',
  templateUrl: './invoice-html.component.html',
  styleUrls: ['./invoice-html.component.css']
})
export class InvoiceHtmlComponent implements OnInit {

  @ViewChild('invoiceBox') invoiceBox: ElementRef;

  private id: any;
  private subscription: Subscription;
  public invoice: Invoice;
  private type = '';


  constructor(private productService: ProductService, private customerService: CustomerService, private invoiceService: InvoiceService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.type = params['type'];
      this.getInvoiceById(params['id']);
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  downloadPDF() {
    html2canvas(document.getElementById('invoice_box'), {
      onrendered: (canvas) => {
        var imgData = canvas.toDataURL("image/jpeg", 1.0);
        var pdf = new jsPDF("p", "mm", "a4");
        pdf.addImage(imgData, 'JPEG', 0, 0, 210, 200);
        pdf.save(this.invoice.customerData.username + "_" + this.id + ".pdf");
      }
    });
  }


  getInvoiceById(id: string) {
    this.invoiceService.getInvoiceById(this.type, id)
      .subscribe(
        (res) => {
          this.invoice = res;
          this.invoice.total = 0;
          this.invoice.productData = [];
          // get product data
          _.each(this.invoice.productList, (item) => {
            this.productService.getProductById(item)
              .subscribe(
                (res) => {
                  res['amount_with_vat'] = res['rate'] + (res['rate'] * (res['vat'] / 100));
                  this.invoice.productData.push(res);
                  this.invoice.total = this.invoice.total + res['amount_with_vat'];
                  this.invoice.amount_due = this.invoice.total;
                }, (err) => {

                }, () => {
                  if (this.invoice.amount_partially_paid.length > 0) {
                    _.each(this.invoice.amount_partially_paid, (data) => {
                      this.invoice.amount_due = this.invoice.amount_due - data['amount'];
                    });
                  }
                }
              )
          });


          //get customer data
          this.customerService.getCustomerDetails(this.invoice.customer_id)
            .subscribe(
              (res) => {
                this.invoice.customerData = res;
              },
              (err) => {

              },
              () => {
                console.log(this.invoice);
              }
            )
        },
        (err) => {
          console.log(err);
        }
      )
  }


}
