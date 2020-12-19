import { Component, OnInit } from '@angular/core';
import { PricingService } from '@services/pricing/pricing.service';
import { TokenService } from '@services/token/token.service';
import { UserPricing, CreditType, SelectedCreditType, PlanName } from '@models/pricing';
import { FileSizeFormatService } from '@services/common/file-size-format.service';
import { PageTitleService } from '@services/page-title/page-title.service';
import { BuyCreditsComponent } from 'app/shared/components/buy-credits/buy-credits.component';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
declare var ga: Function;
@Component({
  selector: 'app-business-credits',
  templateUrl: './business-credits.component.html',
  styleUrls: ['./business-credits.component.css'],
})
export class BusinessCreditsComponent implements OnInit {

  userPricing: UserPricing

  businessPost: CreditType = CreditType.BUSINESS_POST

  listing: CreditType = CreditType.PRODUCT_SERVICE_LISTING

  biRead: CreditType = CreditType.BUSINESS_INTEREST_VIEW

  connection: CreditType = CreditType.CIRCLE_CONNECTION

  imageStorage: CreditType = CreditType.IMAGE_STORAGE

  jobPost: CreditType = CreditType.JOB_POSTING

  bigPlan: PlanName = PlanName.BIG_BUSINESS

  showSpinner: boolean = true
  notFound: boolean

  constructor(private pricing: PricingService, private token: TokenService,
    public format: FileSizeFormatService, private dialog: DialogService,
    private title: PageTitleService, private matDialog: MatDialog, router: Router) {
    ga('set', 'page', router.url);
    ga('send', 'pageview');
  }

  ngOnInit() {
    this.title.updateTitle('Business Credits')
    this.getUserPricing()
  }

  getUserPricing() {
    this.pricing.userPricing().subscribe(
      res => {
        if (res.error) {
          this.showSpinner = false
          this.notFound = true
        } else {
          this.showSpinner = false
          this.userPricing = res.data
        }
      }
    )
  }

  buyMoreCredits(creditType: CreditType, displayName: string) {
    let type: SelectedCreditType = {
      creditType: creditType,
      displayName: displayName
    }
    let dialogRef = this.matDialog.open(BuyCreditsComponent, this.dialog.getBuyCreditsDialogConfig(type))

    dialogRef.afterClosed().subscribe(
      res => {
        if (res) {
          switch (res.type.creditType) {
            case this.businessPost: {
              this.userPricing.businessPosts = this.userPricing.businessPosts + res.credits
              this.userPricing.initialPricing.businessPosts = this.userPricing.initialPricing.businessPosts + res.credits
              break;
            }
            case this.biRead: {
              this.userPricing.biReadCredits = this.userPricing.biReadCredits + res.credits
              this.userPricing.initialPricing.biReadCredits = this.userPricing.initialPricing.biReadCredits + res.credits
              break;
            }
            case this.connection: {
              this.userPricing.connections = this.userPricing.connections + res.credits
              this.userPricing.initialPricing.connections = this.userPricing.initialPricing.connections + res.credits
              break;
            }
            case this.jobPost: {
              this.userPricing.jobPostings = this.userPricing.jobPostings + res.credits
              this.userPricing.initialPricing.jobPostings = this.userPricing.initialPricing.jobPostings + res.credits
              break;
            }
            case this.imageStorage: {
              this.userPricing.imageStorageSize = this.userPricing.imageStorageSize + res.credits
              this.userPricing.initialPricing.imageStorageSize = this.userPricing.initialPricing.imageStorageSize + res.credits
              break;
            }
            case this.listing: {
              this.userPricing.listings = this.userPricing.listings + res.credits
              this.userPricing.initialPricing.listings = this.userPricing.initialPricing.listings + res.credits
              break;
            }
            default: {
              break;
            }
          }

        }
      }
    )
  }

}
