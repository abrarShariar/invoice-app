import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const invoiceRoutes = [
];
@NgModule({
    imports: [
        RouterModule.forChild(invoiceRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class InvoiceRoutingModule { }