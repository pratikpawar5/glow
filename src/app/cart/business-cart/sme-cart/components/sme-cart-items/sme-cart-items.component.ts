import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { environment } from 'environments/environment';
import { CartItem, CartState, FourthStage, Stage, CartFilterCount } from '@models/cart';
import { SelectedCreditType, CreditType } from '@models/pricing';
import { LazyCartService } from 'app/cart/http-service/lazy-cart.service';
import { PricingService } from '@services/pricing/pricing.service';
import { CreditsResponse } from '@models/payment';
import { SnackBarService } from '@services/common/snack-bar.service';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { NoCreditsLeftComponent } from 'app/shared/components/no-credits-left/no-credits-left.component';
import { BuyCreditsComponent } from 'app/shared/components/buy-credits/buy-credits.component';
import { CartService } from '@services/cart/cart.service';
import { AcceptOrderComponent } from 'app/cart/dialog-boxes/accept-order/accept-order.component';
import { RejectOrderComponent } from 'app/cart/dialog-boxes/reject-order/reject-order.component';
import { RejectPurchaseOrderComponent } from 'app/cart/dialog-boxes/reject-purchase-order/reject-purchase-order.component';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-sme-cart-items',
  templateUrl: './sme-cart-items.component.html',
  styleUrls: ['./sme-cart-items.component.css']
})
export class SmeCartItemsComponent implements OnInit {

  receivedItems: Array<CartItem>
  cartState: CartState = CartState.ACTIVE
  cartFilterCount: CartFilterCount

  creditsResponse: CreditsResponse

  contentServer: string = environment.CONTENT_SERVER

  page = 2;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;

  REJECTED = CartState.REJECTED
  ACTIVE = CartState.ACTIVE
  COMPLETED = CartState.COMPLETED
  AUTO_CLOSED = CartState.AUTO_CLOSED

  showSpinner: boolean
  emptyCart: boolean
  constructor(private matDialog: MatDialog, private router: Router,
    private pricing: PricingService, private cart: LazyCartService,
    private dialog: DialogService, private snackBar: SnackBarService,
    private count: CartService, route: ActivatedRoute) {
    route.queryParams.subscribe(
      res => {
        let s:string = res['by']

        if (s === this.REJECTED) {
          this.cartState = this.REJECTED
        } else if (s === this.COMPLETED) {
          this.cartState = this.COMPLETED
        } else {
          this.cartState = this.ACTIVE
        }
      }
    )
  }

  ngOnInit() {
    this.pricing.checkCredits(CreditType.BUSINESS_INTEREST_VIEW).subscribe(
      res => {
        if (res.error) {
          if (res.code === 402) {
            this.creditsResponse = {
              credits: 0,
              creditType: CreditType.BUSINESS_INTEREST_VIEW,
              displayName: res.errorResponse.typeDisplayName
            }
          }
        } else {
          this.creditsResponse = res.data;
        }
      }
    )
    this.getReceivedCartItems()
  }

  filterBy(cartState: CartState) {
    if(this.cartState !== cartState){
      this.cartState = cartState
      this.receivedItems = undefined
      this.router.navigate([], {
        queryParams: { by: this.cartState },
        queryParamsHandling: 'merge'
      })
      this.getReceivedCartItems()
    }
  }

  onScrollDown() {
    if (this.receivedItems && this.receivedItems.length > 9) {
      this.showSpinner = true
      this.cart.receivedCartItems(this.page++, this.cartState).subscribe(
        res => {
          this.showSpinner = false
          if (!res.error) {
            if (res.data.receivedItems) {
              this.receivedItems.push(...res.data.receivedItems)
            }
          }
        })
    }
  }

  getReceivedCartItems() {
    this.emptyCart = false
    this.showSpinner = true
    this.cart.receivedCartItems(1, this.cartState).subscribe(
      res => {
        this.showSpinner = false
        if (res.error) {
          this.emptyCart = true
        } else {
          this.receivedItems = res.data.receivedItems
          let sentCount: CartFilterCount = {
            activeCount: res.data.sentCount,
            deliveredCount: 0,
            rejectedCount: 0,
            activeGMV:0,
            rejectedGMV:0,
            deliveredGMV:0
          }
          this.count.setSentCartCount(sentCount)
          this.count.setReceivedCartCount(res.data.cartFilterCount)
          if (this.receivedItems === undefined) {
            this.emptyCart = true
          }
          this.cartFilterCount = res.data.cartFilterCount
        }
      },
      err => {
        this.emptyCart = true
        this.showSpinner = false
      }
    )
  }

