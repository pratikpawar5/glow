import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { VacancyApplicantInfo, ApplicantStatus } from '@models/jobs';
import { GloqrAdminService } from 'app/gloqr-admin/gloqr-admin-services/gloqr-admin.service';
interface Dashboard {
  value: string;
  viewValue: string;
}
interface JobStatus {
  value: ApplicantStatus;
  viewValue: string;
}
@Component({
  selector: 'app-job-applied',
  templateUrl: './job-applied.component.html',
  styleUrls: ['./job-applied.component.css']
})
export class JobAppliedComponent implements OnInit {
  noDataAvailable: boolean
  noMoreDataAvailable: boolean
  jobDaysFormControl: FormControl;
  jobStatusFormControl: FormControl;
  page: number = 1;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  currentDate = new Date();
  vacancyApplicantInfo: Array<VacancyApplicantInfo>
  jobStatusEnum: JobStatus[] = [
    { value: ApplicantStatus.SHORTLISTED, viewValue: 'SHORTLISTED' },
    { value: ApplicantStatus.REJECTED, viewValue: 'REJECETED' },
    { value: ApplicantStatus.PENDING, viewValue: 'PENDING' },
    { value: ApplicantStatus.ALL, viewValue: 'ALL' }
  ];
  filterDays: Dashboard[] = [
    { value: '365', viewValue: 'All Days' },
    { value: '30', viewValue: '30 Days' },
    { value: '15', viewValue: '15 Days' },
    { value: '7', viewValue: '7 Days' },
  ];
  count: DoubleRange
  @Input()
  selectedIndex: number
  constructor(private gloqrAdminService: GloqrAdminService) {
    this.jobDaysFormControl = new FormControl(this.filterDays[0].value);
    this.jobStatusFormControl = new FormControl(this.jobStatusEnum[0].value);
  }

  ngOnInit() {
    if (this.selectedIndex === 3) {
      this.getNewApplicants(this.page);
      this.getJobApplicantCount();
      this.jobDaysFormControl.valueChanges.subscribe(
        res => {
          this.page = 1
          this.getNewApplicants(this.page);
          this.getJobApplicantCount();
          this.noMoreDataAvailable = false
        }
      )

      this.jobStatusFormControl.valueChanges.subscribe(
        res => {
          this.page = 1
          this.getNewApplicants(this.page);
          this.getJobApplicantCount();
          this.noMoreDataAvailable = false
        }
      )
    }
  }

  //get JobApplicantCount
  getJobApplicantCount() {
    this.gloqrAdminService.getJobApplicantCount(this.jobStatusFormControl.value, this.jobDaysFormControl.value).subscribe(
      res => {
        if (!res.error) {
          this.count = res.data.count
        }
      }
    )
  }
  //get Job Applicants data according Circle Status like SHORTLISTED, REJECTED, PENDING, ALL

  getNewApplicants(page: number) {
    this.gloqrAdminService.getNewJobDetails(this.jobStatusFormControl.value, this.jobDaysFormControl.value, page).subscribe(
      res => {
        if (res.code === 404) {
          this.vacancyApplicantInfo = [];
          this.noDataAvailable = true
        }
        else {
          this.noDataAvailable = false
          this.vacancyApplicantInfo = res.data;
        }
      }
    )
  }

  //Dashboard Job Applicants Pagination on Scroll use external NPM
  onScrollDown() {
    if (this.selectedIndex === 3 && this.vacancyApplicantInfo.length > 0) {
      this.gloqrAdminService.getNewJobDetails(this.jobStatusFormControl.value, this.jobDaysFormControl.value, ++this.page).subscribe(
        res => {
          if (res.code === 404) {
            this.noMoreDataAvailable = true;
            this.noDataAvailable = false
          }
          else {
            this.vacancyApplicantInfo.push(...res.data)
          }
        }
      )
    }
  }
} 
