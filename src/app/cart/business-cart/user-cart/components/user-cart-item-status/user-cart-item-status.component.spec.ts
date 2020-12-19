import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCartItemStatusComponent } from './user-cart-item-status.component';

describe('UserCartItemStatusComponent', () => {
  let component: UserCartItemStatusComponent;
  let fixture: ComponentFixture<UserCartItemStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCartItemStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCartItemStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
