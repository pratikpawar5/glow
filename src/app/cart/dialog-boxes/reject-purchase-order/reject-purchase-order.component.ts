import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SnackBarService } from '@services/common/snack-bar.service';
import { LazyCartService } from 'app/cart/http-service/lazy-cart.service';
import { Validators, FormControl } from '@angular/forms';
import { ReasonMessage, RejectRequest, CartItem } from '@models/cart';

@Component({
  selector: 'app-reject-purchase-order',
  templateUrl: './reject-purchase-order.component.html',
  styleUrls: ['./reject-purchase-order.component.css']
})
export class RejectPurchaseOrderComponent implements OnInit {

  BIclosedReason = new FormControl(null, [Validators.required]);
  reasons: ReasonMessage[] = [
    { id: 1, message: "Short By Quantity" },
    { id: 2, message: "Area not served" },
    { id: 3, message: "other" }
  ]
  otherReasonTextBox: boolean
  reasonControl = new FormControl(null, [Validators.maxLength(500)])
  showButton: boolean = true
  constructor(private dialogRef: MatDialogRef<RejectPurchaseOrderComponent>,
    private cart: LazyCartService, @Inject(MAT_DIALOG_DATA) public data: CartItem,
    private snackBar: SnackBarService) { }

  ngOnInit(): void {
    this.BIclosedReason.valueChanges.subscribe(
      res => {
        if (res.id == 3) {
          this.otherReasonTextBox = true
        } else {
          this.rejectOrder(res.message)
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

      this.rejectOrder(msg)
    }
  }

  rejectOrder(message: string) {
    this.showButton = false

    let rejectReq = new RejectRequest();
    rejectReq.cartUuid = this.data.cartUuid
    rejectReq.rejectMessage = message

    this.cart.rejectPurchaseOrder(rejectReq).subscribe(
      res => {
        if (!res.error) {
          this.snackBar.open("Added to Rejected list")
          this.dialogRef.close(true)
        }
      }
    )
  }


  close() {
    this.dialogRef.close()
  }

}
