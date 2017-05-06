import {Injectable} from '@angular/core';
import {CustomHttpService} from "../custom-http.service";
import {environment} from "../../environments/environment";
import 'rxjs/add/operator/map';

@Injectable()
export class InvoiceService {

  private invoiceUrl = environment.api_server + 'invoice/';

  constructor(private http: CustomHttpService) {
  }

  getAllInvoice() {
    let url = this.invoiceUrl + 'all';
    return this.http.get(url).map((res) => res.json());
  }

  getRecentInvoice() {
    let url = this.invoiceUrl + 'recent';
    return this.http.get(url).map((res) => res.json());
  }

  storeInvoice(data: any) {
    let url = this.invoiceUrl + 'create';
    return this.http.post(url, data).map((res) => res.json());
  }

  downloadPDF(data: any) {
    let url = this.invoiceUrl + 'generate/pdf';
    return this.http.post(url, data).map((res) => res.json());
  }

  getInvoiceById(id: string) {
    let url = this.invoiceUrl + 'id/' + id;
    return this.http.get(url).map((res) => res.json());
  }

  searchByUsername(data: any) {
    let url = this.invoiceUrl + 'search/username/';
    return this.http.post(url, data).map((res) => res.json());
  }

  saveRecentInvoice(data: any) {
    let url = this.invoiceUrl + 'recent/save';
    return this.http.post(url, data).map((res) => res.json());
  }

  dropRecentInvoice() {
    let url = this.invoiceUrl + 'drop/recent/all';
    return this.http.get(url).map(res => res.json());
  }

  checkIfRecentInvoiceExists() {
    let url = this.invoiceUrl + 'recent_invoice/exists';
    return this.http.get(url).map(res => res.json());
  }

  getRecentInvoiceDB() {
    let url = this.invoiceUrl + 'recent_invoice_db';
    return this.http.get(url).map(res => res.json());
  }

  cleanInvoice() {
    let url = this.invoiceUrl + 'clean_invoice';
    return this.http.get(url).map(res => res.json());
  }

  changeInvoiceStatus(data:any) {
    let url = this.invoiceUrl + 'change_status';
    return this.http.put(url,data).map((res)=>res.json());
  }

  //get total of all products in product list
  getTotal(data:any){
    let url = this.invoiceUrl + 'product_list/total';
    return this.http.post(url,data).map((res)=>res.json());
  }

  buildAndSaveRecentInvoice(){
    let url = this.invoiceUrl + 'recent/build_and_save';
    return this.http.get(url).map((res)=>res.json());
  }

  savePartialPay(data:any){
    let url = this.invoiceUrl + 'recent/partial_pay/save';
    return this.http.post(url,data).map((res)=>res.json());
  }

}
