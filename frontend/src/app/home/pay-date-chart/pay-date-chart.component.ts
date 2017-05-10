import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-pay-date-chart',
  templateUrl: './pay-date-chart.component.html',
  styleUrls: ['./pay-date-chart.component.css']
})
export class PayDateChartComponent implements OnInit {


  public column_ChartData = [
    ['Date', 'PayCount'],
    ['01/05/17', 10],
    ['02/05/17', 15],
    ['03/05/17', 1],
    ['04/05/17', 0],
    ['05/05/17', 90],
    ['06/05/17', 100],
    ['07/05/17', 101],
    ['08/05/17', 11],
    ['09/05/17', 191],
    ['10/05/17', 121],
    ['11/05/17', 111],
    ['12/05/17', 1],
    ['13/05/17', 0],
    ['14/05/17', 90],
    ['15/05/17', 100],
    ['16/05/17', 1010],
    ['17/05/17', 1011],
    ['18/05/17', 11],
    ['19/05/17', 11],
    ['20/05/17', 101],
    ['21/05/17', 11],
    ['22/05/17', 100],
    ['23/05/17', 1010],
    ['24/05/17', 1011],
    ['25/05/17', 11],
    ['26/05/17', 11],
    ['27/05/17', 101],
    ['28/05/17', 11],
    ['29/05/17', 11],
    ['30/05/17', 11],
  ];


  public column_ChartOptions = {
    width: 1000,
    height: 500,
    chart: {
      title: 'Payments vs Date',
      subtitle: 'Payments done this month'
    },
  };



  constructor() {
  }

  ngOnInit() {
  }

}
