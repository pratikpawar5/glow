import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sme-reg-terms-condition',
  templateUrl: './sme-reg-terms-condition.component.html',
  styleUrls: ['./sme-reg-terms-condition.component.css']
})
export class SmeRegTermsConditionComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<SmeRegTermsConditionComponent>) {

  }
  ngOnInit() {

  }
  onClose() {
    this.dialogRef.close()

  }

}
