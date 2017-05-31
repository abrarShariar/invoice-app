import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from "@angular/forms";
import {ProductService} from '../../product/product.service';
import {AreaService} from '../../area/area.service';
import {CustomerService} from '../../customer/customer.service';
import {InvoiceService} from '../invoice.service';
import {Customer} from '../../customer/customer';
import * as _ from 'underscore';
import {Product} from '../../product/product';
import {Area} from "../../area/area";
import {Subscription} from "rxjs";
import {Invoice} from '../invoice';

@Component({
  selector: 'app-invoice-create',
  templateUrl: './invoice-create.component.html',
  styleUrls: ['./invoice-create.component.css']
})
export class InvoiceCreateComponent implements OnInit {

  public productList: any[] = [];
  showSuccess: boolean = false;
  showError: boolean = false;
  public invoiceCreateForm: FormGroup;
  public customerList: Customer[] = [];
  public resCustomer: Customer;
  private subscription: Subscription;
  public invoice: Invoice;
  public allProductCounter = 1;
  public allProducts: any[] = [];


  constructor(private fb: FormBuilder, private customerService: CustomerService, private productService: ProductService, private areaService: AreaService) {
  }

  ngOnInit() {
    this.buildForm();
    this.getProductList();
    this.getAllCustomers();
  }

  buildForm() {
    this.invoiceCreateForm = this.fb.group({
      username: [''],
      email: [''],
      fullname: [''],
      location: [''],
      area: [''],
      city: [''],
      mobile_primary: [''],
      mobile_secondary: [''],
      amount_due: [''],
      total: [''],
      discount: [''],
      invoice_created_date: [''],
      status: ['Due'],
    });
  }

  getAllCustomers() {
    this.customerService.getAllCustomers('all')
      .subscribe(
        (res) => {
          this.customerList = res;
        },
        (err) => {

        }
      );
  }

  getCustomer(event: any) {
    this.resCustomer = _.find(this.customerList, function (item) {
      return item['_id'] == event.target.value;
    });

    this.invoiceCreateForm.patchValue({
      username: this.resCustomer.username,
      email: this.resCustomer.email,
      fullname: this.resCustomer.fullname,
      location: this.resCustomer.location,
      city: this.resCustomer.city,
      mobile_primary: this.resCustomer.mobile_primary,
      mobile_secondary: this.resCustomer.mobile_secondary,
    });

    this.resCustomer.productData = [];
    if (this.resCustomer.area) {
      this.areaService.getAreaById(this.resCustomer.area)
        .subscribe(
          (res: Area) => {
            this.resCustomer.areaData = res;
            this.invoiceCreateForm.patchValue({
              area: this.resCustomer.areaData.name
            });
          },
          (err) => {

          }
        )
    }
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
        },
        () => {
          this.allProducts.push(this.productList[0]);
        }
      )
  }


  removeProduct(index) {
    this.allProductCounter--;
    this.allProducts.splice(index, 1);
  }

  addProduct() {
    this.allProductCounter++;
    let newProduct = this.productList[0];
    this.allProducts.push(newProduct);
    console.log(this.allProducts);
  }

  onProductChange(event: any, index) {
    let result = _.find(this.productList, function (item) {
      return item['_id'] == event.target.value;
    })
    this.allProducts[index] = result;
  }

  createRange(number) {
    let items: number[] = [];
    for (let i = 1; i <= number; i++) {
      items.push(i);
    }
    return items;
  }

  submitInvoiceCreateForm() {

  }
}
