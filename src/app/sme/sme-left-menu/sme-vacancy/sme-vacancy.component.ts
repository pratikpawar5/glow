import { Component, OnInit } from '@angular/core';
import { JobView, JobSeeker } from '@models/jobs';
import { PageTitleService } from '@services/page-title/page-title.service';
import { JobPostService } from '@services/job-post/job-post.service';
import { SmeService } from '@services/sme/sme.service';
import { TokenService } from '@services/token/token.service';
import { environment } from 'environments/environment.prod';
import { ViewApplicantsComponent } from './view-applicants/view-applicants.component';
import { MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material';

import { Router } from '@angular/router';
import { DialogService } from '@services/mat-dialog/dialog.service';
declare var ga: Function;
@Component({
  selector: 'app-sme-vacancy',
  templateUrl: './sme-vacancy.component.html',
  styleUrls: ['./sme-vacancy.component.css']
})
export class SmeVacancyComponent implements OnInit {

  smeJobsDisplay: Array<JobView>
  smeName: string
  applicant: JobSeeker
  showSpinner: boolean = true
  notFound: boolean
  contentServer: string = environment.CONTENT_SERVER
  vacancyUuid: string
  shortListedInfoDialog: MatDialogRef<ViewApplicantsComponent>;
  sUuid: string
  constructor(private pageTitleService: PageTitleService,private dialog: DialogService, private matDialog: MatDialog, private jobPostService: JobPostService, private token: TokenService, private smeService: SmeService
    , router: Router) {
    ga('set', 'page', router.url);
    ga('send', 'pageview');
  }

  ngOnInit() {
    this.sUuid = this.token.getSmeId();
    this.pageTitleService.updateTitle('Job')

    this.jobPostService.getJobsBySmeId("false").subscribe(
      res => {
        if (res.error) {
          this.showSpinner = false
          this.notFound = true
        }
        else {
          this.smeJobsDisplay = res.data
          this.showSpinner = false
        }

      }
    )

    this.smeService.getLoginSmeInfo(this.token.getSmeId()).subscribe(
      resSmeName => {
        this.smeName = resSmeName.smeName
      }
    )
  }

  onClickViewJobApplicants(vacancyUuid: string,value:string) {
    this.matDialog.open(ViewApplicantsComponent, this.dialog.getJobApplicant(vacancyUuid, value));
  }
}
