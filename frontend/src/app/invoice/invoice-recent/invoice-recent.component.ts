import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../invoice.service';


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
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
      )
  }

}
