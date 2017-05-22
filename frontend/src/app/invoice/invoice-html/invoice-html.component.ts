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
  private finalTotal;
  private finalTotalWords;


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
                  this.finalTotal = this.invoice.amount_due - this.invoice.discount;
                  this.finalTotalWords = this.inWords(this.finalTotal);
                  console.log(this.finalTotalWords);
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

  private a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
  private b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];

  inWords (num) {
  if ((num = num.toString()).length > 9) return 'overflow';
  let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return;
  var str = '';
  str += (n[1] != 0) ? (this.a[Number(n[1])] || this.b[n[1][0]] + ' ' + this.a[n[1][1]]) + 'crore ' : '';
  str += (n[2] != 0) ? (this.a[Number(n[2])] || this.b[n[2][0]] + ' ' + this.a[n[2][1]]) + 'lakh ' : '';
  str += (n[3] != 0) ? (this.a[Number(n[3])] || this.b[n[3][0]] + ' ' + this.a[n[3][1]]) + 'thousand ' : '';
  str += (n[4] != 0) ? (this.a[Number(n[4])] || this.b[n[4][0]] + ' ' + this.a[n[4][1]]) + 'hundred ' : '';
  str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (this.a[Number(n[5])] || this.b[n[5][0]] + ' ' + this.a[n[5][1]]) + 'only ' : '';
  return str;
}




}
