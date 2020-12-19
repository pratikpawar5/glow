import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreditType, CreditsCosting, SelectedCreditType } from '@models/pricing';
import { FormControl, Validators } from '@angular/forms';
import { PaymentService } from '@services/payment/payment.service';
import { debounceTime } from 'rxjs/operators';
import { PaymentRequest, PaymentUtility, CreatePayment, CapturePayment } from '@models/payment';
import { TokenService } from '@services/token/token.service';
import { FileSizeFormatService } from '@services/common/file-size-format.service';

declare var Razorpay: any;

@Component({
  selector: 'app-buy-credits',
  templateUrl: './buy-credits.component.html',
  styleUrls: ['./buy-credits.component.css']
})
export class BuyCreditsComponent implements OnInit {

  loadAPI: Promise<any>;
  credits = new FormControl(1, [Validators.required, Validators.pattern('[0-9]+'), Validators.min(1)])

  buyCredits: boolean = true
  showBuyButton: boolean = true
  success: boolean
  error: boolean
  showSpinner: boolean
  amountExceeded:boolean

  imageStorage: CreditType = CreditType.IMAGE_STORAGE

  creditCosting: CreditsCosting
  constructor(private dialogRef: MatDialogRef<BuyCreditsComponent>, private payment: PaymentService,
    @Inject(MAT_DIALOG_DATA) public data: SelectedCreditType, private token: TokenService,
    private ref: ChangeDetectorRef, private format: FileSizeFormatService) {
    this.loadAPI = new Promise((resolve) => {
      this.getTotalPrice(this.credits.value);
      this.loadScript();
      resolve(true);
    });
  }

  ngOnInit() {
    this.credits.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(
      res => {
        if (this.credits.valid) {
          if (res <= 9999 && res > 0) {
            this.getTotalPrice(res)
          }
        }
      }
    )
  }

  getTotalPrice(credits: number) {
    this.payment.creditsPrice(credits.toString(), this.data.creditType).subscribe(
      res => {
        if (res.error) {
          this.buyCredits = false
          this.error = true
        } else {
          this.creditCosting = res.data
          if(res.data.totalPrice > 500000){
            this.amountExceeded = true
          }else{
            this.amountExceeded = false
          }
          this.error = false
        }
      }
    )
  }

  getPaymentDetails() {
    let request = new PaymentRequest()
    request.sUuid = this.token.getSmeId()
    request.userUUID = this.token.getUserId()
    request.creditType = this.data.creditType
    request.credits = this.creditCosting.credits
    request.paymentUtility = PaymentUtility.BUSINESS_CREDITS

    return this.payment.createPayment(request)
  }

  buy() {
    if (this.credits.valid) {
      this.showBuyButton = false
      this.amountExceeded = false;
      let createPayment: CreatePayment
      this.getPaymentDetails().subscribe(res => {
        if (res.error) {
          if(res.code === 406){
            this.amountExceeded = true;
            this.credits.setErrors({
              'amountExceed':true
            })
          }else{
            this.error = true
            this.buyCredits = false
          }
        } else {
          if (res.code === 201) {
            createPayment = res.data
            createPayment.order_id = res.data.orderID
            createPayment.handler = this.capturePayment.bind(this)
            var rzp1 = new Razorpay(createPayment);
            rzp1.open()
          }
        }
        this.showBuyButton = true
      })
    }
  }

  capturePayment(response: any) {
    this.buyCredits = false
    this.showSpinner = true
    this.ref.detectChanges()
    if (response.razorpay_payment_id) {
      let capturePayment = new CapturePayment();
      capturePayment.razorpayOrderID = response.razorpay_order_id
      capturePayment.razorpayPaymentID = response.razorpay_payment_id
      capturePayment.razorpaySignature = response.razorpay_signature

      this.payment.capturePayment(capturePayment).subscribe(
        res => {
          if (res.error) {
            this.error = true
          } else {
            if (res.code == 201) {
              this.showSpinner = false
              this.success = true
            }
          }
          // do not remove this
          this.dialogRef.close()
          this.ref.detectChanges()
        }
      )
    }
  }

  ok() {
    let credits: number
    if (this.data.creditType === this.imageStorage) {
      credits = this.format.mbToBytes(this.creditCosting.credits)
    } else {
      credits = this.creditCosting.credits
    }
    let data = {
      type: this.data,
      credits: credits
    }
    this.dialogRef.close(data)
  }

  add() {
    if (this.credits.valid) {
      let credits: number = this.credits.value;
      if (credits < 9999 && credits >= 0) {
        this.credits.setValue(++credits)
      }
    } else {
      this.credits.setValue(1)
    }
  }

  minus() {
    if (this.credits.valid) {
      let credits: number = this.credits.value;
      if (credits === 0) {
        this.credits.setValue(1)
      } else {
        this.credits.setValue(--credits)
      }
    }
  }

  close() {
    this.dialogRef.close()
  }

  public loadScript() {
    var isFound = false;
    var scripts = document.getElementsByTagName("script")
    for (var i = 0; i < scripts.length; ++i) {
      if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("loader")) {
        isFound = true;
      }
    }

    if (!isFound) {
      var dynamicScripts = ["https://checkout.razorpay.com/v1/checkout.js"];

      for (var i = 0; i < dynamicScripts.length; i++) {
        let node = document.createElement('script');
        node.src = dynamicScripts[i];
        node.type = 'text/javascript';
        node.async = false;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
      }

    }
  }



}
