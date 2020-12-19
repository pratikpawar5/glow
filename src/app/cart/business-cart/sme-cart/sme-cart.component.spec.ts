import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeCartComponent } from './sme-cart.component';

describe('SmeCartComponent', () => {
  let component: SmeCartComponent;
  let fixture: ComponentFixture<SmeCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
