import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer';
import * as _ from 'underscore';
import { ProductService } from '../../product/product.service';
import { Product } from '../../product/product';
import { AreaService } from '../../area/area.service';
import { Area } from '../../area/area';


@Component({
  selector: 'app-customer-all',
  templateUrl: './customer-all.component.html',
  styleUrls: ['./customer-all.component.css']
})
export class CustomerAllComponent implements OnInit {
  public customers: Customer[] = [];
  public filterByTitle: string;
  display: boolean = false;
  public productList: Product[] = [];

  constructor(private customerService: CustomerService, private productService: ProductService, private areaService: AreaService) { }

  ngOnInit() {
    this.getAllCustomer();
  }

  getAllCustomer() {
    this.customers = [];
    this.customerService.getAllCustomers()
      .subscribe(
      (res) => {
        let data: Customer[] = [];
        data = res;
        // getting products
        _.each(data, (item) => {
          let customer: Customer;
          customer = item;
          if (item.product) {
            this.productService.getProductById(item.product)
              .subscribe(
              (res: Product) => {
                customer.productData = res;
              },
              (err) => {
              }
              )
          }

          if (item.area) {
            this.areaService.getAreaById(item.area)
              .subscribe(
              (res: Area) => {
                customer.areaData = res;
              },
              (err) => {

              }
              )
          }

          this.customers.push(customer);
        });



      },
      (err) => {
        console.log("Error In getAllCustomer");
      }
      )
  }

  setFilter(event: any) {
    this.filterByTitle = event.target.text;
  }

  toggleStatus(id, status) {
    let data = {
      id: id,
      status: !status
    };

    this.customerService.setStatus(data)
      .subscribe(
      (res) => {
        this.getAllCustomer();
      },
      (err) => {
        console.log('Error in toggleStatus');
      }
      )
  }

  showDialog() {
    this.display = true;
  }


  getCustomerDetails(id) {
    this.customerService.getCustomerDetails(id)
      .subscribe(
      (res) => {

      },
      (err) => {
        console.log(err);
      }
      )
  }


}
