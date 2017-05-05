import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

const fileUploadRoutes = [

];
@NgModule({
    imports: [
        RouterModule.forChild(fileUploadRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class FileUploadRoutingModule { }
