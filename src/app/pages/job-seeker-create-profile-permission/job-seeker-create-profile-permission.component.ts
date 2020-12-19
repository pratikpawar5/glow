import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'app/auth/auth-services/login.service';
import { TokenService } from '@services/token/token.service';
import { OtpData } from 'app/auth/models/auth';
import { ExtraService } from '@services/common/extra.service';
import { SnackBarService } from '@services/common/snack-bar.service';
import { JobSeekerBasicProfileInfo } from '@models/jobs';
import { User } from '@models/user';
declare var ga: Function;
@Component({
  selector: 'app-job-seeker-create-profile-permission',
  templateUrl: './job-seeker-create-profile-permission.component.html',
  styleUrls: ['./job-seeker-create-profile-permission.component.css']
})
export class JobSeekerCreateProfilePermissionComponent implements OnInit {

  uuid: string
  userDetails: User
  constructor(private router: Router, private snackBar: SnackBarService, private extraService: ExtraService, private loginService: LoginService, private token: TokenService) {
    ga('set', 'page', router.url);
    ga('send', 'pageview');
   }

  ngOnInit() {
    if (this.token.isLoggedIn()) {
      this.uuid = this.token.getUserId();
    }
    this.loginService.getUserVo(this.uuid).subscribe(
      res => {

        if (res.error) {

        }
        else {
          this.userDetails = res.data
        }
      }

    )
  }
  doItLater() {
    this.router.navigateByUrl('/');
  }
  yesIn() {
    let basicProfielInfo = new JobSeekerBasicProfileInfo();
    basicProfielInfo.fullName = this.userDetails.userFullName
    basicProfielInfo.emailId = this.userDetails.userEmail
    basicProfielInfo.mobileNumber = this.userDetails.userMobile

    this.extraService.postBasicProfileInfo(basicProfielInfo).subscribe(
      res => {
        if (res.error) {

        }
        else {
          this.snackBar.open('Job Profile Created');
          this.router.navigateByUrl('/job-seeker/'+this.uuid+'/job-seeker-display')

        }
      }
    )
  }
}
