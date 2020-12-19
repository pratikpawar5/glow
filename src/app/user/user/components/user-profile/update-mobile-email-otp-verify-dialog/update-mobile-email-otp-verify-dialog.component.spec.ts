import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMobileEmailOtpVerifyDialogComponent } from './update-mobile-email-otp-verify-dialog.component';

describe('UpdateMobileEmailOtpVerifyDialogComponent', () => {
  let component: UpdateMobileEmailOtpVerifyDialogComponent;
  let fixture: ComponentFixture<UpdateMobileEmailOtpVerifyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateMobileEmailOtpVerifyDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMobileEmailOtpVerifyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
