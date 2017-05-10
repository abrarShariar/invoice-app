import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {HomeRoutingModule} from "./home-routing.module";
import {HomeBodyComponent} from './home-body/home-body.component';
import {HomeChartComponent} from './home-charts/home-charts.component';
import { PayDateChartComponent } from './pay-date-chart/pay-date-chart.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    HomeBodyComponent,
    HomeChartComponent,
    PayDateChartComponent,
  ],
  exports: [
    HomeBodyComponent
  ],
  providers: []
})
export class HomeModule {
}

