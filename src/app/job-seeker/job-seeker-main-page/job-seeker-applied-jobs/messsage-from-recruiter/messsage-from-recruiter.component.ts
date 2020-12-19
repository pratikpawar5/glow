import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ShortListedInfo } from '@models/jobs';

@Component({
  selector: 'app-messsage-from-recruiter',
  templateUrl: './messsage-from-recruiter.component.html',
  styleUrls: ['./messsage-from-recruiter.component.css']
})

  //Design a Dialog box for Message from SME to shortlisted candidates
export class MesssageFromRecruiterComponent implements OnInit {

  shortListedInfo: ShortListedInfo

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<MesssageFromRecruiterComponent>) { }

  ngOnInit() {
    this.shortListedInfo = this.data
  }
  onClickClose()
  {
    this.dialogRef.close();
  }
}
