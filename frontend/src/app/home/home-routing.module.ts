import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const homeRoutes = [

];
@NgModule({
    imports: [
        RouterModule.forChild(homeRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class HomeRoutingModule { }