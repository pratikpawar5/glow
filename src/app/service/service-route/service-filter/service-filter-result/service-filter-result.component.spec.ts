import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceFilterResultComponent } from './service-filter-result.component';

describe('ServiceFilterResultComponent', () => {
  let component: ServiceFilterResultComponent;
  let fixture: ComponentFixture<ServiceFilterResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceFilterResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceFilterResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
