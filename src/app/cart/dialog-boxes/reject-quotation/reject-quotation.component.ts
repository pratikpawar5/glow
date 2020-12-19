import { Component, OnInit, Inject } from '@angular/core';
import { SecondStage, ReasonMessage, RejectRequest } from '@models/cart';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SnackBarService } from '@services/common/snack-bar.service';
import { LazyCartService } from 'app/cart/http-service/lazy-cart.service';
import { CartService } from '@services/cart/cart.service';

@Component({
  selector: 'app-reject-quotation',
  templateUrl: './reject-quotation.component.html',
  styleUrls: ['./reject-quotation.component.css']
})
export class RejectQuotationComponent implements OnInit {

  BIclosedReason = new FormControl(null, [Validators.required]);
  reasonControl = new FormControl(null, [Validators.maxLength(500)])
  reasons: ReasonMessage[] = [
    { id: 1, message: "I bought from other seller" },
    { id: 2, message: "Not interested now" },
    { id: 3, message: "other" }
  ]
  otherReasonTextBox: boolean

  showButton: boolean = true
  constructor(private dialogRef: MatDialogRef<RejectQuotationComponent>,
    private cart: LazyCartService, private snackBar: SnackBarService, private count: CartService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.BIclosedReason.valueChanges.subscribe(
      res => {
        if (res.id == 3) {
          this.otherReasonTextBox = true
        } else {
          this.rejectQuotation(res.message)
        }
      }
    )
  }

  otherMessage() {
    if (this.reasonControl.valid) {
      let msg: string = this.reasonControl.value

      if (msg == null || msg.trim().length == 0) {
        msg = "Other"
      } else {
        msg = msg.trim()
      }
      this.rejectQuotation(msg)
    }
  }

  rejectQuotation(message: string) {
    this.showButton = false

    let rejectReq = new RejectRequest();
    rejectReq.cartUuid = this.data.cartUuid
    rejectReq.rejectMessage = message

    this.cart.rejectQuotation(rejectReq).subscribe(
      res => {
        if (!res.error) {
          this.snackBar.open("Added to Rejected list")
          this.dialogRef.close(true)
        }
      }
    )
  }

  onClickNo() {
    this.dialogRef.close()
  }

}
