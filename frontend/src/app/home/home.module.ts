import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeBodyComponent } from './home-body/home-body.component';
import { PayChartComponent } from './pay-chart/pay-chart.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ChartsModule
    ],
    declarations: [
        HomeBodyComponent,
        PayChartComponent
    ],
    exports: [
        HomeBodyComponent
    ],
    providers: [
    ]
})
export class HomeModule { }

