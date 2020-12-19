import { Injectable } from '@angular/core';
import { SnackBarService } from '@services/common/snack-bar.service';
import { ItemType, BusinessInterest } from '@models/cart';
import { TokenService } from '@services/token/token.service';
import { CartService } from '@services/cart/cart.service';

@Injectable({
  providedIn: 'root'
})
export class BusinessInterestService {

  constructor(private snakBar: SnackBarService, private token: TokenService,
    private cart: CartService) { }


  public generate(itemUuid: string, quantity: number, itemType: ItemType, sUuid: string, reload: boolean) {
    this.snakBar.open("Buisness Interest Generated")
    this.cart.generateBI(this.createObj(itemUuid, quantity, itemType, sUuid)).subscribe(
      res => {
        if (res.error) {
          if (res.code == 208) {
            this.snakBar.open("Already Added to Cart")
          }
          if (res.code == 406) {
            this.snakBar.open("You can't create interest on own product/service")
          }
          if (reload) {
            window.location.reload()
          }
        } else {
          this.cart.setCartCount(1)
          if (reload) {
            window.location.reload()
          }
        }
      }
    )
  }

  public createObj(itemUuid: string, quantity: number, itemType: ItemType, sUuid: string): BusinessInterest {

    let bi = new BusinessInterest()
    bi.userUuid = this.token.getUserId();
    bi.sUuid = sUuid;
    bi.itemUuid = itemUuid;
    bi.itemType = itemType
    bi.quantity = quantity

    return bi;
  }

}
