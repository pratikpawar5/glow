import { Component, OnInit } from '@angular/core';
import { CartItem, CartState, CartFilterCount } from '@models/cart';
import { TokenService } from '@services/token/token.service';
import { PageTitleService } from '@services/page-title/page-title.service';
import { CartService } from '@services/cart/cart.service';
import { LazyCartService } from 'app/cart/http-service/lazy-cart.service';
import { Router } from '@angular/router';
declare var ga: Function;
@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {

  isNormalUser: boolean
  sentCount: number

  constructor(public token: TokenService, private lazyCart: LazyCartService,
    private title: PageTitleService, private cart: CartService,router:Router) { 
      ga('set', 'page', router.url);
      ga('send', 'pageview');
    }

  ngOnInit() {
    this.title.updateMetaTitle('Cart')
    this.title.updateMetaInfo('Cart, Sent Items, Shopping Cart, User Cart')
    this.title.updateTitle('Cart')
    this.title.updateMetaURL('cart')

    this.cart.getSentCartCount().subscribe(
      res => this.sentCount = res.activeCount
    )

    if (this.token.isNormalUser()) {
      this.isNormalUser = true
    }
  }
}
