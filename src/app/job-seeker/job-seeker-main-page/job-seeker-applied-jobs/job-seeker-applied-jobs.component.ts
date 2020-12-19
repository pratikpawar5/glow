import { Component, OnInit } from '@angular/core';
import { JobSeekerService } from 'app/job-seeker/job-seekers-services/job-seeker.service';
import { JobVO, ShortListedInfo } from '@models/jobs';
import { MesssageFromRecruiterComponent } from './messsage-from-recruiter/messsage-from-recruiter.component';
import { MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material';

@Component({
  selector: 'app-job-seeker-applied-jobs',
  templateUrl: './job-seeker-applied-jobs.component.html',
  styleUrls: ['./job-seeker-applied-jobs.component.css']
})

//All Job Applied from Job Seeker display in Job Seeker Profile
export class JobSeekerAppliedJobsComponent implements OnInit {

  smeJobsDisplay: Array<JobVO>;
  disableFlag: boolean
  messageFromRecruiterDialog: MatDialogRef<MesssageFromRecruiterComponent>;

  constructor(private jobSeekerService: JobSeekerService, private matDialog: MatDialog) { }

  ngOnInit() {
    this.jobSeekerService.getAppliedJobsByJobSeeker().subscribe(
      res => {
        if (!res.error) {
          this.smeJobsDisplay = res.data
        }
      }
    )
  }

  //Design a Dialog box for Message from SME to shortlisted candidates
  onClickMarker(shortListedInfo: ShortListedInfo) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = true
    dialogConfig.width = '600px';
    dialogConfig.height = '400px';
    dialogConfig.data = shortListedInfo
    this.messageFromRecruiterDialog = this.matDialog.open(MesssageFromRecruiterComponent, dialogConfig);
  }
}
