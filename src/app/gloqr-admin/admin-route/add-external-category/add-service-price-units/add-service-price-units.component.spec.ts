import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServicePriceUnitsComponent } from './add-service-price-units.component';

describe('AddServicePriceUnitsComponent', () => {
  let component: AddServicePriceUnitsComponent;
  let fixture: ComponentFixture<AddServicePriceUnitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddServicePriceUnitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddServicePriceUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
