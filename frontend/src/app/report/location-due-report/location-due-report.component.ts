import {Component, OnInit} from '@angular/core';
import {AreaService} from '../../area/area.service';
import {Area} from '../../area/area';
import {ReportService} from '../report.service';

@Component({
  selector: 'app-location-due-report',
  templateUrl: './location-due-report.component.html',
  styleUrls: ['./location-due-report.component.css']
})
export class LocationDueReportComponent implements OnInit {
  public areaList: Area[] = [];

  constructor(private areaService: AreaService, private reportService: ReportService) {
  }

  ngOnInit() {
    this.getAllAreaList();
  }

  filterChange(id) {
    this.reportService.buildAndShowAreaReport(id)
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {

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
