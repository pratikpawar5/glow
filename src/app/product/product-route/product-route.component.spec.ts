import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRouteComponent } from './product-route.component';

describe('ProductRouteComponent', () => {
  let component: ProductRouteComponent;
  let fixture: ComponentFixture<ProductRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
