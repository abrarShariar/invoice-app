import { Injectable } from '@angular/core';
import { CustomHttpService } from "../custom-http.service";
import { environment } from "../../environments/environment";
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';


@Injectable()
export class ProductService {

  private productUrl = environment.api_server + 'product/';

  constructor(private http: CustomHttpService) { }

  createProduct(data: any) {
    let url = this.productUrl + 'create/';
    return this.http.post(url, data).map((res) => res.json());
  }

  getAllProduct() {
    let url = this.productUrl + 'all';
    return this.http.get(url).map((res) => res.json());
  }

  setStatus(data:any){
     let url = this.productUrl + 'status_change/';
     return this.http.put(url,data).map((res)=>res.json());
  }

}
