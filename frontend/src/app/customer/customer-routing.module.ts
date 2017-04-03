import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';

const customerUploadRoutes = [
];
@NgModule({
    imports: [
        RouterModule.forChild(customerUploadRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class CustomerRoutingModule { }