import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'app/auth/auth-services/login.service';
import { OtpData, UserState, FlowType } from 'app/auth/models/auth';
import { TokenService } from '@services/token/token.service';
import { SnackBarService } from '@services/common/snack-bar.service';
import { AuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { SocialLoginCredentials, GoogleOauthToken, FacebookUser } from '@models/social-login-credentials';
import { OtpVerifyService } from 'app/auth/auth-services/otp-verify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output()
  closeDialog = new EventEmitter<boolean>()

  @Output()
  close = new EventEmitter<boolean>()

  @Output()
  otpVerify = new EventEmitter<OtpData>()

  @Output()
  forgotPassword = new EventEmitter<OtpData>()

  invalidUsernameErrorMSg: string
  userNotFoundErrorMsg: string

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private token: TokenService,
    private snackBar: SnackBarService, private auth: AuthService, private otpService: OtpVerifyService, private router: Router) {

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null)
    })
  }

  generateOtp(flowType: FlowType) {
    if (this.loginForm.controls['username'].value == null) {
      this.loginForm.controls['username'].markAsTouched()
      return true
    }

    let otpData = new OtpData();
    otpData.username = this.loginForm.controls['username'].value
    otpData.userState = UserState.VERIFIED
    otpData.flowType = flowType;
    this.otpService.generateOtp(otpData).subscribe(
      res => {
        if (res.error) {
          if (res.code == 404) {
            this.loginForm.controls['username'].setErrors({
              "userNotFound": true
            });
          }
          if (res.code == 400) {
            this.loginForm.controls['username'].setErrors({
              "invalidUsername": true
            });
            this.invalidUsernameErrorMSg = res.message
          }
        } else {
          this.snackBar.open("OTP Sent to " + res.data.username)

          switch (flowType) {

            case FlowType.OTP_LOGIN:
              otpData.uuid = res.data.uuid
              this.otpVerify.emit(otpData)
              break;
            case FlowType.FORGOT_PASS:
              this.forgotPassword.emit(res.data)
              break;
          }
        }
      }
    )
  }

  onLogin() {
    if (this.loginForm.controls['username'].value == null) {
      this.loginForm.controls['username'].markAsTouched()
      return true
    }
    if (this.loginForm.controls['password'].value == null) {
      this.loginForm.controls['password'].setErrors({ 'required': true })
      return true
    }

    this.loginService.login(this.loginForm.value).subscribe(
      res => {
        if (res.error) {
          if (res.code === 401 || res.code === 400) {
            this.loginForm.controls['username'].setErrors({
              "invalidCredentials": true
            });
          }
        } else {
          this.token.setToken(res.data.token)
          this.closeDialog.emit(true)
        }
      }
    )
  }

  signInWithGoogle(): void {
    this.auth.signIn(GoogleLoginProvider.PROVIDER_ID).then(userData => {
      let googleUser = new GoogleOauthToken();
      googleUser.authToken = userData.idToken;
      googleUser.clientId = SocialLoginCredentials.googleClientId;
      this.getLogin(googleUser, 'google');
    });
  }

  signInWithFacebook(): void {
    this.auth.signIn(FacebookLoginProvider.PROVIDER_ID).then(fbdata => {
      let socialUser = new FacebookUser();
      socialUser.facebookClientId
      socialUser.email = fbdata.email
      socialUser.provider = fbdata.provider
      socialUser.id = fbdata.id
      socialUser.name = fbdata.name
      socialUser.image = fbdata.photoUrl
      socialUser.token = fbdata.authToken
      socialUser.idToken = fbdata.idToken
      socialUser.facebookClientId = SocialLoginCredentials.facebookClientId
      socialUser.facebookClientSecret = SocialLoginCredentials.facebookClientSecret
      this.getLogin(socialUser, 'facebook')
    });
  }

  getLogin(userData, provider: string) {
    if (provider == 'google') {

      this.loginService.googleSocialLogin(userData).subscribe(
        res => {
          if (res.error) {

          }
          else {
            this.token.setToken(res.data.token)
            window.location.reload()
          }

        }
      )

    }
    else if (provider == 'facebook') {

      this.loginService.facebookSocialLogin(userData).subscribe(
        res => {
          if (res.error) {

          }
          else {
            this.token.setToken(res.data.token)
            window.location.reload()
          }

        },
        err => {
        }
      )
    }
    else {
    }
  }


  onKeydown(event: KeyboardEvent) {
    if (event.keyCode === 32) {
      return false;
    }
  }
}
