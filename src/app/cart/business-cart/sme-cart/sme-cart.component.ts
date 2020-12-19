import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '@services/page-title/page-title.service';
import { Router } from '@angular/router';
declare var ga: Function;
@Component({
  selector: 'app-sme-cart',
  templateUrl: './sme-cart.component.html',
  styleUrls: ['./sme-cart.component.css']
}) export class SmeCartComponent implements OnInit {

  constructor(private title: PageTitleService,router:Router) { 
    ga('set', 'page', router.url);
    ga('send', 'pageview');
  }

  ngOnInit() {
    this.title.updateTitle('Cart | Received')
    this.title.updateMetaTitle('Cart | Received')
    this.title.updateMetaInfo('Cart, Received Items, Shopping Cart, SME Cart')
    this.title.updateMetaURL('cart/received')
  }

}
