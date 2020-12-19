import { Component, OnInit } from '@angular/core';
import { JobView } from '@models/jobs';
import { ActivatedRoute, Router } from '@angular/router';
import { PageTitleService } from '@services/page-title/page-title.service';
import { JobPostService } from '@services/job-post/job-post.service';
import { TokenService } from '@services/token/token.service';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { SnackBarService } from '@services/common/snack-bar.service';
import { AuthRouteComponent } from 'app/auth/auth-route/auth-route.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { VacancyAppilyPopUpComponent } from 'app/shared/components/vacancy-appily-pop-up/vacancy-appily-pop-up.component';
declare var ga: Function;
@Component({
  selector: 'app-sme-vacancies-view',
  templateUrl: './sme-vacancies-view.component.html',
  styleUrls: ['./sme-vacancies-view.component.css']
})
export class SmeVacanciesViewComponent implements OnInit {

  smeJobsDisplay: Array<JobView>
  isNormalUser: boolean
  isLoggedIn: boolean
  showSpinner: boolean = true
  notFound: boolean
  deleteDialogRef: MatDialogRef<VacancyAppilyPopUpComponent>
  loginSmeUuid: string
  constructor(private route: ActivatedRoute, private title: PageTitleService,
    private jobPostService: JobPostService, private snackBar: SnackBarService,
    private dialog: DialogService, private token: TokenService,
    private matDialog: MatDialog,private router:Router) { 
      ga('set', 'page', router.url);
      ga('send', 'pageview');
    }

  ngOnInit() {
    if (this.token.isLoggedIn()) {
      this.loginSmeUuid = this.token.getSmeId();
    }
    let sUuid = this.route.snapshot.root.firstChild.children[0].params['sUuid']
    this.title.updateTitle('Job')
    this.jobPostService.getJobsBySmeIdViewMode(sUuid).subscribe(
      res => {
        if (res.error) {
          this.showSpinner = false
          this.notFound = true
        }
        else {
          this.smeJobsDisplay = res.data
          this.showSpinner = false

        }
      },
    )
  }

  jobApply(index: number, job: JobView) {
    if (!this.token.isLoggedIn()) {
      const dialogRef = this.matDialog.open(AuthRouteComponent, this.dialog.loginConfig())
      dialogRef.afterClosed().subscribe(
        res => {
          if (this.token.isLoggedIn() && this.token.isSME() && this.token.getSmeId() === job.smeInfo.sUuid) {
            window.alert("Oops! you're trying to apply for your own Job posting")
            window.location.reload();
          }
          else if (this.token.isLoggedIn() && this.token.isSME()) {
            let ref = this.matDialog.open(VacancyAppilyPopUpComponent, this.dialog.getVacancyAppliedPopup(job.vacancyUuid))
          }
          else if (this.token.isLoggedIn() && this.token.isNormalUser()) {
            this.onClickNormalUserApply(index, job.vacancyUuid, true);
          }
        }
      )
    }
    else {
      if (this.token.isSME()) {
        let ref = this.matDialog.open(VacancyAppilyPopUpComponent, this.dialog.getVacancyAppliedPopup(job.vacancyUuid))
      }
      else if (this.token.isNormalUser()) {
        this.onClickNormalUserApply(index, job.vacancyUuid, false);
      }
    }
  }

  onClickNormalUserApply(index: number, vacancyUuid: string, reload: boolean) {
    this.jobPostService.applyJob(vacancyUuid).subscribe(
      res => {
        if (res.error && res.code == 404) {
          window.alert("Please fill your Job-Seeker Profile First")
          this.router.navigateByUrl('/pages/job-seeker-permission')
        }
        else if (res.error && res.code == 400) {
          this.snackBar.open("Already Applied")
        }
        else {
          this.smeJobsDisplay[index].applied = true
          this.snackBar.open("Applied Successfully");
        }
        if (reload) {
          setTimeout(window.location.reload.bind(location), 2000);
        }
      }
    )
  }

}
