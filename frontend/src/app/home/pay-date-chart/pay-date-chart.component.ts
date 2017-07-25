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
    ['Date', 'Pay Amount', 'Pay Count']
  ];


  public column_ChartOptions = {
    width: 1200,
    height: 600,
    chart: {
      title: 'Payments vs Date',
      subtitle: 'Payments done this month'
    },
    series: {
      0: {axis: 'pay_amount'}, // Bind series 0 to an axis named 'distance'.
      1: {axis: 'pay_count'} // Bind series 1 to an axis named 'brightness'.
    },
    axes: {
      y: {
        pay_amount: {label: 'parsecs'}, // Left y-axis.
        pay_count: {side: 'right', label: 'apparent magnitude'} // Right y-axis.
      }
    }
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
      data[2] = 0;
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
                this.column_ChartData[i][1] = element['amount'];
                this.column_ChartData[i][2] = element['invoice_id'].length;
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
