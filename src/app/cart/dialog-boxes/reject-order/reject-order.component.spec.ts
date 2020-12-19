import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectOrderComponent } from './reject-order.component';

describe('RejectOrderComponent', () => {
  let component: RejectOrderComponent;
  let fixture: ComponentFixture<RejectOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
