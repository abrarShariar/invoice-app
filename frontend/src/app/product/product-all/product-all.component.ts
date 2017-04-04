import { Component, OnInit, Output, Input, SimpleChange, EventEmitter } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-all',
  templateUrl: './product-all.component.html',
  styleUrls: ['./product-all.component.css']
})
export class ProductAllComponent implements OnInit {
  @Input() products: Product[] = [];
  @Output()
  statusChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private productService: ProductService) { }

  ngOnInit() {
  }


  toggleStatus(id, status) {
    let data = {
      id: id,
      status: !status
    };

    this.productService.setStatus(data)
      .subscribe(
      (res) => {
        if (res.status) {
          this.statusChange.emit(true);
        } else {
          this.statusChange.emit(false);
        }
      },
      (err) => {
        console.log('Error in toggleStatus');
      }
      )
  }



}
