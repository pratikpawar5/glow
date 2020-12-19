import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductPriceUnitsComponent } from './add-product-price-units.component';

describe('AddProductPriceUnitsComponent', () => {
  let component: AddProductPriceUnitsComponent;
  let fixture: ComponentFixture<AddProductPriceUnitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductPriceUnitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductPriceUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
