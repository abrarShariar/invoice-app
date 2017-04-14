import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../invoice.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from "rxjs";
import { Invoice } from '../invoice';
import { Router } from "@angular/router";
import { SelectItem } from 'primeng/primeng';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.css']
})
export class InvoiceEditComponent implements OnInit {

  cities: SelectItem[];

  selectedCity: string;


  private subscription: Subscription;
  public invoiceDetailForm: FormGroup;
  private id: any;
  public invoice: Invoice;
  public currentDate: number = Date.now();

  constructor(private fb: FormBuilder, private invoiceService: InvoiceService, private route: ActivatedRoute, private router: Router) {
    this.cities = [];
    this.cities.push({ label: 'New York', value: 'New York' });
    this.cities.push({ label: 'Rome', value: 'Rome' });
    this.cities.push({ label: 'London', value: 'London' });
    this.cities.push({ label: 'Istanbul', value: 'Istanbul' });
    this.cities.push({ label: 'Paris', value: 'Paris' });
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      let data = this.route.queryParams["_value"].invoice;
      this.invoice = JSON.parse(data);
      this.buildForm();
    });
  }

  buildForm() {
    this.invoiceDetailForm = this.fb.group({
      username: [this.invoice.customerData.username],
      email: [this.invoice.customerData.email],
      fullname: [this.invoice.customerData.fullname],
      location: [this.invoice.customerData.location],
      area: [this.invoice.customerData.areaData.name],
      city: [this.invoice.customerData.city],
      mobile_primary: [this.invoice.customerData.mobile_primary],
      mobile_secondary: [this.invoice.customerData.mobile_secondary],
      payment_due_date: [this.invoice.payment_due_date],
      amount_due: [this.invoice.amount_due],
      status: [this.invoice.status],
      total: [this.invoice.total],
      discount: [this.invoice.discount],
      invoice_created_date: [this.invoice.invoice_created_date]
    })

  }



}
