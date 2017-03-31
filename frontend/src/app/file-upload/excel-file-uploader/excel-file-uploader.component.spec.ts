import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelFileUploaderComponent } from './excel-file-uploader.component';

describe('ExcelFileUploaderComponent', () => {
  let component: ExcelFileUploaderComponent;
  let fixture: ComponentFixture<ExcelFileUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcelFileUploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelFileUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
