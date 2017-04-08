import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceAllComponent } from './invoice-all.component';

describe('InvoiceAllComponent', () => {
  let component: InvoiceAllComponent;
  let fixture: ComponentFixture<InvoiceAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
