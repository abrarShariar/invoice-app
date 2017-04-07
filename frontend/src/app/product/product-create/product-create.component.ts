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
  editMode: boolean = false;
  private id: any;

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
      status: [true],
      vat: ['']
    });
  }

  submitCreateProductForm() {
    this.showError = false;
    this.showSuccess = false;
    let data = {
      id: this.id,
      name: this.productCreateForm.value.name,
      rate: this.productCreateForm.value.rate,
      description: this.productCreateForm.value.description,
      status: true,
      vat: this.productCreateForm.value.vat
    }

    if (!this.editMode) {
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
    } else {
      this.productService.updateProduct(data)
        .subscribe(
        (res) => {
          console.log(res);
          this.getAllProduct();
          this.productCreateForm.reset();
          this.editMode = false;
        },
        (err) => {

        }
        )
    }
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

  statusChanged(event: any) {
    this.getAllProduct();
  }

  showEditForm(event) {
    this.editMode = true;
    this.id = event;
    this.productService.getProductById(event)
      .subscribe(
      (res) => {
        this.productCreateForm.patchValue({
          name: [res.name],
          rate: [res.rate],
          description: [res.description],
          status: [res.status],
          vat: [res.vat]
        });
      },
      (err) => {

      }
      )
  }

  cancelEdit() {
    this.editMode = false;
    this.productCreateForm.reset();
    this.getAllProduct();
  }

}
