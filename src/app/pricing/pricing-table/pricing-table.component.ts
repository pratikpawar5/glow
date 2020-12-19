import { Component, OnInit } from '@angular/core';
import { PricingService } from '@services/pricing/pricing.service';
import { PricingTable, UserPricing, PlanName } from '@models/pricing';
import { FileSizeFormatService } from '@services/common/file-size-format.service';
import { TokenService } from '@services/token/token.service';
import { Router } from '@angular/router';
import { PaymentUtility } from '@models/payment';
import { PaymentService } from '@services/payment/payment.service';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { PageTitleService } from '@services/page-title/page-title.service';
import { MatDialog } from '@angular/material';
import { AuthRouteComponent } from 'app/auth/auth-route/auth-route.component';
declare var ga: Function;
@Component({
  selector: 'app-pricing-table',
  templateUrl: './pricing-table.component.html',
  styleUrls: ['./pricing-table.component.css']
})
export class PricingTableComponent implements OnInit {

  pricing: PricingTable
  userPricing: UserPricing
  showSpinner: boolean = true

  isLoggedIn: boolean
  isSME: boolean
  isNormalUser: boolean
  constructor(private pricingService: PricingService, public format: FileSizeFormatService,
    private token: TokenService, private router: Router, private title: PageTitleService,
    private payment: PaymentService, private dialog: DialogService,
    private matDialog: MatDialog) { 
      ga('set', 'page', router.url);
      ga('send', 'pageview');
    }

  ngOnInit() {
    this.title.updateTitle('Pricing')
    this.title.updateMetaTitle('Gloqr Pricing')
    this.title.updateMetaURL(this.router.url)
    this.title.updateMetaInfo('Pricing, Payment, Online Payment, Offline Payment,' +
      'Credits Types, Pricing Plans, Free Business, Small Business, Medium Business, Big Business')
    this.pricingService.pricingPlans().subscribe(
      res => {
        if (!res.error) {
          this.showSpinner = false
          this.pricing = res.data
        }
      }
    )
    this.token.checkLogin().subscribe(
      res => {
        this.isLoggedIn = res
        if (res) {
          if (this.token.isSME()) {
            this.isSME = true
            this.pricingService.userPricing().subscribe(
              res => {
                if (!res.error) {
                  this.userPricing = res.data
                }
              }
            )
          }
          if (this.token.isNormalUser()) {
            this.isNormalUser = true
          }
        } else {
          this.isNormalUser = false
          this.isSME = false
        }
      }
    )
  }

  buyNow(planName: PlanName) {

    if (this.isLoggedIn) {
      this.doAction(planName)
    } else {
      let ref = this.matDialog.open(AuthRouteComponent, this.dialog.signUpConfig())
      ref.afterClosed().subscribe(
        res => {
          if (res) {
            this.doAction(planName)
          }
        }
      )
    }
  }

  doAction(planName: PlanName) {

    if (this.isSME && planName !== PlanName.FREE_BUSINESS) {
      this.upgradePlan(planName)
    } else {
      if (this.isNormalUser && planName === PlanName.FREE_BUSINESS) {
        this.toSmeRegistraion();
      } else {
        this.redirectToPaymentPage(planName, PaymentUtility.NEW_PACKAGE, this.token.getUserId())
      }
    }

  }

  upgradePlan(planName: PlanName) {
    this.redirectToPaymentPage(planName, PaymentUtility.UPGRADE_PACKAGE, this.token.getSmeId())
  }

  redirectToPaymentPage(planName: PlanName, paymentUtility: PaymentUtility, id: string) {
    let encodedPlanName: string = btoa(planName)
    let encodedPaymentUtility: string = btoa(paymentUtility)
    this.router.navigate(['/pricing/make-payment'],
      { queryParams: { p: encodedPlanName, u: encodedPaymentUtility, s: id } })
  }

  toSmeRegistraion() {
    this.router.navigateByUrl('list-on-gloqr/first-step')
  }

}
