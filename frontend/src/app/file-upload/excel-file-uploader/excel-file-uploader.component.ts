import {Component, OnInit, Directive} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as _ from 'underscore';
import {FileUploadService} from '../file-upload.service';
import {Customer} from '../../customer/customer';
import {CustomerService} from '../../customer/customer.service';
import {environment} from '../../../environments/environment';
import {Http, Response, Headers, RequestOptions} from '@angular/http';


@Component({
  selector: 'app-excel-file-uploader',
  templateUrl: './excel-file-uploader.component.html',
  styleUrls: ['./excel-file-uploader.component.css']
})
export class ExcelFileUploaderComponent implements OnInit {

  public fileUploadForm: FormGroup;
  public isUploadSuccess: boolean = false;
  public fileInput: any;
  private fileName: string;
  private fileSize: number;
  public isFileRead: boolean;
  private allCustomerData: Customer[] = [];
  public env = environment;
  public file: File;

  constructor(private http: Http, private customerService: CustomerService, private fb: FormBuilder, private fileUploadService: FileUploadService) {
  }

  ngOnInit() {
    this.createForm();
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

  uploadFile() {
    let reader = new FileReader();
    reader.onload = (e) => {
      let csv = reader.result;
      let allTextLines = csv.split(/\r\n|\n/);

      allTextLines.map((element, index, array) => {
        if (index > 0) {
          let data = {
            content: element
          };
          this.customerService.uploadFileContents(data)
            .subscribe(
              (res) => {
                if (res.status) {
                  this.isUploadSuccess = true;
                } else {
                  this.isUploadSuccess = false;
                }
              },
              (err) => {
                console.log('Error in uploadFile');
              }
            );
        }
      });
    }
    reader.readAsText(this.file);
  }

  errorHandler(event) {
    this.isFileRead = false;
    console.log("Error in uploading file");
  }


}
