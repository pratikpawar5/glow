import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectQuotationComponent } from './reject-quotation.component';

describe('RejectQuotationComponent', () => {
  let component: RejectQuotationComponent;
  let fixture: ComponentFixture<RejectQuotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectQuotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
