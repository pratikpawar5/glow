import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessCreditsComponent } from './business-credits.component';

describe('BusinessCreditsComponent', () => {
  let component: BusinessCreditsComponent;
  let fixture: ComponentFixture<BusinessCreditsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessCreditsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessCreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
