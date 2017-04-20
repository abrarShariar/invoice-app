import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceHtmlComponent } from './invoice-html.component';

describe('InvoiceHtmlComponent', () => {
  let component: InvoiceHtmlComponent;
  let fixture: ComponentFixture<InvoiceHtmlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceHtmlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceHtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
