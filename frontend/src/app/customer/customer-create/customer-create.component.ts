import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CustomerService } from '../customer.service';
import * as _ from 'underscore';
import { Customer } from '../customer';
import { ProductService } from '../../product/product.service';
import { Product } from '../../product/product';
import { Area } from '../../area/area';
import { AreaService } from '../../area/area.service';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {
  showSuccess: boolean = false;
  showError: boolean = false;
  public customerCreateForm: FormGroup;
  public productList: any[] = [];
  public areaList: any[] = [];

  constructor(private fb: FormBuilder, private customerService: CustomerService, private productService: ProductService,private areaService: AreaService) { }

  ngOnInit() {
    this.buildForm();
    this.getProductList();
    this.getAreaList();
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
    this.showSuccess = false;
    this.showError = false;
    let data = {
      username: this.customerCreateForm.value.username,
      email: this.customerCreateForm.value.email,
      fullname: this.customerCreateForm.value.fullname,
      customer_currency: this.customerCreateForm.value.customer_currency,
      mobile_primary: this.customerCreateForm.value.mobile_primary,
      mobile_secondary: this.customerCreateForm.value.mobile_secondary,
      website: this.customerCreateForm.value.website,
      country: this.customerCreateForm.value.country,
      location: this.customerCreateForm.value.location,
      area: this.customerCreateForm.value.area,
      city: this.customerCreateForm.value.city,
      postal_code: this.customerCreateForm.value.postal_code,
      status: this.customerCreateForm.value.status,
      product: this.customerCreateForm.value.product
    };
    
    this.customerService.createNewCustomer(data)
      .subscribe(
      (res) => {
        if (res.status) {
          this.showSuccess = true;
          this.customerCreateForm.reset();
        } else {
          this.showError = true;
        }
      },
      (err) => {
        this.showError = true;
        console.log("Error in createNewCustomer");
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

   getAreaList() {
    this.areaList = [];
    this.areaService.getAllArea()
      .subscribe(
      (res) => {
        _.each(res, (item) => {
          if (item['status']) {
            this.areaList.push(item);
          }
        });
      },
      (err) => {
        console.log("ERROR from getAreaList");
      }
      )
  }
}
