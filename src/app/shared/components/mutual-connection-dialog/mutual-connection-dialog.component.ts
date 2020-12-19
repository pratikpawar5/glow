import { Component, OnInit, Inject } from '@angular/core';
import { environment } from 'environments/environment.prod';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mutual-connection-dialog',
  templateUrl: './mutual-connection-dialog.component.html',
  styleUrls: ['./mutual-connection-dialog.component.css']
})
export class MutualConnectionDialogComponent implements OnInit {

  contentServer: string = environment.CONTENT_SERVER
  
  constructor(private dialogRef: MatDialogRef<MutualConnectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, ) {
  }
  ngOnInit() {
  }
  onClickNo() {
    this.dialogRef.close()
  }

  close() {
    this.dialogRef.close()
  }

}
