import { DatePipe } from '@angular/common/src/pipes/date_pipe';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { InvoiceService } from '../invoice.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from "rxjs";
import { Invoice } from '../invoice';
import { Router } from "@angular/router";
import { SelectItem } from 'primeng/primeng';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ProductService } from '../../product/product.service';
import * as _ from 'underscore';
import { Product } from '../../product/product';

@Component({
  selector: 'app-invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.css']
})
export class InvoiceEditComponent implements OnInit {
  @ViewChild('productSelectBox') productSelectBox: ElementRef;

  cities: SelectItem[];
  public productList: any[] = [];
  public additionalProducts: any[] = [];
  public addProductCounter: number = 0;
  public allProductsAdd: any[] = [];

  selectedCity: string;

  public productSuggestions: any[] = [];

  private subscription: Subscription;
  public invoiceDetailForm: FormGroup;
  private id: any;
  public invoice: Invoice;
  public currentDate: number = Date.now();
  public datePipe: DatePipe = new DatePipe('en-US');
  public paymentStatus: string = 'Due';

  constructor(private elementRef: ElementRef, private productService: ProductService, private fb: FormBuilder, private invoiceService: InvoiceService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.getProductList();
    this.subscription = this.route.params.subscribe(params => {
      let data = this.route.queryParams["_value"].invoice;
      this.invoice = JSON.parse(data);
      this.allProductsAdd = this.invoice.productList;
      this.buildForm();
    });
  }

  buildForm() {
    let invoice_created_date = this.datePipe.transform(this.invoice.invoice_created_date, 'y-MM-dd');
    let payment_due_date = this.datePipe.transform(this.invoice.payment_due_date, 'y-MM-dd')
    this.invoiceDetailForm = this.fb.group({
      username: [this.invoice.customerData.username],
      email: [this.invoice.customerData.email],
      fullname: [this.invoice.customerData.fullname],
      location: [this.invoice.customerData.location],
      area: [this.invoice.customerData.areaData.name],
      city: [this.invoice.customerData.city],
      mobile_primary: [this.invoice.customerData.mobile_primary],
      mobile_secondary: [this.invoice.customerData.mobile_secondary],
      payment_due_date: [payment_due_date],
      amount_due: [this.invoice.amount_due],
      status: [this.invoice.status],
      total: [this.invoice.total],
      discount: [this.invoice.discount],
      invoice_created_date: [invoice_created_date],
      paid_date: [''],
      amount_partially_paid: ['']
    })
  }

  getProductSuggestions(event: any) {
    let data = {
      text: event.query
    }

    this.productService.searchByName(data)
      .subscribe(
      (res) => {
        this.productSuggestions = res;
      },
      (err) => {

      }
      )
  }

  getProductList() {
    this.productList = [];
    this.productService.getAllProduct()
      .subscribe(
      (res) => {
        _.each(res, (item) => {
          if (item['status']) {
            this.productList.push(item);
          }
        });
      },
      (err) => {
        console.log("ERROR from productList");
      }
      )
  }

  addProduct() {
    let newProduct = this.productList[0];
    this.additionalProducts.push(newProduct);
    this.allProductsAdd.push(newProduct._id);
    this.updatePayments();
  }

  removeProduct(index) {
    let delIndex = this.allProductsAdd.indexOf(this.additionalProducts[index]);
    this.allProductsAdd.splice(delIndex, 1);
    this.additionalProducts.splice(index, 1);
    this.updatePayments();
  }

  onProductChange(event: any, index, mode) {
    if (mode != 'my') {
      index = index + this.invoice.customerData.productData.length;
    }
    this.allProductsAdd[index] = event.target.value;
    this.updatePayments();
  }

  submitInvoiceEditForm() {
    let data = {};
    data = {
      customer_id: this.invoice.customerData['_id'],
      payment_due_date: this.invoiceDetailForm.value.payment_due_date,
      amount_due: this.invoiceDetailForm.value.amount_due,
      status: this.invoiceDetailForm.value.status,
      total: this.invoiceDetailForm.value.total,
      discount: this.invoiceDetailForm.value.discount,
      invoice_created_date: this.invoiceDetailForm.value.invoice_created_date,
      paid_date: this.invoiceDetailForm.value.paid_date,
      amount_partially_paid: this.invoiceDetailForm.value.amount_partially_paid,
      productList: this.allProductsAdd,
      action: 'Not Downloaded'
    }
    
    this.invoiceService.storeInvoice(data)
      .subscribe(
      (res) => {
        this.router.navigate(['dashboard/invoice/display',res.id]);
      },
      (err) => {

      }
      )
  }


  changeStatus(event: any) {
    this.paymentStatus = event.target.value;
    if (this.paymentStatus == 'Paid') {
      let currentDate = this.datePipe.transform(Date.now(), 'y-MM-dd');
      this.invoiceDetailForm.patchValue({
        paid_date: currentDate
      });
    }
  }


  getPartiallyPaid(event: any) {
    this.invoiceDetailForm.patchValue({
      amount_partially_paid: event.target.value,
      amount_due: this.invoice.amount_due - event.target.value
    });
  }


  getDiscount(event: any) {
    this.invoiceDetailForm.patchValue({
      total: this.invoiceDetailForm.value.amount_due - event.target.value
    });
  }

  updatePayments() {
    let total = 0;
    _.each(this.allProductsAdd, (item) => {
      let product = _.findWhere(this.productList, { _id: item });
      total += product.rate;
    });

    this.invoiceDetailForm.patchValue({
      total: total,
      discount: 0,
      amount_due: total
    });
  }
}
