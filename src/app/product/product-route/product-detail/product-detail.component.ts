import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '@services/token/token.service';
import { LazyProductService } from 'app/product/http-services/lazy-product.service';
import { Product } from '@models/product';
declare var ga: Function;
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  subcription$: Subscription
  product: Product
  sUuid: string
  showSpinner: boolean = true
  notFound: boolean

  constructor(private route: ActivatedRoute, private token: TokenService,
    private productService: LazyProductService, router: Router) {
    this.subcription$ = this.route.params.subscribe(
      params => {
        this.getProduct(params['productUuid'])
      }
    )
    ga('set', 'page', router.url);
    ga('send', 'pageview');
  }

  ngOnInit() {
  }

  getProduct(productUuid: string) {

    if (this.token.isLoggedIn()) {
      if(this.token.isSME()){
        this.sUuid = this.token.getSmeId()
      }
    }
    
    this.productService.productDetail(productUuid).subscribe(
      res => {
        if (res.error) {
          this.showSpinner = false
          this.notFound = true
        } else {
          this.product = res.data
          this.showSpinner = false
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.subcription$.unsubscribe()
  }
}
