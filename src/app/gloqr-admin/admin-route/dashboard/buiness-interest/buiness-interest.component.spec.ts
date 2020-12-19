import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuinessInterestComponent } from './buiness-interest.component';

describe('BuinessInterestComponent', () => {
  let component: BuinessInterestComponent;
  let fixture: ComponentFixture<BuinessInterestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuinessInterestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuinessInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
