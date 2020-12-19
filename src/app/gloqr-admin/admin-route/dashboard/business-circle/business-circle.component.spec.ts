import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessCircleComponent } from './business-circle.component';

describe('BusinessCircleComponent', () => {
  let component: BusinessCircleComponent;
  let fixture: ComponentFixture<BusinessCircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessCircleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
