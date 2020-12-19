import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceSubcategorySliderComponent } from './service-subcategory-slider.component';

describe('ServiceSubcategorySliderComponent', () => {
  let component: ServiceSubcategorySliderComponent;
  let fixture: ComponentFixture<ServiceSubcategorySliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceSubcategorySliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceSubcategorySliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
