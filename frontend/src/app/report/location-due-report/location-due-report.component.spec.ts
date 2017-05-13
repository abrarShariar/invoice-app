import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationDueReportComponent } from './location-due-report.component';

describe('LocationDueReportComponent', () => {
  let component: LocationDueReportComponent;
  let fixture: ComponentFixture<LocationDueReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationDueReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationDueReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
