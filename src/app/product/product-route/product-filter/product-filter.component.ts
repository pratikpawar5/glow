import { Component, OnInit, HostListener } from '@angular/core';
import { FilterResult } from '@models/filter';
import { ProductResponse } from '@models/product';
import { Subscription } from 'rxjs';
import { LazyProductService } from 'app/product/http-services/lazy-product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenService } from '@services/token/token.service';
declare var ga: Function;
@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  filterResult: FilterResult<ProductResponse>
  subscription$: Subscription

  showSpinner: boolean = false
  notFound: boolean

  constructor(private service: LazyProductService, router: Router, route: ActivatedRoute,
    private token: TokenService) {
      route.queryParams.subscribe(
        res => {
          this.getResult(router.url)
        }
      )
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  getResult(url: string) {
    this.showSpinner = true
    this.notFound = false
    this.filterResult = undefined

    this.service.productsByCategory(url, "0").subscribe(
      res => {
        if (res.error) {
          this.showSpinner = false
          this.notFound = true
        } else {
          this.showSpinner = false
          this.filterResult = res.data
        }
      },
      err => {
        this.showSpinner = false
        this.notFound = true
      }
    )

  }

}
