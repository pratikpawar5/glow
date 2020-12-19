import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditConsumptionsComponent } from './credit-consumptions.component';

describe('CreditConsumptionsComponent', () => {
  let component: CreditConsumptionsComponent;
  let fixture: ComponentFixture<CreditConsumptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditConsumptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditConsumptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
