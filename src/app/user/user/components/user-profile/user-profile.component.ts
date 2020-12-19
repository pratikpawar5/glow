import { Component, OnInit, Input } from '@angular/core';
import { User, UserUpdate, UsernameType } from '@models/user';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TokenService } from '@services/token/token.service';
import { Router } from '@angular/router';
import { UserService } from '@services/user/user.service';
import { SnackBarService } from '@services/common/snack-bar.service';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { UpdateMobileEmailOtpVerifyDialogComponent } from './update-mobile-email-otp-verify-dialog/update-mobile-email-otp-verify-dialog.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  readonly EMAIL = UsernameType.EMAIL
  readonly MOBILE = UsernameType.MOBILE

  @Input()
  user: User;
  userProfileForm: FormGroup
  nameEdit = true
  saveButton = false
  exception = null
  hide = true;

  count: number = 0;

  invalidOtpErrorMsg: string
  otpVerifyDialog: MatDialogRef<UpdateMobileEmailOtpVerifyDialogComponent>;
  uuid: string
  constructor(private token: TokenService, private dialog: MatDialog, private formBuilder: FormBuilder, private snackBar: SnackBarService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.uuid = this.token.getUserId();
    this.userProfileForm = this.formBuilder.group({
      userFullName: new FormControl(this.user.userFullName, Validators.pattern('[a-zA-Z. ]*$')),
      userEmail: new FormControl(this.user.userEmail),
      userMobile: new FormControl(this.user.userMobile),
    })

    this.userProfileForm.controls['userFullName'].disable();
    this.userProfileForm.controls['userEmail'].disable();
    this.userProfileForm.controls['userMobile'].disable();
  }

  /* for userFullName*/
  onEditFullName() {
    this.nameEdit = false
    this.saveButton = true
    this.userProfileForm.controls['userFullName'].enable();
  }

  onCancelName() {
    this.nameEdit = true
    this.saveButton = false
    this.userProfileForm.controls['userFullName'].disable();
    this.ngOnInit()
  }

  onUpdateFullName() {

    const fullname: string = this.userProfileForm.controls['userFullName'].value;
    if (fullname == null) {
      this.userProfileForm.controls['userFullName'].setErrors({
        "required": true
      })
      return;
    } if (fullname.length == 0 || fullname[0] == " ") {
      this.userProfileForm.controls['userFullName'].setErrors({
        "inValid": true
      })
      return;
    }
    let user = new UserUpdate();
    user.userFullName = fullname
    if(this.userProfileForm.valid)
    {
      this.userService.updateFullName(user).subscribe(
        res => {
          if (!res.error) {
            this.token.setToken(res.data.token)
            this.snackBar.open(res.message);
            this.router.navigateByUrl('', { skipLocationChange: true }).then(() =>
              this.router.navigate(['account', this.uuid]));
          }
        }
      )
    }
   
  }

  onUpdateUsername(usernameType: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = false;
    dialogConfig.width = '470px';
    dialogConfig.height = '500px';
    if (usernameType == UsernameType.EMAIL) {
      let newMail = this.userProfileForm.controls['userEmail'].value
      dialogConfig.data = { username: newMail, type: usernameType }
    } else if (usernameType == UsernameType.MOBILE) {
      let mobileNumber = this.userProfileForm.controls['userMobile'].value
      dialogConfig.data = { username: mobileNumber, type: usernameType }
    } else {
      return
    }

    this.otpVerifyDialog = this.dialog.open(UpdateMobileEmailOtpVerifyDialogComponent, dialogConfig)
    this.otpVerifyDialog.afterClosed().subscribe(
      res => {
        if (res != undefined) {
          this.router.navigateByUrl('', { skipLocationChange: true }).then(() =>
            this.router.navigate(['account', this.uuid]));
        }
      })
  }

}
