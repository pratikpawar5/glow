import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreditType, SelectedCreditType } from '@models/pricing';

@Component({
  selector: 'app-no-credits-left',
  templateUrl: './no-credits-left.component.html',
  styleUrls: ['./no-credits-left.component.css']
})
export class NoCreditsLeftComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: SelectedCreditType,
    private dialogRef: MatDialogRef<NoCreditsLeftComponent>, ) { }

  ngOnInit() {
  }

  proceed() {
    this.dialogRef.close(true)
  }

  close() {
    this.dialogRef.close()
  }
}
