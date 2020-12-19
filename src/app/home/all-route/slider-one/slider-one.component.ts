import { Component, OnInit, Input } from '@angular/core';
import { ProductResponse } from '@models/product';
import { environment } from 'environments/environment';
import { NguCarouselConfig } from '@ngu/carousel';
import { BusinessInterestService } from '@services/shared/business-interest.service';
import { ItemType } from '@models/cart';
import { TokenService } from '@services/token/token.service';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { MatDialog } from '@angular/material';
import { AuthRouteComponent } from 'app/auth/auth-route/auth-route.component';

@Component({
  selector: 'app-slider-one',
  templateUrl: './slider-one.component.html',
  styleUrls: ['./slider-one.component.css']
})
export class SliderOneComponent implements OnInit {

  @Input()
  products: Array<ProductResponse>

  @Input()
  sUuid: string

  contentServer: string = environment.CONTENT_SERVER

  carousel: NguCarouselConfig = {
    grid: { xs: 1, sm: 3, md: 5, lg: 6, all: 0 },
    slide: 3,
    speed: 150,
    point: {
      visible: false
    },
    load: 6,
  }

  constructor(private bi: BusinessInterestService, private token: TokenService,
    private dialog: DialogService, private matDialog: MatDialog) {
  }

  ngOnInit() {
  }

  businessInterest(itemUuid: string, index: number) {
    if (this.token.isLoggedIn()) {

      this.products[index].addedToCart = true
      this.bi.generate(itemUuid, this.products[index].minOrderQty, ItemType.PRODUCT, this.products[index].sUuid, false)

    } else {

      let ref = this.matDialog.open(AuthRouteComponent, this.dialog.loginConfig())
      ref.afterClosed().subscribe(
        res => {
          if (res) {
            this.bi.generate(itemUuid, this.products[index].minOrderQty, ItemType.PRODUCT, this.products[index].sUuid, true)
            this.products[index].addedToCart = true
          }
        }
      )

    }
  }


}
