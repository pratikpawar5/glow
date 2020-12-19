import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancellationRefundComponent } from './cancellation-refund.component';

describe('CancellationRefundComponent', () => {
  let component: CancellationRefundComponent;
  let fixture: ComponentFixture<CancellationRefundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancellationRefundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancellationRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
