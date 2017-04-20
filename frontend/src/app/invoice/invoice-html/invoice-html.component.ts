import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { InvoiceService } from '../invoice.service';
import { Router } from "@angular/router";
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from "rxjs";
import { Invoice } from '../invoice';
import { CustomerService } from '../../customer/customer.service';
import { ProductService } from '../../product/product.service';
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

  constructor(private productService:ProductService,private customerService: CustomerService, private invoiceService: InvoiceService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.getInvoiceById(params['id']);
      this.id = params['id'];
    });

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  downloadPDF() {
    html2canvas(document.getElementById('invoice_box'), {
      onrendered:  (canvas) => {
        var imgData = canvas.toDataURL("image/jpeg", 1.0);
        var pdf = new jsPDF("l", "mm", "a4");
        pdf.addImage(imgData, 'JPEG', 0, 0, 300, 200);
        pdf.save(this.invoice.customerData.username + "_" + this.id + ".pdf");
      }
    });
  }


  getInvoiceById(id: string) {
    this.invoiceService.getInvoiceById(id)
      .subscribe(
      (res) => {
        this.invoice = res;
        this.invoice.productData = [];
        // get product data
        _.each(this.invoice.productList,(item)=>{
          this.productService.getProductById(item)
              .subscribe(
                (res)=>{
                  this.invoice.productData.push(res);
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
          ()=>{
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
