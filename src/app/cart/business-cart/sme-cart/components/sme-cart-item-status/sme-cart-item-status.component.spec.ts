import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeCartItemStatusComponent } from './sme-cart-item-status.component';

describe('SmeCartItemStatusComponent', () => {
  let component: SmeCartItemStatusComponent;
  let fixture: ComponentFixture<SmeCartItemStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeCartItemStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeCartItemStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
