import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../invoice.service';
import { Customer } from '../../customer/customer';
import * as _ from 'underscore';


@Component({
  selector: 'app-invoice-recent',
  templateUrl: './invoice-recent.component.html',
  styleUrls: ['./invoice-recent.component.css']
})
export class InvoiceRecentComponent implements OnInit {

  constructor(private invoiceService: InvoiceService) { }

  ngOnInit() {
    this.getRecentInvoice();
  }

  getRecentInvoice() {
    this.invoiceService.getRecentInvoice()
      .subscribe(
      (res:Customer[]) => {
          _.each(res,(item)=>{
            
          });
      },
      (err) => {
        console.log(err);
      }
      )
  }

}
