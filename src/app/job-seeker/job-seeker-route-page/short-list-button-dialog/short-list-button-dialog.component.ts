import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { ShortListedInfo, JobApplicantDto, ApplicantStatus } from '@models/jobs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { JobSeekerService } from 'app/job-seeker/job-seekers-services/job-seeker.service';
import { SnackBarService } from '@services/common/snack-bar.service';
import { Router } from '@angular/router';
import { TokenService } from '@services/token/token.service';

@Component({
  selector: 'app-short-list-button-dialog',
  templateUrl: './short-list-button-dialog.component.html',
  styleUrls: ['./short-list-button-dialog.component.css']
})
export class ShortListButtonDialogComponent implements OnInit {
  jobApplicantDto: JobApplicantDto
  applicantStatus: ApplicantStatus
  shortListedForm: FormGroup
  minDate = new Date();
  maxDate = new Date();
  currentDate = new Date();
  fullYear = new Date();
  showButton: boolean = true
  interviewDateRecquired:boolean
  uuid: string
  interviewTime: Array<string> =
    [
      '08.00 AM',
      '08.30 AM',
      '09.00 AM',
      '09.30 AM',
      '10.00 AM',
      '10.30 AM',
      '11.00 AM',
      '11.30 AM',
      '12.00 PM',
      '12.30 PM',
      '01.00 PM',
      '01.30 PM',
      '02.00 PM',
      '02.30 PM',
      '03.00 PM',
      '03.30 PM',
      '04.00 PM',
      '04.30 PM',
      '05.00 PM',
      '06.30 PM',
      '07.00 PM',
      '07.30 PM',
      '08.00 PM',
    ];
  @ViewChild('input1') inputOne: ElementRef;

  constructor(private shortListedDialog: MatDialogRef<ShortListButtonDialogComponent>, private token: TokenService, private router: Router, @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: SnackBarService, private formBuilder: FormBuilder, private jobSeekerService: JobSeekerService) { }

  ngOnInit() {
    this.uuid = this.token.getUserId();
    this.currentDate.getDate();
    this.fullYear.setFullYear(2020, 12, 31);

    this.maxDate = this.fullYear
    this.minDate = this.currentDate
    this.shortListedForm = this.formBuilder.group({
      interviewDate: new FormControl(null, Validators.required),
      interviewTime: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.maxLength(500)),
    })
    this.shortListedForm.controls['interviewDate'].disable();
  }
  onClickClose() {
    this.shortListedDialog.close();
  }

  onClickSubmit() {
    let interviewDate: string = this.shortListedForm.controls['interviewDate'].value
    if (this.shortListedForm.valid && interviewDate) {
        this.showButton = false
        let shortListedInfo = new ShortListedInfo();
        shortListedInfo.description = this.shortListedForm.controls['description'].value
        shortListedInfo.interviewDate = this.shortListedForm.controls['interviewDate'].value
        shortListedInfo.interviewTime = this.shortListedForm.controls['interviewTime'].value
        let jobApplicantDto = new JobApplicantDto();
        jobApplicantDto.applicantUuid = this.data.applicantUuid
        jobApplicantDto.shortListedInfo = shortListedInfo
        jobApplicantDto.applicantStatus = ApplicantStatus.SHORTLISTED
        this.jobSeekerService.shortListed(jobApplicantDto).subscribe(
          res => {
            if (res.error) {
              this.showButton = true
            }
            else {
              this.snackBar.open("Short-listed Successfully");
              this.shortListedDialog.close();
              this.router.navigateByUrl('', { skipLocationChange: true }).then(() =>
                this.router.navigate(['job-seeker', this.uuid, 'j', this.data.applicantUuid]));
            }
          }
        )
      }
      else
      {
        this.interviewDateRecquired = true
      }
  }
}
