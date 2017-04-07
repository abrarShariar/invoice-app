import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AreaCreateComponent } from './area-create/area-create.component';


const areaRoutes = [
];
@NgModule({
    imports: [
        RouterModule.forChild(areaRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AreaRoutingModule { }