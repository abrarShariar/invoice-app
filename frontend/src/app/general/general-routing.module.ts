import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
// components
import { HomeBodyComponent } from '../home/home-body/home-body.component';
import { ExcelFileUploaderComponent } from '../file-upload/excel-file-uploader/excel-file-uploader.component';
import { CustomerAllComponent } from '../customer/customer-all/customer-all.component';

const generalRoutes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeBodyComponent
    },
    {
        path: 'upload-file',
        component: ExcelFileUploaderComponent
    },
    {
        path: 'customer/all',
        component: CustomerAllComponent
    }

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