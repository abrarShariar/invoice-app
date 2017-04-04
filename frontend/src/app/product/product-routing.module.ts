import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const productRoutes = [
];
@NgModule({
    imports: [
        RouterModule.forChild(productRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ProductRoutingModule { }