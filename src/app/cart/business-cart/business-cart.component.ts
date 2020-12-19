import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '@services/cart/cart.service';
import { TokenService } from '@services/token/token.service';

@Component({
  selector: 'app-business-cart',
  templateUrl: './business-cart.component.html',
  styleUrls: ['./business-cart.component.css'],
})
export class BusinessCartComponent implements OnInit {

  sentCount: number
  receiveCount: number

  isNormalUser: boolean
  windowScrolled: boolean
  constructor(public token: TokenService, private router: Router,
    private cart: CartService) { }

  ngOnInit() {

    window.scrollTo(0, 0)

    this.cart.getSentCartCount().subscribe(
      res => {
        this.sentCount = +res.activeCount
      }
    )

    this.cart.getReceivedCartCount().subscribe(
      res => {
        this.receiveCount = +res.activeCount
      }
    )

    if (this.token.isNormalUser()) {
      this.isNormalUser = true
    }

  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (window.pageYOffset > 500) {
      this.windowScrolled = true;
    }
    else if (this.windowScrolled && window.pageYOffset < 50) {
      this.windowScrolled = false;
    }
  }

}
