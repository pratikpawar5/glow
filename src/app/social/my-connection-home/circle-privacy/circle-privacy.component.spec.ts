import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CirclePrivacyComponent } from './circle-privacy.component';

describe('CirclePrivacyComponent', () => {
  let component: CirclePrivacyComponent;
  let fixture: ComponentFixture<CirclePrivacyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CirclePrivacyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CirclePrivacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
