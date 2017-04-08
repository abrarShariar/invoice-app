import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceRecentComponent } from './invoice-recent.component';

describe('InvoiceRecentComponent', () => {
  let component: InvoiceRecentComponent;
  let fixture: ComponentFixture<InvoiceRecentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceRecentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceRecentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
