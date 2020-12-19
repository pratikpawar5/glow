import { Component, OnInit, Input } from '@angular/core';
import { JobApplicantDto, ApplicantStatus } from '@models/jobs';
import { ShortListButtonDialogComponent } from '../short-list-button-dialog/short-list-button-dialog.component';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { JobSeekerService } from 'app/job-seeker/job-seekers-services/job-seeker.service';
import { TokenService } from '@services/token/token.service';
import { SnackBarService } from '@services/common/snack-bar.service';
import { DeleteObjectsComponent } from 'app/shared/components/delete-objects/delete-objects.component';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { ObjectType, DeleteObject } from '@models/common-delete';

@Component({
  selector: 'app-job-seeker-detail-page',
  templateUrl: './job-seeker-detail-page.component.html',
  styleUrls: ['./job-seeker-detail-page.component.css']
})
export class JobSeekerDetailPageComponent implements OnInit {


  @Input()
  jobApplicantDto: JobApplicantDto
  contentServer: string = environment.CONTENT_SERVER
  panelOpenState = false;
  shortListedInfoDialog: MatDialogRef<ShortListButtonDialogComponent>;
  subcription$: Subscription
  applicantUuid: string
  disableFlag: boolean
  uuid: string
  constructor(private matDialog: MatDialog, private token: TokenService, private dialog: DialogService, private snackBar: SnackBarService, private router: Router, private route: ActivatedRoute, private jobSeekerService: JobSeekerService) { }

  ngOnInit() {
    this.uuid = this.token.getUserId();

    this.subcription$ = this.route.queryParams.subscribe(
      params => {
        this.applicantUuid = params['vid']
      }
    )
  }

  onClickShortList() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = true
    dialogConfig.width = '450px';
    dialogConfig.height = '550px';
    dialogConfig.data = { name: this.jobApplicantDto.applicant.fullName, applicantUuid: this.jobApplicantDto.applicantUuid }
    let ref = this.matDialog.open(ShortListButtonDialogComponent, dialogConfig);
  }

  onClickRejected() {
    let jobApplicantDto = new JobApplicantDto();
    jobApplicantDto.applicantUuid = this.jobApplicantDto.applicantUuid
    jobApplicantDto.shortListedInfo = null
    jobApplicantDto.applicantStatus = ApplicantStatus.REJECTED
    jobApplicantDto.candidateName = this.jobApplicantDto.applicant.fullName
    let deleteObj: DeleteObject<JobApplicantDto> = {
      type: ObjectType.REJECTED_CANDIDATE,
      uuid: null,
      cirlceObjects: jobApplicantDto
    }
    let ref = this.matDialog.open(DeleteObjectsComponent, this.dialog.getDeleteDialogConfig(deleteObj))
  }
}