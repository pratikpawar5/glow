import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeAddressDetailsComponent } from './sme-address-details.component';

describe('SmeAddressDetailsComponent', () => {
  let component: SmeAddressDetailsComponent;
  let fixture: ComponentFixture<SmeAddressDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeAddressDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeAddressDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
