import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { OtpVerifyService } from 'app/auth/auth-services/otp-verify.service';
import { OtpData, UserState, FlowType } from 'app/auth/models/auth';
import { LoginService } from 'app/auth/auth-services/login.service';
import { SnackBarService } from '@services/common/snack-bar.service';
import { PageName } from '@models/common';
import { ResetPassword } from '@models/user';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  @Input()
  otpData: OtpData

  @Output()
  callBack = new EventEmitter<PageName>()

  invalidOtpErrorMsg:string

  forgotPassForm: FormGroup
  constructor(private formBuilder: FormBuilder, private otpService: OtpVerifyService,
    private loginService: LoginService, private snackBar: SnackBarService) { }

  ngOnInit() {
    this.forgotPassForm = this.formBuilder.group({
      otp: new FormControl(null, [Validators.required, Validators.pattern('[0-9]+')]),
      newPassword: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(20)])
    })
  }

  change() {
    this.callBack.emit(PageName.LOGIN)
  }

  resendOtp() {
    let otpData = new OtpData();
    otpData.username = this.otpData.username
    otpData.userState = UserState.VERIFIED
    otpData.flowType=FlowType.FORGOT_PASS
    this.otpService.generateOtp(otpData).subscribe(
      res => {
        if (!res.error) {
          this.snackBar.open("OTP sent to " + this.otpData.username)
        }
      }
    )
  }

  saveNewPassword() {
    if (this.forgotPassForm.valid) {

      let resetPass = new ResetPassword();
      resetPass.newPassword = this.forgotPassForm.controls['newPassword'].value
      resetPass.uuid = this.otpData.uuid;

      let otp = this.forgotPassForm.controls['otp'].value

      this.loginService.resetPassword(resetPass, otp).subscribe(
        res => {
          if (res.error && res.customErrorCode == 600) {
            this.forgotPassForm.controls['otp'].setErrors({
              "invalidOtp": true
            });
            this.invalidOtpErrorMsg = res.message
          }
          if (!res.error) {
            this.snackBar.open(res.message)
            this.callBack.emit(PageName.LOGIN)
          }
        }
      )


    }
  }
}
