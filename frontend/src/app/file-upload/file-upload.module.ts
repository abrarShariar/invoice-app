import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { FileUploadRoutingModule } from "./file-upload-routing.module";
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
// components
import { ExcelFileUploaderComponent } from './excel-file-uploader/excel-file-uploader.component';
//service
import { FileUploadService } from './file-upload.service';

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
        FileUploadService
    ]
})
export class FileUploadModule { }

