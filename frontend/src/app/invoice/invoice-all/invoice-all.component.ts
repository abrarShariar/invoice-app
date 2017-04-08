import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../invoice.service';


@Component({
  selector: 'app-invoice-all',
  templateUrl: './invoice-all.component.html',
  styleUrls: ['./invoice-all.component.css']
})
export class InvoiceAllComponent implements OnInit {

  constructor(private invoiceService: InvoiceService) { }

  ngOnInit() {
    this.getAllInvoice();
  }

  getAllInvoice() {
    this.invoiceService.getAllInvoice()
      .subscribe(
          (res)=>{
            console.log(res);
          },
          (err)=>{
            console.log("ERROR in getAllInvoice");
          }
      )
  }

}
