import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFilterResultComponent } from './product-filter-result.component';

describe('ProductFilterResultComponent', () => {
  let component: ProductFilterResultComponent;
  let fixture: ComponentFixture<ProductFilterResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductFilterResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFilterResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
