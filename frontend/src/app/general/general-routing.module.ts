import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";


const generalRoutes = [
    // {
    //     path: 'dashboard/customer/list',
    //     component 
    // }
];
@NgModule({
    imports: [
        RouterModule.forChild(generalRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class GeneralRoutingModule { }