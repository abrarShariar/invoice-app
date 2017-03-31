import { Injectable } from '@angular/core';
import { CustomHttpService } from "../custom-http.service";
import { Customer } from './customer';
import { environment } from "../../environments/environment";
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class FileUploadService {
  private customerUrl = environment.api_server + 'customer/';

  constructor(private http: CustomHttpService) { }

  createNewCustomer(data:any){
    let url = this.customerUrl + 'create/';
    return this.http.post(url,data).map((res) => res);
  }

}
