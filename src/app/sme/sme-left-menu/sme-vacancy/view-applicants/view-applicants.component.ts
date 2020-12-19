import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { JobPostService } from '@services/job-post/job-post.service';
import { JobApplicantDto } from '@models/jobs';
import { environment } from 'environments/environment';
import { TokenService } from '@services/token/token.service';

@Component({
  selector: 'app-view-applicants',
  templateUrl: './view-applicants.component.html',
  styleUrls: ['./view-applicants.component.css']
})
export class ViewApplicantsComponent implements OnInit {

  jobApplicantDto: Array<JobApplicantDto>
  contentServer: string = environment.CONTENT_SERVER
  uuid: string
  constructor(private viewApplicantDialog: MatDialogRef<ViewApplicantsComponent>, private token: TokenService, @Inject(MAT_DIALOG_DATA) public data: any, private jobPostService: JobPostService) { }

  ngOnInit() {
    this.uuid = this.token.getUserId();
    this.jobPostService.getJobApplicants(this.data.vacancyUuid, this.data.value).subscribe(
      res => {
        this.jobApplicantDto = res.data
      }
    )
  }
  onClickClose() {
    this.viewApplicantDialog.close();
  }
}
