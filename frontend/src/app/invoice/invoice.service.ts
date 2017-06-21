import {Injectable} from '@angular/core';
import {CustomHttpService} from "../custom-http.service";
import {environment} from "../../environments/environment";
import 'rxjs/add/operator/map';

@Injectable()
export class InvoiceService {

  private invoiceUrl = environment.api_server + 'invoice/';

  constructor(private http: CustomHttpService) {
  }

  removeInvoice(invoice) {
    let url = this.invoiceUrl + 'remove-invoice';
    return this.http.post(url, invoice).map((res) => res.json());
  }

  getInvoiceByCustomerId(id) {
    let url = this.invoiceUrl + 'by-customer-id/' + id;
    return this.http.get(url).map((res) => res.json());
  }

  globalInvoiceSearchByCustomer(query) {
    let url = this.invoiceUrl + 'global-search-by-customer/' + query;
    return this.http.get(url).map((res) => res.json());
  }

  saveAutoInvoice(data) {
    let url = this.invoiceUrl + 'save-auto-invoice';
    return this.http.post(url, data).map((res) => res.json());
  }

  getAllInvoice(paginator) {
    let url = this.invoiceUrl + 'all/page=' + paginator;
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

  getInvoiceById(type: string, id: string) {
    let url = this.invoiceUrl + type + '/id/' + id;
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

  getRecentInvoiceDB(paginator: number) {
    let url = this.invoiceUrl + 'recent_invoice_db/paginator=' + paginator;
    return this.http.get(url).map(res => res.json());
  }

  cleanInvoice() {
    let url = this.invoiceUrl + 'clean_invoice';
    return this.http.get(url).map(res => res.json());
  }

  changeInvoiceStatus(data: any) {
    let url = this.invoiceUrl + 'change_status';
    return this.http.put(url, data).map((res) => res.json());
  }

  //get total of all products in product list
  getTotal(data: any) {
    let url = this.invoiceUrl + 'product_list/total';
    return this.http.post(url, data).map((res) => res.json());
  }

  buildAndSaveRecentInvoice() {
    let url = this.invoiceUrl + 'recent/build_and_save';
    return this.http.get(url).map((res) => res.json());
  }

  savePartialPay(data: any) {
    let url = this.invoiceUrl + 'recent/partial_pay/save';
    return this.http.post(url, data).map((res) => res.json());
  }

  preGenerateInvoiceUpdate(data: any) {
    let url = this.invoiceUrl + 'pre_generate_update';
    return this.http.post(url, data).map((res) => res.json());
  }

  deleteInvoice(invoice) {
    let url = this.invoiceUrl + 'delete';
    return this.http.post(url, invoice).map((res) => res.json());
  }

  setPaidDateCounter(invoice) {
    let url = this.invoiceUrl + 'set_paid_date_counter';
    return this.http.post(url, invoice).map((res) => res.json());
  }

  getPaidDateCounter() {
    let url = this.invoiceUrl + 'get_paid_date_counter';
    return this.http.get(url).map((res) => res.json());
  }

  getAllInvoiceCount() {
    let url = this.invoiceUrl + 'all_invoice_count';
    return this.http.get(url).map((res) => res.json());
  }

  createNewInvoice(data: any) {
    let url = this.invoiceUrl + 'create/new';
    return this.http.post(url, data).map((res) => res.json());
  }
}
