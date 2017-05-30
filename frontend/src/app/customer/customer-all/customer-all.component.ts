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
  totalCustomerCount: number = 0;
  public paginator = 1;

  // public tempCustomer:Customer;

  constructor(private customerService: CustomerService, private productService: ProductService, private areaService: AreaService) {
  }

  ngOnInit() {
    this.customerService.getTotalCustomerCount()
      .subscribe(
        (res) => {
          this.totalCustomerCount = res.count;
        }
      )
    this.getAllCustomer(this.paginator);
  }

  getAllCustomer(paginator: number) {
    this.customers = [];
    this.customerService.getAllCustomers(paginator)
      .subscribe(
        (res) => {
          let data: Customer[] = [];
          data = res;
          // getting products
          _.each(data, (item: Customer) => {
            item.productData = [];
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
      this.getAllCustomer(this.paginator);
      return;
    }
    let data = {
      text: event
    }
    let reg = new RegExp(event, "i");
    let resArray = [];
    if (this.searchMode == 'username') {
      _.each(this.customers, (item) => {
        if (reg.test(item['username'])) {
          resArray.push(item);
        }
      });
      this.customers = resArray;
      // this.customerService.searchByUsername(data)
      //   .subscribe(
      //     (res) => {
      //       this.buildSearchResult(res);
      //     },
      //     (err) => {
      //       console.log(err);
      //     }
      //   )
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

  checkGenerateInvoice(customer) {
    let data = {
      id: customer['_id'],
      isGenerateInvoiceMonthly: !customer['isGenerateInvoiceMonthly']
    };

    this.customerService.setCheckGenerateInvoice(data)
      .subscribe(
        (res) => {
          if (res['status']) {
            customer['isGenerateInvoiceMonthly'] = !customer['isGenerateInvoiceMonthly'];
          }
        },
        (err) => {
          console.log("Error in setCheckGenerateInvoice");
        }
      );
  }


//  for pagination
  onPaginate(event: any) {
    this.paginator = event;
    this.getAllCustomer(this.paginator);
  }
}
