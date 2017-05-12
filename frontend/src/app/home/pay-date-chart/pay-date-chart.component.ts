import {Component, OnInit} from '@angular/core';
import {InvoiceService} from '../../invoice/invoice.service';
import * as _ from 'underscore';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-pay-date-chart',
  templateUrl: './pay-date-chart.component.html',
  styleUrls: ['./pay-date-chart.component.css']
})
export class PayDateChartComponent implements OnInit {

  public datePipe = new DatePipe('en-US');

  public column_ChartData = [
    ['Date', 'PayCount'],
  ];


  public column_ChartOptions = {
    width: 1000,
    height: 500,
    chart: {
      title: 'Payments vs Date',
      subtitle: 'Payments done this month'
    },
  };


  constructor(private invoiceService: InvoiceService) {
  }

  ngOnInit() {
    let date = new Date();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let day = date.getDate();
    let limit = 0;
    if (month % 2 == 0) {
      limit = 30;
    } else {
      limit = 31;
    }
    for (let i = 1; i <= limit; i++) {
      let data = [];
      if (i < 10) {
        data[0] = '0' + i + '/' + month + '/' + year;
      } else {
        data[0] = i + '/' + month + '/' + year;
      }
      data[1] = 0;
      this.column_ChartData.push(data);
    }
    this.getPayDateCounter();
  }

  getPayDateCounter() {
    this.invoiceService.getPaidDateCounter()
      .subscribe(
        (res) => {
          _.each(res, (element) => {
            for (let i = 0; i < this.column_ChartData.length; i++) {
              if (this.column_ChartData[i][0].split('/')[0] == this.datePipe.transform(element['date'], 'dd/MM/yyyy').split('/')[0]) {
                this.column_ChartData[i][1] = element['invoice_id'].length;
                break;
              }
            }
          });
        },
        (err) => {
        }
      )
  }

}
