import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageData, PageName } from '@models/common';
import { OtpData } from '../models/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-route',
  templateUrl: './auth-route.component.html',
  styleUrls: ['./auth-route.component.css']
})
export class AuthRouteComponent implements OnInit {

  otpData: OtpData

  constructor(private dialogRef: MatDialogRef<AuthRouteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PageData //FOR GETTING DATA FROM MAT-DIALOG SERVICE
    , private router: Router) {
  }

  ngOnInit() {
    //FOR OPEN LOGIN, SIGNUP, OTP AND FORGOT PASSWORD WE CREATE ONE COMMON SERVICE IN CORE=> SERVICES => MAT-DIALOG => DIALOG.SERVICE.TS

  }

  otpVerify(otpData: OtpData) {
    this.otpData = otpData
    this.data.pageName = PageName.OTP
  }

  forgotPassword(otpData: OtpData) {
    this.otpData = otpData
    this.data.pageName = PageName.FORGOT_PASSWORD
  }

  onSignup() {
    this.data.pageName = PageName.SIGNUP
  }

  onLogin() {
    this.data.pageName = PageName.LOGIN
  }

  callBack(pageName: PageName) {
    this.data.pageName = pageName
  }

  close() {
    this.dialogRef.close()
  }

  closeDialog() {
    this.dialogRef.close(true)
    // this.router.navigateByUrl(this.data.returnURL)
  }

  jobSeekerPage() {
    this.router.navigateByUrl('/pages/job-seeker-permission')
  }

}
