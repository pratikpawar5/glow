import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.css']
})
export class PaymentInfoComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private router: Router,
    private dialogRef: MatDialogRef<PaymentInfoComponent>) { }

  ngOnInit() {
  }

  continue() {
    this.dialogRef.close(true)
  }

  close() {
    this.dialogRef.close()
  }

}
