import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayDateChartComponent } from './pay-date-chart.component';

describe('PayDateChartComponent', () => {
  let component: PayDateChartComponent;
  let fixture: ComponentFixture<PayDateChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayDateChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayDateChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
