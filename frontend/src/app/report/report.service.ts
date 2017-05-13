import {Injectable} from '@angular/core';
import {CustomHttpService} from "../custom-http.service";
import {environment} from "../../environments/environment";
import 'rxjs/add/operator/map';

@Injectable()
export class ReportService {
  private reportUrl = environment.api_server + 'report/';

  constructor(private http: CustomHttpService) {
  }

  buildAndShowAreaReport(id) {
    let url = this.reportUrl + 'build_show_area_report/' + id;
    return this.http.get(url).map((res) => res.json());
  }

}
