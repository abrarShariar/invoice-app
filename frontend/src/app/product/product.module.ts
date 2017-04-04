import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Ng2PaginationModule } from 'ng2-pagination';
import { DialogModule } from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductRoutingModule } from './product-routing.module';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductService } from './product.service';
import { ProductAllComponent } from './product-all/product-all.component';


@NgModule({
    imports: [
        CommonModule,
        ProductRoutingModule,
        Ng2PaginationModule,
        DialogModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        ProductCreateComponent,
        ProductAllComponent],
    exports: [

    ],
    providers: [
        ProductService
    ]
})
export class ProductModule { }

