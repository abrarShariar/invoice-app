import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerAllComponent } from './customer-all/customer-all.component';

@NgModule({
    imports: [
        CommonModule,
        CustomerRoutingModule
    ],
    declarations: [
    CustomerAllComponent
    ],
    exports: [

    ],
    providers: [

    ]
})
export class CustomerModule { }

