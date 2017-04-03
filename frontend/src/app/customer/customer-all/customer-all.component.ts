import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer';


@Component({
  selector: 'app-customer-all',
  templateUrl: './customer-all.component.html',
  styleUrls: ['./customer-all.component.css']
})
export class CustomerAllComponent implements OnInit {
  public customers: Customer[] = [];
  public filterByTitle: string;
  display: boolean = false;

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
