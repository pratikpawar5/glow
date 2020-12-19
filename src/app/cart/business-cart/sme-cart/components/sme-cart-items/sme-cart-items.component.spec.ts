import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeCartItemsComponent } from './sme-cart-items.component';

describe('SmeCartItemsComponent', () => {
  let component: SmeCartItemsComponent;
  let fixture: ComponentFixture<SmeCartItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeCartItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeCartItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
