import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {FileUploadRoutingModule} from "./file-upload-routing.module";
// components
import {ExcelFileUploaderComponent} from './excel-file-uploader/excel-file-uploader.component';
//service
import {FileUploadService} from './file-upload.service';
import {CustomerService} from '../customer/customer.service';
import {FileSelectDirective} from 'ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadRoutingModule
  ],
  declarations: [
    ExcelFileUploaderComponent,
    FileSelectDirective
  ],
  exports: [
    ExcelFileUploaderComponent
  ],
  providers: [
    FileUploadService,
    CustomerService
  ]
})
export class FileUploadModule {
}

