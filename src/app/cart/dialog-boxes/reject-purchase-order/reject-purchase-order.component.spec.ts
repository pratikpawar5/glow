import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectPurchaseOrderComponent } from './reject-purchase-order.component';

describe('RejectPurchaseOrderComponent', () => {
  let component: RejectPurchaseOrderComponent;
  let fixture: ComponentFixture<RejectPurchaseOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectPurchaseOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectPurchaseOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
