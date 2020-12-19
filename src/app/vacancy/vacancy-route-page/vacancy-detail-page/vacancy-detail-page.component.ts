import { Component, OnInit, Input } from '@angular/core';
import { TokenService } from '@services/token/token.service';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { JobPostService } from '@services/job-post/job-post.service';
import { SnackBarService } from '@services/common/snack-bar.service';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { AuthRouteComponent } from 'app/auth/auth-route/auth-route.component';
import { JobView } from '@models/jobs';
import { VacancyAppilyPopUpComponent } from 'app/shared/components/vacancy-appily-pop-up/vacancy-appily-pop-up.component';
import { Router } from '@angular/router';
import { ShareLinksDialogComponent } from 'app/shared/components/share-links-dialog/share-links-dialog.component';
declare var ga: Function;
@Component({
  selector: 'app-vacancy-detail-page',
  templateUrl: './vacancy-detail-page.component.html',
  styleUrls: ['./vacancy-detail-page.component.css']
})
export class VacancyDetailPageComponent implements OnInit {

  @Input()
  smeJob: JobView
  isNormalUser: boolean
  isLoggedIn: boolean
  loginSmeUuid: string
  vacancyApplyPopup: MatDialogRef<VacancyAppilyPopUpComponent>
  url: string
  shareLinksDialogComponent: MatDialogRef<ShareLinksDialogComponent>;
  deviceInfo = null;
  isDesktopDevice: boolean
  isMobile: boolean
  pqr: any
  constructor(private token: TokenService, private snackBar: SnackBarService,
    private jobPostService: JobPostService, private dialog: DialogService, private matDialog: MatDialog, private router: Router) {
    ga('set', 'page', router.url);
    ga('send', 'pageview');
  }

  ngOnInit() {
    this.url=this.router.url;
    if (this.token.isLoggedIn()) {
      this.loginSmeUuid = this.token.getSmeId();
    }
  }
  onClickShare()
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = false
    dialogConfig.width = '500px';
    dialogConfig.height = '250px';
    dialogConfig.data = {url:this.url,name:'vacancy',mailContent:'Vacancy'}
    this.shareLinksDialogComponent = this.matDialog.open(ShareLinksDialogComponent, dialogConfig);
  }
  jobApply(smeJob: JobView) {
    if (!this.token.isLoggedIn()) {
      const dialogRef = this.matDialog.open(AuthRouteComponent, this.dialog.loginConfig())
      dialogRef.afterClosed().subscribe(
        res => {
          if (this.token.isLoggedIn() && this.token.isSME() && this.token.getSmeId() === smeJob.smeInfo.sUuid) {
            window.alert("Oops! you're trying to apply for your own Job posting")
            window.location.reload();          }
          else if (this.token.isLoggedIn() && this.token.isSME()) {
            let ref = this.matDialog.open(VacancyAppilyPopUpComponent, this.dialog.getVacancyAppliedPopup(smeJob.vacancyUuid))
          }
          else if (this.token.isLoggedIn() && this.token.isNormalUser()) {
            this.onClickNormalUserApply(smeJob.vacancyUuid, true);
          }
        }
      )
    }
    else {
      if (this.token.isSME()) {
        let ref = this.matDialog.open(VacancyAppilyPopUpComponent, this.dialog.getVacancyAppliedPopup(smeJob.vacancyUuid))
      }
      else if (this.token.isNormalUser()) {
        this.onClickNormalUserApply(smeJob.vacancyUuid, true);
      }
    }
  }
  onClickNormalUserApply(vacancyUuid: string, reload: boolean) {
    this.jobPostService.applyJob(vacancyUuid).subscribe(
      res => {
        if (res.error && res.code == 404) {
          let c1=window.confirm("Please fill your Job-Seeker Profile First")
          if(c1===true)
          {
            this.router.navigateByUrl('/pages/job-seeker-permission')
          }
        }
        else if (res.error && res.code == 400) {
          this.snackBar.open("Already Applied")
        }
        else {
          this.smeJob.applied = true
          this.snackBar.open("Applied Successfully");
        }
        if (reload) {
          setTimeout(window.location.reload.bind(location), 2000);
        }
      }
    )
  }
}
