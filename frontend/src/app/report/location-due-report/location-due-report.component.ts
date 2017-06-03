import {Component, OnInit} from '@angular/core';
import {AreaService} from '../../area/area.service';
import {Area} from '../../area/area';
import {ReportService} from '../report.service';
import {Report} from '../report';
import * as _ from 'underscore';
@Component({
  selector: 'app-location-due-report',
  templateUrl: './location-due-report.component.html',
  styleUrls: ['./location-due-report.component.css']
})
export class LocationDueReportComponent implements OnInit {
  public areaList: Area[] = [];
  public report: Report;
  public reportList: Report[] = [];

  constructor(private areaService: AreaService, private reportService: ReportService) {
  }

  ngOnInit() {
    this.getAllAreaList();
  }

  filterChange(id) {
    this.reportList = [];
    this.reportService.getCustomerByArea(id)
      .subscribe(
        (res) => {
          _.each(res, (customer) => {
            let report = new Report();
            report.username = customer['username'];
            report.mobile_no = customer['mobile_primary'];
            report.location = customer['location'];
            this.reportService.getReport(customer['_id'])
              .subscribe(
                (res) => {
                  report.current_due = res['current_due'];
                  report.previous_due = res['previous_due'];
                  report.total_due = res['total_due'];
                  if (res['total_due'] != 0) {
                    this.reportList.push(report);
                  }
                },
                (err) => {
                  console.log("Error in getReport");
                }
              )
          })
        },
        (err) => {
        },
        () => {
          // console.log(this.reportList);
        }
      )
  }

  getAllAreaList() {
    this.areaService.getAllArea()
      .subscribe(
        (res) => {
          this.areaList = res;
        }
      )
  }


}
