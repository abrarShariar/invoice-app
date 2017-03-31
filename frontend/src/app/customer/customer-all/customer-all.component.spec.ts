import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAllComponent } from './customer-all.component';

describe('CustomerAllComponent', () => {
  let component: CustomerAllComponent;
  let fixture: ComponentFixture<CustomerAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
