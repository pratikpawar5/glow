import { Component, OnInit, Input } from '@angular/core';
import { JobView } from '@models/jobs';
import { NguCarouselConfig } from '@ngu/carousel';
import { TokenService } from '@services/token/token.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { SnackBarService } from '@services/common/snack-bar.service';
import { AuthRouteComponent } from 'app/auth/auth-route/auth-route.component';
import { VacancyAppilyPopUpComponent } from 'app/shared/components/vacancy-appily-pop-up/vacancy-appily-pop-up.component';
import { JobPostService } from '@services/job-post/job-post.service';

@Component({
  selector: 'app-slider-six',
  templateUrl: './slider-six.component.html',
  styleUrls: ['./slider-six.component.css']
})
export class SliderSixComponent implements OnInit {

  @Input()
  jobs: Array<JobView>
  loginSmeUuid: string

  carousel: NguCarouselConfig = {
    grid: { xs: 1, sm: 3, md: 5, lg: 6, all: 0 },
    slide: 3,
    speed: 150,
    point: {
      visible: false
    },
    load: 6,
  }
  constructor(private token: TokenService, private jobPostService: JobPostService, private matDialog: MatDialog, private router: Router, private dialog: DialogService, private snackBar: SnackBarService) { }

  ngOnInit() {
    if (this.token.isLoggedIn()) {
      this.loginSmeUuid = this.token.getSmeId();

    }
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
          this.snackBar.open("Applied Successfully");
          this.jobs[index].applied = true
        }

        if (reload) {
          setTimeout(window.location.reload.bind(location), 2000);
        }
      }
    )
  }
}
