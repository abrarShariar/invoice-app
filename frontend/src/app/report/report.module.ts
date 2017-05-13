import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LocationDueReportComponent} from './location-due-report/location-due-report.component';
import {ReportService} from './report.service';
import {AreaService} from '../area/area.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LocationDueReportComponent
  ],
  exports: [],
  providers: [
    ReportService,
    AreaService
  ]
})
export class ReportModule {
}