  viewUserDetails(index: number) {
    this.receivedItems[index].spinner = true

    this.cart.viewUserDetails(this.receivedItems[index].cartUuid).subscribe(
      res => {
        this.receivedItems[index].spinner = false
        if (res.error) {
          if (res.code === 402) {
            this.noCredits(index)
          }
        } else {
          this.receivedItems[index].userDetails = res.data
          this.creditsResponse.credits = this.creditsResponse.credits - 1;
          this.snackBar.open(this.creditsResponse.credits + ' ' +
            this.creditsResponse.displayName + ' Credits left')
        }
      }
    )

  }

  noCredits(index: number) {
    let selectedCreditType: SelectedCreditType = {
      creditType: CreditType.BUSINESS_INTEREST_VIEW,
      displayName: this.creditsResponse.displayName
    }
    let ref = this.matDialog.open(NoCreditsLeftComponent,
      this.dialog.getNoCreditsDialogConfig(selectedCreditType))

    ref.afterClosed().subscribe(
      res => {
        if (res) {
          let ref = this.matDialog.open(BuyCreditsComponent, this.dialog.getBuyCreditsDialogConfig(selectedCreditType))
          ref.afterClosed().subscribe(
            res => {
              if (res) {
                this.creditsResponse.credits = this.creditsResponse.credits + res.credits;
                this.viewUserDetails(index)
              }
            }
          )
        }
      }
    )
  }

  buyCredits() {

    let selectedCreditType: SelectedCreditType = {
      creditType: CreditType.BUSINESS_INTEREST_VIEW,
      displayName: this.creditsResponse.displayName
    }
    let ref = this.matDialog.open(BuyCreditsComponent,
      this.dialog.getBuyCreditsDialogConfig(selectedCreditType))

    ref.afterClosed().subscribe(
      res => {
        if (res) {
          this.creditsResponse.credits = this.creditsResponse.credits + res.credits;
        }
      }
    )

  }

  acceptOrder(index: number) {
    let dialogConfig = this.getMatDialogConfig();
    dialogConfig.width = '600px';
    dialogConfig.data = this.receivedItems[index]

    let ref = this.matDialog.open(AcceptOrderComponent, dialogConfig);
    ref.afterClosed().subscribe(
      res => {
        if (res) {
          this.receivedItems[index].secondStage = res
        }
      }
    )
  }

  acceptPurchaseOrder(index: number) {
    this.cart.confirmOrder(this.receivedItems[index].cartUuid).subscribe(
      res => {
        if (!res.error) {
          this.snackBar.open("Order Delivered Successfully")
          let fourthStage = new FourthStage()
          fourthStage.status = Stage.DELIVERED

          this.receivedItems[index].fourthStage = new FourthStage()
          --this.cartFilterCount.activeCount
          ++this.cartFilterCount.deliveredCount
          this.cartFilterCount.activeGMV = this.cartFilterCount.activeGMV - this.receivedItems[index].itemData.orderTotal
          this.updateCartCount()
          this.receivedItems.splice(index, 1)
        }
      }
    )
  }

  rejectOrder(index: number) {
    let dialogConfig = this.getMatDialogConfig();
    dialogConfig.data = this.receivedItems[index]

    let ref = this.matDialog.open(RejectOrderComponent, dialogConfig)
    ref.afterClosed().subscribe(
      res => {
        if (res) {
          --this.cartFilterCount.activeCount
          ++this.cartFilterCount.rejectedCount
          this.cartFilterCount.activeGMV = this.cartFilterCount.activeGMV - this.receivedItems[index].itemData.orderTotal
          this.updateCartCount()
          this.receivedItems.splice(index, 1)
        }
      }
    )
  }

  rejectPurchaseOrder(index: number) {
    let dialogConfig = this.getMatDialogConfig();
    dialogConfig.data = this.receivedItems[index]

    let ref = this.matDialog.open(RejectPurchaseOrderComponent, dialogConfig)
    ref.afterClosed().subscribe(
      res => {
        if (res) {
          --this.cartFilterCount.activeCount
          ++this.cartFilterCount.rejectedCount
          this.cartFilterCount.activeGMV = this.cartFilterCount.activeGMV - this.receivedItems[index].itemData.orderTotal
          this.updateCartCount()
          this.receivedItems.splice(index, 1)
        }
      }
    )
  }

  updateCartCount() {
    this.count.decrementCartCount()
    this.count.setReceivedCartCount(this.cartFilterCount)
  }

  getMatDialogConfig(): MatDialogConfig {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px';
    dialogConfig.autoFocus = false;

    return dialogConfig;
  }


}
