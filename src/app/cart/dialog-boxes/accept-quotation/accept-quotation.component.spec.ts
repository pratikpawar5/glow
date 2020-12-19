import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptQuotationComponent } from './accept-quotation.component';

describe('AcceptQuotationComponent', () => {
  let component: AcceptQuotationComponent;
  let fixture: ComponentFixture<AcceptQuotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptQuotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
