import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessCartComponent } from './business-cart.component';

describe('BusinessCartComponent', () => {
  let component: BusinessCartComponent;
  let fixture: ComponentFixture<BusinessCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
