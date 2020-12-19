import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { TokenService } from '@services/token/token.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PlanName, UserPricing } from '@models/pricing';
import { PaymentUtility, PlanCosting, CreatePayment, CapturePayment, PaymentRequest, OfflinePayment } from '@models/payment';
import { PricingService } from '@services/pricing/pricing.service';
import { FileSizeFormatService } from '@services/common/file-size-format.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConstantService } from '@services/common/constant-service.service';
import { PaymentService } from '@services/payment/payment.service';
import { MatDialog } from '@angular/material';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { PaymentInfoComponent } from 'app/shared/components/payment-info/payment-info.component';
declare var ga: Function;
declare var Razorpay: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, OnDestroy {

  isLoggedIn: boolean
  isNormalUser: boolean
  isSME: boolean

  paymentForm: FormGroup
  showSpinner: boolean
  onlinePaymentBtn: boolean = true
  offlinePaymentBtn: boolean = true

  selectedFile: File
  imageTypes: Array<string>
  allowedImageSize: number
  imageSizeError: boolean
  imageTypeError: boolean

  success: boolean

  subcription$: Subscription
  planCosting: PlanCosting
  planName: PlanName
  paymentUtility: PaymentUtility
  userPricing: UserPricing
  loadAPI: Promise<any>;
  constructor(private route: ActivatedRoute, private token: TokenService, private pricing: PricingService,
    public format: FileSizeFormatService, private formBuilder: FormBuilder, constants: ConstantService,
    private payment: PaymentService, private ref: ChangeDetectorRef, private router: Router,
    private matDialog: MatDialog, private dialog: DialogService) {
    this.subcription$ = this.route.queryParams.subscribe(
      params => {
        if (params['p'] && params['u']) {
          this.planName = <PlanName>atob(params['p'])
          this.paymentUtility = <PaymentUtility>atob(params['u'])
        }
      }
      
    )
    ga('set', 'page', router.url);
    ga('send', 'pageview');
    this.imageTypes = constants.getDocumentFormats()
    this.allowedImageSize = constants.getMaxFileSize()
    this.loadAPI = new Promise((resolve) => {
      this.loadScript();
      resolve(true);
    });
  }

  ngOnInit() {
    window.scrollTo(0, 0)
    this.getPlanCosting()

    this.paymentForm = this.formBuilder.group({
      paymentMethod: new FormControl('Online'),
      paymentMode: new FormControl('CHEQUE'),
      bankName: new FormControl(null, [Validators.pattern('^[a-zA-Z ]*$'), Validators.maxLength(100)]),
      branchName: new FormControl(null, [Validators.maxLength(50)]),
      transactionNumber: new FormControl(null, [Validators.maxLength(50)]),
      transactionDate: new FormControl(null),
      amount: new FormControl(null, [Validators.pattern('^[0-9.]*$'), Validators.maxLength(15)]),
      message: new FormControl(null, [Validators.maxLength(500)]),
      userUUID: new FormControl(this.token.getUserId())
    })
    this.paymentForm.controls['amount'].disable()
  }

  ngOnDestroy(): void {
    this.subcription$.unsubscribe()
  }

  buyOnline() {
    this.onlinePaymentBtn = false
    let createPayment: CreatePayment

    this.getPaymentDetails().subscribe(res => {
      if (res.error) {
        this.onlinePaymentBtn = false
      } else {
        createPayment = res.data
        createPayment.order_id = res.data.orderID
        createPayment.handler = this.capturePayment.bind(this)
        var rzp1 = new Razorpay(createPayment);
        rzp1.open()
        this.onlinePaymentBtn = true
      }
    }
    )
  }

  capturePayment(response: any) {
    if (response.razorpay_payment_id) {
      this.showSpinner = true
      this.ref.detectChanges()
      let capturePayment = new CapturePayment();
      capturePayment.razorpayOrderID = response.razorpay_order_id
      capturePayment.razorpayPaymentID = response.razorpay_payment_id
      capturePayment.razorpaySignature = response.razorpay_signature
      this.payment.capturePayment(capturePayment).subscribe(
        res => {
          if (!res.error) {
            if (res.code === 201) {
              this.showSpinner = false
              this.success = true
              this.ref.detectChanges()
              if (this.paymentUtility === PaymentUtility.NEW_PACKAGE) {
                this.navigateToForm()
              }
            }
          }
        }
      )
    }
  }

  getPaymentDetails() {
    let request = new PaymentRequest()
    request.userUUID = this.token.getUserId()
    request.paymentUtility = this.paymentUtility
    request.planName = this.planName
    if (this.token.isSME()) {
      request.sUuid = this.token.getSmeId()
    }

    return this.payment.createPayment(request)
  }

  getPlanCosting() {
    if (this.planName && this.paymentUtility && this.planName !== PlanName.FREE_BUSINESS) {
      let request: PaymentRequest = new PaymentRequest()
      request.paymentUtility = this.paymentUtility
      request.planName = this.planName
      request.userUUID = this.token.getUserId()
      if (this.token.isSME()) {
        request.sUuid = this.token.getSmeId()
        request.paymentUtility = PaymentUtility.UPGRADE_PACKAGE
      }

      this.pricing.planCosting(request).subscribe(
        res => {
          if (res.error) {
            if (res.code === 208) {
              this.router.navigateByUrl('list-on-gloqr/first-step')
            }
            if (res.code === 406) {
              this.navigateToPricing()
            }
          } else {
            this.userPricing = res.data.userPricing
            this.planCosting = res.data.planCosting
            this.paymentForm.controls['amount'].setValue(this.planCosting.totalPayableAmount)
          }
        },
        err => {
          this.navigateToPricing()
        }
      )
    } else {
      this.navigateToPricing()
    }
  }

  onProceed() {
    if (this.paymentForm.valid) {
      this.offlinePaymentBtn = false
      let formData = new FormData()
      formData.append('offlinePaymentData', JSON.stringify(this.getOfflinePaymentObj()))
      formData.append('file', this.selectedFile)
      this.payment.createOfflinePayment(formData).subscribe(
        res => {
          if (res.error) {
            this.offlinePaymentBtn = true
          } else {
            let data = {
              message: res.data.message,
              firstPayment: false,
              homePage:true
            }
            if (this.paymentUtility === PaymentUtility.NEW_PACKAGE) {
              data.firstPayment = true
            }

            let ref = this.matDialog.open(PaymentInfoComponent, this.dialog.getPaymentInfoConfig(data))
            ref.afterClosed().subscribe(
              res => {
                if (res) {
                  if (this.paymentUtility === PaymentUtility.NEW_PACKAGE) {
                    this.router.navigateByUrl('list-on-gloqr/first-step')
                  }
                }else{
                  this.navigateToPricing()
                }
              }
            )
            this.offlinePaymentBtn = true
          }
        }
      )
    }
  }

  getOfflinePaymentObj(): OfflinePayment {
    let offlinePayment = new OfflinePayment();
    offlinePayment = this.paymentForm.value
    offlinePayment.planName = this.planName
    offlinePayment.planCost = this.planCosting.totalPayableAmount
    offlinePayment.paymentUtility = this.paymentUtility
    offlinePayment.amount = this.paymentForm.controls['amount'].value

    return offlinePayment;
  }

  onFileChanged(file: Array<File>) {
    this.imageTypeError = false
    this.imageSizeError = false

    if (this.imageTypes.indexOf(file[0].type) === -1) {
      this.imageTypeError = true
      return false
    } else if (file[0].size > this.allowedImageSize) {
      this.imageSizeError = true
      return false
    }
    this.selectedFile = file[0]
  }

  navigateToForm() {
    this.router.navigateByUrl('list-on-gloqr/first-step')
    window.location.reload()
  }

  navigateToPricing() {
    this.router.navigateByUrl('/pricing')
  }

  deleteImage() {
    this.selectedFile = undefined
  }

  changeMethod() {
    this.paymentForm.controls['paymentMethod'].setValue('Offline')
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
