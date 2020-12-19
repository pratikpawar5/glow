import { Component, OnInit, Input } from '@angular/core';
import { TokenService } from '@services/token/token.service';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { JobPostService } from '@services/job-post/job-post.service';
import { SnackBarService } from '@services/common/snack-bar.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AuthRouteComponent } from 'app/auth/auth-route/auth-route.component';
import { VacancyAppilyPopUpComponent } from 'app/shared/components/vacancy-appily-pop-up/vacancy-appily-pop-up.component';
import { JobFilterResponse, JobPost, JobView } from '@models/jobs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-display-list',
  templateUrl: './job-display-list.component.html',
  styleUrls: ['./job-display-list.component.css']
})
export class JobDisplayListComponent implements OnInit {

  @Input()
  jobFilterAndResult: JobFilterResponse

  smeJobsDisplay: Array<JobPost>;
  totalJobsCount: number

  jobRoleFilterParams = new Set<String>();
  jobLocationFilterParams = new Set<String>();
  jobExperienceFilterParams = new Set<String>();
  salaryFilterParams = new Set<String>();
  smeFilterParams = new Set<String>();

  isNormalUser: boolean
  isLoggedIn: boolean
  vacancyApplyPopup: MatDialogRef<VacancyAppilyPopUpComponent>

  //PAGINATION
  page: number = 0;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;

  //SPINNER
  showSpinner: boolean

  loginSmeUuid: string

  constructor(private snackBar: SnackBarService, private jobPostService: JobPostService,
    private dialog: DialogService, private matDialog: MatDialog, private token: TokenService, private router: Router) { }

  ngOnInit() {
    if (this.token.isLoggedIn()) {
      this.loginSmeUuid = this.token.getSmeId();
    }

    this.smeJobsDisplay = this.jobFilterAndResult.results
    this.totalJobsCount = this.jobFilterAndResult.totalVacanciesCount

    const jobRolesFilter = this.jobFilterAndResult.filters['Job_Role'];
    const locationsFilter = this.jobFilterAndResult.filters['Location'];
    const experiencesFilter = this.jobFilterAndResult.filters['Experience'];
    const salariesFilter = this.jobFilterAndResult.filters['Salary'];
    const smesFilter = this.jobFilterAndResult.filters['SME'];

    jobRolesFilter.filter(role => role.selected).forEach(role => this.jobRoleFilterParams.add(role.jobRole))
    locationsFilter.filter(loc => loc.selected).forEach(loc => this.jobLocationFilterParams.add(loc.location))
    experiencesFilter.filter(exp => exp.selected).forEach(exp => this.jobExperienceFilterParams.add(exp.formattedExperience))
    salariesFilter.filter(sal => sal.selected).forEach(sal => this.salaryFilterParams.add(sal.formattedSalary))
    smesFilter.filter(sme => sme.selected).forEach(sme => this.smeFilterParams.add(sme.sUuid))

    if (this.token.isLoggedIn()) {
      this.isLoggedIn = true
    }
    else {
      this.isLoggedIn = false
    }
  }


  onScrollDown() {
    this.showSpinner = true
    this.jobPostService.getFilteredJobsWithPagination(Array.from(this.jobRoleFilterParams), Array.from(this.jobLocationFilterParams), Array.from(this.jobExperienceFilterParams), Array.from(this.salaryFilterParams), Array.from(this.smeFilterParams), ++this.page).subscribe(
      res => {
        this.showSpinner = false
        if (!res.error) {
          this.totalJobsCount = this.totalJobsCount + res.data.totalVacanciesCount
          this.smeJobsDisplay.push(...res.data.results)
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
          this.smeJobsDisplay[index].applied = true
        }

        if (reload) {
          setTimeout(window.location.reload.bind(location), 2000);
        }
      }
    )
  }
}
