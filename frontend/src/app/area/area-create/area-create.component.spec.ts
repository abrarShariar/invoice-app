import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaCreateComponent } from './area-create.component';

describe('AreaCreateComponent', () => {
  let component: AreaCreateComponent;
  let fixture: ComponentFixture<AreaCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
