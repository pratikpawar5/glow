import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '@services/user/user.service';
import { UserUpdate, UsernameType } from '@models/user';
import { TokenService } from '@services/token/token.service';
import { SnackBarService } from '@services/common/snack-bar.service';

@Component({
  selector: 'app-update-mobile-email-otp-verify-dialog',
  templateUrl: './update-mobile-email-otp-verify-dialog.component.html',
  styleUrls: ['./update-mobile-email-otp-verify-dialog.component.css']
})
export class UpdateMobileEmailOtpVerifyDialogComponent implements OnInit {

  usernameUpdateForm: FormGroup
  username: string;
  showOtpPassField: boolean = false
  requestOTP: boolean = true
  isChangeEnable: boolean = false
  code400ErrorMsg: string
  invalidOtpErrorMsg: string
  constructor(private token: TokenService, @Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService, private formBuilder: FormBuilder, private snackBar: SnackBarService, private dialogRef: MatDialogRef<UpdateMobileEmailOtpVerifyDialogComponent>) { }

  ngOnInit() {
    this.username = this.data.type;
    this.usernameUpdateForm = this.formBuilder.group({
      currentUsername: new FormControl(this.data.username),
      newUsername: new FormControl(null, Validators.required),
      otp: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]{3,3}$")]),
      password: new FormControl(null, Validators.required)
    })

    this.usernameUpdateForm.controls['currentUsername'].disable();
  }

  onClickClose() {
    this.dialogRef.close();
  }
  onChange() {
    this.isChangeEnable = false
    this.showOtpPassField = false
    this.requestOTP = true
    this.usernameUpdateForm.clearValidators()
    this.ngOnInit()

  }

  checkUsernameAndGenerateOtp() {
    const emailPattern = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";


    const newUserName: string = this.usernameUpdateForm.controls['newUsername'].value
    const currentUsername: string = this.usernameUpdateForm.controls['currentUsername'].value

    if (newUserName == null) {
      this.usernameUpdateForm.controls['newUsername'].markAsTouched()
      return;
    } else if (newUserName.indexOf(' ') >= 0) {
      this.usernameUpdateForm.controls['newUsername'].setErrors({
        "invalidUsername": true
      })
      return;
    } else if (this.username == UsernameType.MOBILE && !(newUserName.match("^[0-9]*$") != null && newUserName.length == 10)) {
      this.usernameUpdateForm.controls['newUsername'].setErrors({
        "invalidUsername": true
      })
      return;
    } else if (this.username == UsernameType.EMAIL && newUserName.match(emailPattern) == null) {
      this.usernameUpdateForm.controls['newUsername'].setErrors({
        "invalidUsername": true
      })
      return;
    } else if (newUserName === currentUsername) {
      this.usernameUpdateForm.controls['newUsername'].setErrors({
        "sameUsername": true
      })
      return;
    }


    let userUpdate: UserUpdate = new UserUpdate();
    userUpdate.newUsername = newUserName
    this.userService.checkExistEmailAndMobileAndSendOtp(userUpdate).subscribe(res => {

      if (!res.error) {

        this.requestOTP = false
        this.showOtpPassField = true
        this.isChangeEnable = true
        this.usernameUpdateForm.controls['newUsername'].disable()
        this.snackBar.open(res.message)
      } else if (res.code == 400) {
        this.usernameUpdateForm.controls['newUsername'].setErrors({
          "usernameAlreadyExist": true
        })
        this.code400ErrorMsg = res.message
      }
    })
  }


  onSubmit() {
    if (this.usernameUpdateForm.invalid) {
      return;
    }
    const otp: string = this.usernameUpdateForm.controls['otp'].value
    const password: string = this.usernameUpdateForm.controls['password'].value
    const newUsername: string = this.usernameUpdateForm.controls['newUsername'].value
    if (password.indexOf(" ") >= 0) {
      this.usernameUpdateForm.controls['password'].setErrors({
        "pattern": true
      })
      return
    }
    const userUpdate: UserUpdate = new UserUpdate();
    userUpdate.newUsername = newUsername
    userUpdate.password = password

    this.userService.updateUsername(userUpdate, otp).subscribe(
      res => {
        if (!res.error) {
          this.token.setToken(res.data.token)
          this.snackBar.open(res.message);
          this.dialogRef.close("REFRESH_PAGE");
        } else if (res.customErrorCode == 600) {
          this.usernameUpdateForm.controls['otp'].setErrors({
            'invalidOtp': true
          })
          this.invalidOtpErrorMsg = res.message
        } else if (res.customErrorCode == 601) {
          this.usernameUpdateForm.controls['newUsername'].setErrors({
            "usernameAlreadyExist": true
          })
        } else if (res.customErrorCode == 602) {
          this.snackBar.open(res.message)
          this.usernameUpdateForm.controls['password'].setErrors({
            'invalidPassword': true
          })
          this.dialogRef.close(undefined);
        }
      }
    )
  }

}
