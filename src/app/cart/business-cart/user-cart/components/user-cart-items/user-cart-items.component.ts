import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CartItem, CartState, CartFilterCount } from '@models/cart';
import { environment } from 'environments/environment';
import { CartService } from '@services/cart/cart.service';
import { AcceptQuotationComponent } from 'app/cart/dialog-boxes/accept-quotation/accept-quotation.component';
import { RejectQuotationComponent } from 'app/cart/dialog-boxes/reject-quotation/reject-quotation.component';
import { LazyCartService } from 'app/cart/http-service/lazy-cart.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-user-cart-items',
  templateUrl: './user-cart-items.component.html',
  styleUrls: ['./user-cart-items.component.css']
})
export class UserCartItemsComponent implements OnInit {

  sentItems: Array<CartItem>
  cartState: CartState = CartState.ACTIVE
  cartFilterCount: CartFilterCount

  contentServer: string = environment.CONTENT_SERVER

  page = 2;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;

  REJECTED = CartState.REJECTED
  ACTIVE = CartState.ACTIVE
  COMPLETED = CartState.COMPLETED

  showSpinner: boolean
  emptyCart: boolean

  constructor(private matDialog: MatDialog, private router: Router,
    route: ActivatedRoute, private cart: LazyCartService, private count: CartService) {
    // route.queryParams.subscribe(
    //   res => {
    //     let s: string = res['by']

    //     if (s === this.REJECTED) {
    //       this.cartState = this.REJECTED
    //     } else if (s === this.COMPLETED) {
    //       this.cartState = this.COMPLETED
    //     } else {
    //       this.cartState = this.ACTIVE
    //     }
    //   }
    // )
  }

  ngOnInit() {
    this.getSentCartItems()
  }

  filterBy(cartState: CartState) {
    if (this.cartState !== cartState) {
      this.cartState = cartState
      this.sentItems = undefined
      // this.router.navigate([], {
      //   queryParams: { by: this.cartState },
      //   queryParamsHandling: 'merge'
      // })
      this.getSentCartItems()
    }
  }

  onScrollDown() {
    if (this.sentItems && this.sentItems.length > 9) {
      this.showSpinner = true
      this.cart.sentCartItems(this.page++, this.cartState).subscribe(
        res => {
          this.showSpinner = false
          if (!res.error) {
            if (res.data.sentItems) {
              this.sentItems.push(...res.data.sentItems)
            }
          }
        })
    }
  }

  getSentCartItems() {
    this.emptyCart = false
    this.showSpinner = true
    this.cart.sentCartItems(1, this.cartState).subscribe(
      res => {
        this.showSpinner = false
        if (res.error) {
          this.emptyCart = true
        } else {
          this.sentItems = res.data.sentItems
          let receivedCount: CartFilterCount = {
            activeCount: res.data.receivedCount,
            deliveredCount: 0,
            rejectedCount: 0,
            activeGMV: 0,
            rejectedGMV: 0,
            deliveredGMV: 0
          }
          this.count.setSentCartCount(res.data.cartFilterCount)
          this.count.setReceivedCartCount(receivedCount)
          if (this.sentItems === undefined) {
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

  acceptQuotation(index: number) {
    let dialogConfig = this.getMatDialogConfig();
    dialogConfig.width = '600px';
    dialogConfig.data = this.sentItems[index]

    let ref = this.matDialog.open(AcceptQuotationComponent, dialogConfig);
    ref.afterClosed().subscribe(
      res => {
        if (res) {
          this.sentItems[index].thirdStage = res
        }
      }
    )
  }

  rejectQuotation(index: number) {
    let dialogConfig = this.getMatDialogConfig();
    dialogConfig.data = this.sentItems[index]

    let ref = this.matDialog.open(RejectQuotationComponent, dialogConfig)
    ref.afterClosed().subscribe(
      res => {
        if (res) {
          this.sentItems.splice(index, 1)
          --this.cartFilterCount.activeCount
          ++this.cartFilterCount.rejectedCount
          this.updateCartCount()
        }
      }
    )
  }

  getMatDialogConfig(): MatDialogConfig {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px';
    dialogConfig.autoFocus = false;

    return dialogConfig;
  }

  updateCartCount() {
    this.count.decrementCartCount()
    this.count.setSentCartCount(this.cartFilterCount)
  }

}
