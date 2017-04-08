import { Injectable } from '@angular/core';
import { CustomHttpService } from "../custom-http.service";
import { environment } from "../../environments/environment";
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class InvoiceService {

  private invoiceUrl = environment.api_server + 'invoice/';

  constructor(private http: CustomHttpService) { }

  getAllInvoice(){
    let url = this.invoiceUrl + 'all';
    return this.http.get(url).map((res) => res.json());
  }

  getRecentInvoice(){
    let url = this.invoiceUrl + 'recent';
    return this.http.get(url).map((res) => res.json());
  }



}
