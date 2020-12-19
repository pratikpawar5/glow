import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OtpData, FlowType } from 'app/auth/models/auth';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { OtpVerifyService } from 'app/auth/auth-services/otp-verify.service';
import { TokenService } from '@services/token/token.service';
import { SnackBarService } from '@services/common/snack-bar.service';
import { LoginService } from 'app/auth/auth-services/login.service';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-otp-verify',
  templateUrl: './otp-verify.component.html',
  styleUrls: ['./otp-verify.component.css']
})
export class OtpVerifyComponent implements OnInit {

  @Input()
  otpData: OtpData

  @Output()
  closeDialog = new EventEmitter<boolean>()

  @Output()
  jobSeekerPage = new EventEmitter<boolean>()

  invalidOtpErrorMsg: string

  otpVerifyForm: FormGroup
  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private otpService: OtpVerifyService,
    private token: TokenService, private snackBar: SnackBarService, private router: Router) {

  }

  ngOnInit() {
    this.otpVerifyForm = this.formBuilder.group({
      uuid: new FormControl(this.otpData.uuid),
      otp: new FormControl(null, [Validators.pattern('[0-9]+')]),
      username: new FormControl(this.otpData.username),
    })
  }

  resendOtp() {
    this.otpService.generateOtp(this.otpData).subscribe(
      res => {
        if (!res.error) {
          this.snackBar.open("OTP sent to " + this.otpData.username)
        }
      }
    )
  }

  onVerify() {
    if (this.otpVerifyForm.controls['otp'].value == null) {
      this.otpVerifyForm.controls['otp'].setErrors({
        'required': true
      })
      return true;
    }
    switch (this.otpData.flowType) {

      case FlowType.OTP_LOGIN: // ONLY USE FOR LOGIN WITH OTP
        this.otpLogin(this.otpVerifyForm.value);
        break;
      case FlowType.SIGN_UP_VERIFICATION:// ONLY USE FOR SIGNUP VERIFICATION
        this.verifyUser(this.otpVerifyForm.value)
        break;
    }


  }

  otpLogin(otpData: OtpData) {
    this.loginService.loginWithOTP(otpData).subscribe(
      res => {
        if (res.error && res.customErrorCode == 600) {
          this.otpVerifyForm.controls['otp'].setErrors({
            "invalidOtp": true
          });
          this.invalidOtpErrorMsg = res.message
        } else {
          this.token.setToken(res.data.token)
          this.closeDialog.emit(true)
        }
      }
    )
  }

  verifyUser(otpData: OtpData) {
    this.otpService.verifyUser(otpData).subscribe(
      res => {
        if (res.error && res.customErrorCode == 600) {
          this.otpVerifyForm.controls['otp'].setErrors({
            "invalidOtp": true
          });
          this.invalidOtpErrorMsg = res.message
        } else {
          this.token.setToken(res.data.token)
          this.closeDialog.emit(true)
          this.jobSeekerPage.emit(true)
        }
      }
    )
  }

}
