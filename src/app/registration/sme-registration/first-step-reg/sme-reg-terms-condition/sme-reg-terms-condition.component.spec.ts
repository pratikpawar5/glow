import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeRegTermsConditionComponent } from './sme-reg-terms-condition.component';

describe('SmeRegTermsConditionComponent', () => {
  let component: SmeRegTermsConditionComponent;
  let fixture: ComponentFixture<SmeRegTermsConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeRegTermsConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeRegTermsConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
