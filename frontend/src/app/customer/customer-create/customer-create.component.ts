import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CustomerService } from '../customer.service';
import * as _ from 'underscore';
import { Customer } from '../customer';
import { ProductService } from '../../product/product.service';
import { Product } from '../../product/product';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {
  showSuccess: boolean = false;
  showError: boolean = false;
  public customerCreateForm: FormGroup;
  public productList: Product[] = [];

  constructor(private fb: FormBuilder, private customerService: CustomerService, private productService: ProductService) { }

  ngOnInit() {
    this.buildForm();
    this.getProductList();
  }

  buildForm() {
    this.customerCreateForm = this.fb.group({
      username: [''],
      email: [''],
      fullname: [''],
      customer_currency: [''],
      mobile_primary: [''],
      mobile_secondary: [''],
      website: [''],
      country: [''],
      location: [''],
      area: [''],
      city: [''],
      postal_code: [''],
      status: [''],
      product: ['']
    });
  }

  submitCustomerCreateForm() {
    console.log(this.customerCreateForm.value);
  }

  getProductList() {
    this.productService.getAllProduct()
      .subscribe(
      (res) => {
        this.productList = res;
        console.log(this.productList);
      },
      (err) => {
        console.log("ERROR from productList");
      }
      )
  }



}
