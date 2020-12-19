import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'environments/environment';
import { TokenService } from '@services/token/token.service';
import { ItemType } from '@models/cart';
import { BusinessInterestService } from '@services/shared/business-interest.service';
import { AuthRouteComponent } from 'app/auth/auth-route/auth-route.component';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { MatDialog } from '@angular/material';
import { ProductResponse } from '@models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { Result } from '@models/filter';
import { SearchServiceService } from '@services/search/search-service.service';

@Component({
  selector: 'app-product-result',
  templateUrl: './product-result.component.html',
  styleUrls: ['./product-result.component.css']
})
export class ProductResultComponent implements OnInit {

  @Input()
  products: Result<ProductResponse>
  contentServer: string = environment.CONTENT_SERVER
  sUuid: string
  searchText: string

  asc: string = 'asc';
  desc: string = 'desc';
  popularity: string = 'popularity'
  newest: string = 'new'

  sortBy: string

  page = 0;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;

  showSpinner: boolean

  constructor(private bi: BusinessInterestService, private token: TokenService, private dialog: DialogService,
    private matDialog: MatDialog, private route: ActivatedRoute, private router: Router,
    private searchService: SearchServiceService) {
    route.queryParams.subscribe(
      res => {
        this.searchText = res['searchText']
        let s = res['sort']
        if (s === this.asc) {
          this.sortBy = this.asc
        } else if (s === this.desc) {
          this.sortBy = this.desc
        } else if (s === this.newest) {
          this.sortBy = this.newest
        } else {
          this.sortBy = this.popularity
        }
      }
    )
  }

  ngOnInit() {
    if (this.token.isLoggedIn()) {
      if (this.token.isSME()) {
        this.sUuid = this.token.getSmeId()
      }
    }
  }

  sort(sortBy: string) {
    this.router.navigate([], {
      queryParams: { sort: sortBy },
      queryParamsHandling: 'merge'
    })
  }

  onScrollDown() {

    if (this.products.result.length >= (this.page * 40)) {
      this.page++;
      this.searchService.getProductSearchResult(this.router.url.substring(1), this.page.toLocaleString()).subscribe(
        res => {
          if (res.error) {
            this.showSpinner = false
          } else {
            this.showSpinner = false
            this.products.result.push(...res.data.response.result)
          }
        }
      )
    }

  }

  businessInterest(uuid: string, index: number) {
    if (this.token.isLoggedIn()) {

      this.products.result[index].addedToCart = true
      this.bi.generate(uuid, this.products.result[index].minOrderQty, ItemType.PRODUCT, this.products.result[index].sUuid, false)

    } else {

      let ref = this.matDialog.open(AuthRouteComponent, this.dialog.loginConfig())
      ref.afterClosed().subscribe(
        res => {
          if (res) {
            this.products.result[index].addedToCart = true
            this.bi.generate(uuid, this.products.result[index].minOrderQty, ItemType.PRODUCT, this.products.result[index].sUuid, true)
          }
        }
      )

    }
  }
}
