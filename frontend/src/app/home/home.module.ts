import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeBodyComponent } from './home-body/home-body.component';


@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        HomeBodyComponent
    ],
    exports: [
        HomeBodyComponent
    ],
    providers: [
    ]
})
export class HomeModule { }

