import { Component, OnInit, Input } from '@angular/core';
import { Product } from '@models/product';
import { FormControl, Validators } from '@angular/forms';
import { BusinessInterestService } from '@services/shared/business-interest.service';
import { ItemType } from '@models/cart';
import { TokenService } from '@services/token/token.service';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { MatDialog } from '@angular/material';
import { AuthRouteComponent } from 'app/auth/auth-route/auth-route.component';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {

  @Input()
  product: Product

  @Input()
  sUuid: string

  quantityControl = new FormControl(1, [Validators.required, Validators.pattern('[0-9]+'), Validators.min(1)]);
  disabled: boolean
  constructor(private bi: BusinessInterestService, private token: TokenService,
    private dialog: DialogService, private matDialog: MatDialog) { }

  ngOnInit() {
    this.quantityControl.setValue(this.product.minOrderQty)
    this.quantityControl.valueChanges.subscribe(
      value => {
        if (this.quantityControl.valid && value < this.product.minOrderQty) {
          this.quantityControl.setErrors({
            'minQty': true
          })
        }
      }
    )
  }

  addQuantity() {
    let quantity = this.quantityControl.value
    if (this.quantityControl.valid) {
      this.quantityControl.setValue(++quantity)
    } else {
      this.quantityControl.setValue(this.product.minOrderQty)
    }

  }

  minusQuantity() {
    let quantity = this.quantityControl.value
    if (this.quantityControl.valid) {
      this.quantityControl.setValue(--quantity)
    }
  }

  businessInterest(itemUuid: string) {
    if (this.quantityControl.valid) {

      if (this.token.isLoggedIn()) {

        this.product.addedToCart = true
        this.bi.generate(itemUuid, this.quantityControl.value, ItemType.PRODUCT, this.product.sUuid, false)

      } else {

        let ref = this.matDialog.open(AuthRouteComponent, this.dialog.loginConfig())
        ref.afterClosed().subscribe(
          res => {
            if (res) {
              this.product.addedToCart = true
              this.bi.generate(itemUuid, this.quantityControl.value, ItemType.PRODUCT, this.product.sUuid, true)
            }
          }
        )

      }

    }
  }

}
