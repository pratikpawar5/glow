import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialCirclePrivacyComponent } from './social-circle-privacy.component';

describe('SocialCirclePrivacyComponent', () => {
  let component: SocialCirclePrivacyComponent;
  let fixture: ComponentFixture<SocialCirclePrivacyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialCirclePrivacyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialCirclePrivacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
