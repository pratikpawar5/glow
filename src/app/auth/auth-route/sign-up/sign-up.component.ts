import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SignUpService } from 'app/auth/auth-services/sign-up.service';
import { SnackBarService } from '@services/common/snack-bar.service';
import { OtpData, UserState, FlowType } from 'app/auth/models/auth';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signupForm: FormGroup;
  emailPattern =

    "^[_A-Za-z0-9_.]+(\\.[_A-Za-z0-9-]+)*@"
    + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
  @Output()
  otpVerify = new EventEmitter<OtpData>()

  constructor(private formBuilder: FormBuilder, private signUpService: SignUpService,
    private snackBar: SnackBarService) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      userFullName: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]*$')]),
      username: new FormControl(null, [Validators.required]),
      // userPassword: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
    })
  }

  generateOTP() {

    const userFullName: string = this.signupForm.controls['userFullName'].value;
    const username: string = this.signupForm.controls['username'].value;
    const mobileNumPattern: string = "^[0-9]*$";
    if (userFullName[0] == " ") {
      this.signupForm.controls['userFullName'].setErrors({
        "inValid": true
      })
      return;
    }
    if (username.match(mobileNumPattern) != null) {
      if (username.length != 10) {
        this.signupForm.controls['username'].setErrors({
          "invalidUsername": true
        })
        return;
      }
    } else if (username.match(this.emailPattern) == null) {
      this.signupForm.controls['username'].setErrors({
        "invalidUsername": true
      })
      return;
    }

    if (this.signupForm.valid) {

      this.signUpService.signup(this.signupForm.value).subscribe(
        res => {
          if (res.error) {
            let msg: string = res.message
            if (msg.indexOf('@') != -1) {
              this.snackBar.open(res.message)
              this.signupForm.controls['username'].setErrors({
                'emailExist': true
              })
            }
            else {
              this.snackBar.open(res.message)
              this.signupForm.controls['username'].setErrors({
                'mobileExist': true
              })
            }
          } else {

            let otpData: OtpData = new OtpData()
            otpData.uuid = res.data.uuid
            otpData.username = res.data.username
            otpData.userState = UserState.UN_VERIFIED
            otpData.flowType = FlowType.SIGN_UP_VERIFICATION
            this.otpVerify.emit(otpData)
          }
        }
      )
    }

  }

}
