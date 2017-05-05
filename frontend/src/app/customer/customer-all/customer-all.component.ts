import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../customer.service';
import {Customer} from '../customer';
import * as _ from 'underscore';
import {ProductService} from '../../product/product.service';
import {Product} from '../../product/product';
import {AreaService} from '../../area/area.service';
import {Area} from '../../area/area';


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
  public searchMode = 'username';

  // public tempCustomer:Customer;

  constructor(private customerService: CustomerService, private productService: ProductService, private areaService: AreaService) {
  }

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
          _.each(data, (item: Customer) => {
            item.productData = [];

            if (item.productList.length > 0) {
              _.each(item.productList, (element) => {
                this.productService.getProductById(element)
                  .subscribe(
                    (res: Product) => {
                      item.productData.push(res);
                    },
                    (err) => {
                    }
                  )
              });
            }


            if (item.area) {
              this.areaService.getAreaById(item.area)
                .subscribe(
                  (res: Area) => {
                    item.areaData = res;
                  },
                  (err) => {

                  }
                )
            }

            this.customers.push(item);
          });
        },
        (err) => {
          console.log("Error In getAllCustomer");
        }
      )
  }

  toggleStatus(customer) {
    let data = {
      id: customer['_id'],
      status: !customer['status']
    };

    this.customerService.setStatus(data)
      .subscribe(
        (res) => {
          if (res['status']) {
            customer['status'] = !customer['status']
          }
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

  quickSearch(event: any) {
    if (event == '') {
      this.getAllCustomer();
      return;
    }
    let data = {
      text: event
    }
    if (this.searchMode == 'username') {
      this.customerService.searchByUsername(data)
        .subscribe(
          (res) => {
            this.buildSearchResult(res);
          },
          (err) => {
            console.log(err);
          }
        )
    }
    else if (this.searchMode == 'mobile_number') {
      this.customerService.searchByMobileNumber(data)
        .subscribe(
          (res) => {
            this.buildSearchResult(res);
          },
          (err) => {
            console.log(err);
          }
        )
    }
    else if (this.searchMode == 'area') {
      this.customerService.searchByArea(data)
        .subscribe(
          (res) => {
            _.each(res, (item) => {
              let newData = {
                text: item["_id"]
              }
              this.customerService.getCustomerByArea(newData)
                .subscribe(
                  (res) => {
                    this.buildSearchResult(res);
                  },
                  (err) => {
                    console.log(err);
                  }
                )
            });
          },
          (err) => {
            console.log(err);
          }
        )
    }
  }


  buildSearchResult(customerList: Customer[]) {
    this.customers = [];
    // getting products
    _.each(customerList, (item: Customer) => {
      item.productData = [];

      if (item.productList.length > 0) {
        _.each(item.productList, (element) => {
          this.productService.getProductById(element)
            .subscribe(
              (res: Product) => {
                item.productData.push(res);
              },
              (err) => {
              }
            )
        });


      }

      if (item.area) {
        this.areaService.getAreaById(item.area)
          .subscribe(
            (res: Area) => {
              item.areaData = res;
            },
            (err) => {

            }
          )
      }
      this.customers.push(item);
    });
  }


  //change search filter
  filterChange(event: any) {
    this.searchMode = event;
  }


}
