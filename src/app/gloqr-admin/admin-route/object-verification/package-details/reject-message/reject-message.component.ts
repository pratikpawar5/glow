import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { VerifiedPayment } from '@models/payment';
import { SnackBarService } from '@services/common/snack-bar.service';
import { GloqrAdminService } from 'app/gloqr-admin/gloqr-admin-services/gloqr-admin.service';

@Component({
  selector: 'app-reject-message',
  templateUrl: './reject-message.component.html',
  styleUrls: ['./reject-message.component.css']
})
export class RejectMessageComponent implements OnInit {

  feedbackMessage = new FormControl(null, [Validators.required, Validators.maxLength(255)]);

  constructor(private dialogRef: MatDialogRef<RejectMessageComponent>,
    private snackBar: SnackBarService, @Inject(MAT_DIALOG_DATA) public data: any,
    private gloqrAdminService: GloqrAdminService) {
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  reject() {
    if (this.feedbackMessage.valid) {
      let verifiedPayment = new VerifiedPayment();
      verifiedPayment.offlinePaymentUuid = this.data.payment.offlinePaymentUuid
      verifiedPayment.sUuid = this.data.sUuid
      verifiedPayment.verified = false
      verifiedPayment.rejectReason = this.feedbackMessage.value

      this.gloqrAdminService.verifyPlan(verifiedPayment).subscribe(
        res => {
          if (res.error) {
            this.dialogRef.close()
          }
          else {
            this.snackBar.open("Rejected Successfully")
            this.dialogRef.close(this.feedbackMessage.value)
          }
        }
      )
    }

  }
}
