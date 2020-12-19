import { Component, OnInit, Inject } from '@angular/core';
import { PurchaseOrderRequest, CartItem } from '@models/cart';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { LazyCartService } from 'app/cart/http-service/lazy-cart.service';
import { SnackBarService } from '@services/common/snack-bar.service';
import { ConstantService } from '@services/common/constant-service.service';

@Component({
  selector: 'app-accept-quotation',
  templateUrl: './accept-quotation.component.html',
  styleUrls: ['./accept-quotation.component.css']
})
export class AcceptQuotationComponent implements OnInit {

  quotationMessage = new FormControl(null, [Validators.maxLength(500)])

  showError: boolean
  imageTypes: Array<string>
  allowedImageSize: number
  imageSizeError: boolean
  imageTypeError: boolean
  showButton: boolean = true
  selectedFile: File

  constructor(private dialogRef: MatDialogRef<AcceptQuotationComponent>,
    private cart: LazyCartService, @Inject(MAT_DIALOG_DATA) public data: CartItem,
    private snackBar: SnackBarService, constants: ConstantService) {
    this.imageTypes = constants.getDocumentFormats();
    this.allowedImageSize = constants.getMaxFileSize()
  }

  ngOnInit(): void {
    this.quotationMessage.valueChanges.subscribe(
      res => {
        if (this.quotationMessage.invalid) {
          this.showError = false
        }
      }
    )
  }

  send() {
    this.showButton = false
    this.showError = false

    if (this.selectedFile) {
      if (this.quotationMessage.valid) {
        this.sendQuotation()
      } else {
        this.showButton = true
      }
    } else {
      if (this.quotationMessage.valid && this.chekMessage()) {
        this.sendQuotation()
      } else {
        if (this.quotationMessage.valid) {
          this.showError = true
        }
        this.showButton = true
      }
    }
  }

  sendQuotation() {

    let purchaseReq = new PurchaseOrderRequest()
    purchaseReq.cartUuid = this.data.cartUuid
    let msg :string= this.quotationMessage.value
    if(msg != null){
      msg = msg.trim()
    }
    purchaseReq.commentMessage = msg

    let formData = new FormData();
    if (this.selectedFile) {
      formData.append("file", this.selectedFile)
    }

    formData.append("obj", JSON.stringify(purchaseReq))

    this.cart.acceptQuotation(formData).subscribe(
      res => {
        if (res.error) {

        } else {
          this.snackBar.open("Purchase Order Sent")
          this.dialogRef.close(res.data)
        }
      }
    )

  }

  close() {
    this.dialogRef.close()
  }

  onFileChanged(file: Array<File>) {

    this.imageTypeError = false
    this.imageSizeError = false
    this.showError = false

    if (this.imageTypes.indexOf(file[0].type) === -1) {
      this.imageTypeError = true
      return false
    } else if (file[0].size > this.allowedImageSize) {
      this.imageSizeError = true
      return false
    }
    this.selectedFile = file[0]
  }

  deleteImage() {
    this.selectedFile = undefined
  }

  chekMessage(): boolean {
    let message: string = this.quotationMessage.value

    if (message == null) {
      return false
    } else {
      message = message.trim();
      return message.length > 0;
    }

  }

}
