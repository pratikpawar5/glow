import { Component, OnInit, Input } from '@angular/core';
import { TokenService } from '@services/token/token.service';
import { Product, ProductResponse } from '@models/product';
import { LazyProductService } from 'app/product/http-services/lazy-product.service';
import { environment } from 'environments/environment';
import { NguCarouselConfig } from '@ngu/carousel';
import { BusinessInterestService } from '@services/shared/business-interest.service';
import { ItemType } from '@models/cart';
import { AuthRouteComponent } from 'app/auth/auth-route/auth-route.component';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-similar-products',
  templateUrl: './similar-products.component.html',
  styleUrls: ['./similar-products.component.css']
})
export class SimilarProductsComponent implements OnInit {

  @Input()
  product: Product

  @Input()
  sUuid: string

  similarProducts: Array<ProductResponse>
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
  constructor(private token: TokenService, private productService: LazyProductService,
    private bi: BusinessInterestService, private dialog: DialogService, private matDialog: MatDialog) { }

  ngOnInit() {
    if (this.product.subCategory) {
      this.productService.similarProducts(this.product.subCategory.subCategoryUuid,
        this.product.productUuid).subscribe(
          res => {
            if (!res.error) {
              this.similarProducts = res.data
            }
          }
        )
    }
  }

  businessInterest(uuid: string, index: number) {
    if (this.token.isLoggedIn()) {

      this.similarProducts[index].addedToCart = true
      this.bi.generate(uuid, this.similarProducts[index].minOrderQty, ItemType.PRODUCT, this.similarProducts[index].sUuid, false)

    } else {

      let ref = this.matDialog.open(AuthRouteComponent, this.dialog.loginConfig())
      ref.afterClosed().subscribe(
        res => {
          if (res) {
            this.similarProducts[index].addedToCart = true
            this.bi.generate(uuid, this.similarProducts[index].minOrderQty, ItemType.PRODUCT, this.similarProducts[index].sUuid, true)
          }
        }
      )

    }

  }
}
