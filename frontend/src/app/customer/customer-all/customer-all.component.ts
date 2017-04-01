import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer';

@Component({
  selector: 'app-customer-all',
  templateUrl: './customer-all.component.html',
  styleUrls: ['./customer-all.component.css']
})
export class CustomerAllComponent implements OnInit {
  public customers:Customer[] = [];
  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.getAllCustomer();
  }

  getAllCustomer() {
    this.customerService.getAllCustomers()
      .subscribe(
      (res) => {
        this.customers = res;
      },
      (err) => {
        console.log(err);
      }
      )
  }

  makeInactive(text:any){
    console.log(text);
  }

}
