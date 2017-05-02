import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayChartComponent } from './pay-chart.component';

describe('PayChartComponent', () => {
  let component: PayChartComponent;
  let fixture: ComponentFixture<PayChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
