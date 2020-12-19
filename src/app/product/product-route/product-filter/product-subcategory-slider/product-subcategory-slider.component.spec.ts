import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSubcategorySliderComponent } from './product-subcategory-slider.component';

describe('ProductSubcategorySliderComponent', () => {
  let component: ProductSubcategorySliderComponent;
  let fixture: ComponentFixture<ProductSubcategorySliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSubcategorySliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSubcategorySliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
