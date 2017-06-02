import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CustomerRoutingModule} from './customer-routing.module';
import {CustomerAllComponent} from './customer-all/customer-all.component';
import {CustomerService} from './customer.service';

import {Ng2PaginationModule} from 'ng2-pagination';
import {DialogModule} from 'primeng/primeng';
import {CustomerDetailComponent} from './customer-detail/customer-detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomerCreateComponent} from './customer-create/customer-create.component';
import {ProductService} from '../product/product.service';
import {InvoiceModule} from '../invoice/invoice.module';
import { CustomerSearchComponent } from './customer-search/customer-search.component';


@NgModule({
  imports: [
    CommonModule,
    CustomerRoutingModule,
    Ng2PaginationModule,
    DialogModule,
    FormsModule,
    InvoiceModule,
    ReactiveFormsModule
  ],
  declarations: [
    CustomerAllComponent,
    CustomerDetailComponent,
    CustomerCreateComponent,
    CustomerSearchComponent
  ],
  exports: [],
  providers: [
    CustomerService,
    ProductService
  ]
})
export class CustomerModule {
}

