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
      date: [''],

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
        console.log(this.productSuggestions);
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
  }

  removeProduct(index) {
    let delIndex = this.allProductsAdd.indexOf(this.additionalProducts[index]);
    this.allProductsAdd.splice(delIndex,1);
    this.additionalProducts.splice(index,1);
  }

  onProductChange(event:any){
    // console.log(event.target.value);
    this.allProductsAdd.push(event.target.value);
    console.log(this.allProductsAdd);
  }





}
