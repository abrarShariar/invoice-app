import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Ng2PaginationModule } from 'ng2-pagination';
import { DialogModule } from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AreaCreateComponent } from './area-create/area-create.component';
import { AreaRoutingModule } from './area-routing.module';
import { AreaService } from './area.service';
import { AreaAllComponent } from './area-all/area-all.component';


@NgModule({
    imports: [
        CommonModule,
        Ng2PaginationModule,
        DialogModule,
        FormsModule,
        ReactiveFormsModule,
        AreaRoutingModule
    ],
    declarations: [
        AreaCreateComponent,
        AreaAllComponent
    ],
    exports: [

    ],
    providers: [
        AreaService
    ]
})
export class AreaModule { }

