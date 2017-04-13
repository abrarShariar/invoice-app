import { CustomHttpService } from '../../custom-http.service';
import { uploadFile } from 'webdriver-js-extender/built/lib/command_definitions';
import { Component, OnInit, Directive } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgClass, NgStyle } from '@angular/common';
import * as _ from 'underscore';
import { FileUploadService } from '../file-upload.service';
import { Customer } from '../../customer/customer';
import { CustomerService } from '../../customer/customer.service';


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

  constructor(private customerService:CustomerService,private fb: FormBuilder, private fileUploadService: FileUploadService) { }

  ngOnInit() {
    this.createForm();
  }


  createForm() {
    this.fileUploadForm = this.fb.group({
      file: ''
    });
  }

  onSubmitForm() { }

  getFile(event: any) {
    this.readThis(event.target);
  }

  readThis(inputValue: any) {
    let allStatus = [];
    let file: File = inputValue.files[0];
    let reader = new FileReader();
    reader.onload = (e) => {
      let csv = reader.result;
      let allTextLines = csv.split(/\r\n|\n/);
      let customer: Customer;

      _.each(allTextLines, (line: string) => {
        let data = line.split(',');
        customer = {
          username: data[0],
          email: data[1],
          fullname: data[2] + " " + data[3],
          customer_currency: data[4],
          mobile_primary: data[5],
          mobile_secondary: data[6],
          website: data[7],
          country: data[8],
          location: data[9],
          area: "",
          city: data[11],
          postal_code: data[12],
          status: true,
          productList: []
        }
        this.customerService.createNewCustomer(customer)
          .subscribe(
          (res) => {
            this.isFileRead = true
          },
          (err) => {
            this.isFileRead = false;
          }
          )
      });
    }

    reader.readAsText(file);
  }

  errorHandler(event) {
    this.isFileRead = false;
    console.log("Error in uploading file");
  }

}
