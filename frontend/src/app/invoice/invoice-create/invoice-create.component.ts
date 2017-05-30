import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from "@angular/forms";
import {ProductService} from '../../product/product.service';
import {AreaService} from '../../area/area.service';
import {CustomerService} from '../../customer/customer.service';
import {InvoiceService} from '../invoice.service';
import {Customer} from '../../customer/customer';
import * as _ from 'underscore';


@Component({
  selector: 'app-invoice-create',
  templateUrl: './invoice-create.component.html',
  styleUrls: ['./invoice-create.component.css']
})
export class InvoiceCreateComponent implements OnInit {

  showSuccess: boolean = false;
  showError: boolean = false;
  public invoiceCreateForm: FormGroup;
  public customerList: Customer[] = [];

  constructor(private fb: FormBuilder, private customerService: CustomerService, private productService: ProductService, private areaService: AreaService) {
  }

  ngOnInit() {
    this.buildForm();
    this.getAllCustomers();
  }

  buildForm() {
    this.invoiceCreateForm = this.fb.group({
      customer: [''],
      product: [''],
      status: ['']
    });
  }

  getAllCustomers() {
    this.customerService.getAllCustomers(1)
      .subscribe(
        (res) => {
          this.customerList = res;
        },
        (err) => {

        }
      );
  }
}
