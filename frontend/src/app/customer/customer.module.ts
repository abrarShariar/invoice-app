import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerAllComponent } from './customer-all/customer-all.component';
import { CustomerService } from './customer.service';

import {Ng2PaginationModule} from 'ng2-pagination';


@NgModule({
    imports: [
        CommonModule,
        CustomerRoutingModule,
        Ng2PaginationModule
    ],
    declarations: [
        CustomerAllComponent
    ],
    exports: [

    ],
    providers: [
        CustomerService
    ]
})
export class CustomerModule { }

