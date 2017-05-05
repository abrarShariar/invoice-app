import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

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
