import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingRouteComponent } from './pricing-route.component';

describe('PricingRouteComponent', () => {
  let component: PricingRouteComponent;
  let fixture: ComponentFixture<PricingRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
