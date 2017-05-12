import {Injectable} from '@angular/core';
import {CustomHttpService} from "../custom-http.service";
import {environment} from "../../environments/environment";
import 'rxjs/add/operator/map';

@Injectable()
export class HomeService {

  private homeUrl = environment.api_server + 'home/';

  constructor(private http: CustomHttpService) {
  }


  buildPayDateCounter() {
    let url = this.homeUrl + 'pay-date-counter/clean-build';
    return this.http.get(url).map(res => res.json());
  }
}
