import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CustomerService} from '../../customer/customer.service';
import {Headers} from '@angular/http';
import {RequestOptions, Http} from '@angular/http';
import {environment} from '../../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
import {FileUploader} from 'ng2-file-upload/ng2-file-upload';

@Component({
  selector: 'app-excel-file-uploader',
  templateUrl: './excel-file-uploader.component.html',
  styleUrls: ['./excel-file-uploader.component.css']
})
export class ExcelFileUploaderComponent implements OnInit {

  public fileUploadForm: FormGroup;
  public isUploadSuccess: boolean = false;
  public isFileRead: boolean;
  public file: File;


  private uploadUrl = environment.api_server + 'customer/upload-file-contents';


  public uploader: FileUploader = new FileUploader({url: this.uploadUrl, itemAlias: 'csvFile'});


  constructor(private http: Http, private customerService: CustomerService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.createForm();
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };


    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      if (status == 200) {
        this.isUploadSuccess = true;
      }
    }
  }


  createForm() {
    this.fileUploadForm = this.fb.group({
      file: ''
    });
  }

  onSubmitForm() {
  }

  getFile(event: any) {
    let fileList: FileList = event.target.files;
    this.file = fileList[0];
  }

  errorHandler(event) {
    this.isFileRead = false;
    console.log("Error in uploading file");
  }


}
