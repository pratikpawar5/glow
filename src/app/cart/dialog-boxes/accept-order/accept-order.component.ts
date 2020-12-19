import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { QuotationType, CartItem, QuotationRequest } from '@models/cart';
import { environment } from 'environments/environment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LazyCartService } from 'app/cart/http-service/lazy-cart.service';
import { SnackBarService } from '@services/common/snack-bar.service';
import { ConstantService } from '@services/common/constant-service.service';

@Component({
  selector: 'app-accept-order',
  templateUrl: './accept-order.component.html',
  styleUrls: ['./accept-order.component.css']
})
export class AcceptOrderComponent implements OnInit {

  autoQuotation = QuotationType.AUTO
  manualQuotation = QuotationType.MANUAL

  quotationMessage = new FormControl(null, [Validators.maxLength(500)])
  quotationType = new FormControl(this.autoQuotation)
  imageTypes: Array<string>
  allowedImageSize: number
  imageSizeError: boolean
  imageTypeError: boolean
  selectedFile: File
  contentServer: string = environment.CONTENT_SERVER
  showError: boolean
  showButton: boolean = true
  spinner: boolean = false

  generatedQuotationFileLocation: string

  constructor(private dialogRef: MatDialogRef<AcceptOrderComponent>,
    private cart: LazyCartService, @Inject(MAT_DIALOG_DATA) public data: CartItem,
    private snackBar: SnackBarService, constants: ConstantService) {
    this.imageTypes = constants.getDocumentFormats()
    this.allowedImageSize = constants.getMaxFileSize()
  }

  ngOnInit() {
    this.quotationType.valueChanges.subscribe(
      res => this.showError = false
    )
    this.quotationMessage.valueChanges.subscribe(
      res => {
        if (this.quotationMessage.invalid) {
          this.showError = false
        }
      }
    )
  }

  acceptOrder() {
    this.showError = false
    this.showButton = false

    let formData = new FormData();

    if (this.quotationType.value === this.manualQuotation) {
      this.sendManualQuotation(formData)
    } else {
      if (this.quotationMessage.valid) {
        this.sendQuotation(formData)
      } else {
        this.showButton = true
      }
    }

  }

  sendManualQuotation(formData: FormData) {

    if (this.selectedFile) {
      if (this.quotationMessage.valid) {
        this.sendQuotation(formData)
      } else {
        this.showButton = true
      }
    } else {
      if (this.quotationMessage.valid && this.chekMessage()) {
        this.sendQuotation(formData)
      } else {
        if (this.quotationMessage.valid) {
          this.showError = true
        }
        this.showButton = true
      }
    }

  }

  getQuotationRequestObj(): QuotationRequest {
    let req: QuotationRequest = new QuotationRequest();
    req.cartUuid = this.data.cartUuid
    req.quotationType = this.quotationType.value
    let msg: string = this.quotationMessage.value
    if (msg != null) {
      msg = msg.trim()
    }
    req.commentMessage = msg

    return req;
  }

  sendQuotation(formData: FormData) {

    let quotation = this.getQuotationRequestObj()
    if (this.quotationType.value === this.manualQuotation) {
      formData.append("file", this.selectedFile)
    } else {
      quotation.fileLocation = this.generatedQuotationFileLocation
    }

    formData.append("obj", JSON.stringify(quotation))

    this.cart.acceptOrder(formData).subscribe(
      res => {
        if (res.error) {
          this.showButton = true
        } else {
          this.snackBar.open("Quotation sent successfully")
          this.dialogRef.close(res.data)
        }
      }
    )
  }

  generateQuotation() {
    if (this.generatedQuotationFileLocation) {
      this.openQuotationFile()
    } else {
      this.spinner = true
      this.cart.generateQuotation(this.data.cartUuid).subscribe(
        res => {
          this.spinner = false
          if (!res.error) {
            this.generatedQuotationFileLocation = res.data.fileLocation
            this.openQuotationFile()
          }
        }
      )
    }
  }

  openQuotationFile() {
    window.open(this.contentServer + this.generatedQuotationFileLocation, '_blank')
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

  close() {
    this.dialogRef.close()
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
