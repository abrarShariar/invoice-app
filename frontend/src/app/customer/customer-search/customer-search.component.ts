import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../customer.service';
import {Customer} from '../customer';
import * as _ from 'underscore';
import {ProductService} from '../../product/product.service';
import {Product} from '../../product/product';
import {AreaService} from '../../area/area.service';
import {Area} from '../../area/area';

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.css']
})
export class CustomerSearchComponent implements OnInit {
  public searchText: string;
  public searchResults: any[] = [];
  public customer: Customer;

  constructor(private customerService: CustomerService, private productService: ProductService, private areaService: AreaService) {
  }

  ngOnInit() {
  }

  getSearchText(event: any) {
    this.customer = undefined;
    this.searchResults = [];
    this.searchText = event.target.value;
    this.customerService.globalSearch(this.searchText)
      .subscribe(
        (res) => {
          this.searchResults = res;
        }
      )
  }

  getSearchDetails(data) {
    this.searchText = '';
    let id = data['_id'];
    this.customerService.getCustomerDetails(id)
      .subscribe(
        (customer: Customer) => {
          customer.productData = [];
          _.each(customer.productList, (element) => {
            this.productService.getProductById(element)
              .subscribe(
                (res: Product) => {
                  customer.productData.push(res);
                }
              )
          });
          if (customer.area) {
            this.areaService.getAreaById(customer.area)
              .subscribe(
                (res: Area) => {
                  customer.areaData = res;
                  this.customer = customer;
                }
              )
          }
        },
        (err) => {

        },
        () => {
          console.log(this.customer);
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

}
