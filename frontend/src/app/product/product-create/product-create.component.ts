import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import * as _ from 'underscore';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { ProductAllComponent } from '../product-all/product-all.component';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  public products: Product[] = [];
  public productCreateForm: FormGroup;
  showSuccess: boolean = false;
  showError: boolean = false;

  constructor(private fb: FormBuilder, private productService: ProductService) { }

  ngOnInit() {
    this.buildForm();
    this.getAllProduct();
  }

  buildForm() {
    this.productCreateForm = this.fb.group({
      name: ['', Validators.required],
      rate: ['', Validators.required],
      description: [''],
      status: [true]
    });
  }

  submitCreateProductForm() {
    let data = {
      name: this.productCreateForm.value.name,
      rate: this.productCreateForm.value.rate,
      description: this.productCreateForm.value.description,
      status: true
    }

    this.productService.createProduct(data)
      .subscribe(
      (res) => {
        if (res.status) {
          this.getAllProduct();
          this.showSuccess = true;
          this.productCreateForm.reset();
        } else {
          this.showError = true;
        }
      },
      (err) => {
        console.log("ERROR from createProduct");
        this.showError = true;
      }
      )
  }

  getAllProduct() {
    this.productService.getAllProduct()
      .subscribe(
      (res) => {
        this.products = res;
      },
      (err) => {
        console.log("Error in getAllProduct");
      }
      )
  }

  statusChanged(event:any) {
      this.getAllProduct();
  }

}
