import { Component, OnInit, Output, Input } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-all',
  templateUrl: './product-all.component.html',
  styleUrls: ['./product-all.component.css']
})
export class ProductAllComponent implements OnInit {
  @Input() products:Product[] = [];
  constructor(private productService: ProductService) { }

  ngOnInit() {
  }



}
