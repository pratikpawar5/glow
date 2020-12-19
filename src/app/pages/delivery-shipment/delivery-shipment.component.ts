import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '@services/page-title/page-title.service';
import { Router } from '@angular/router';
declare var ga: Function;
@Component({
  selector: 'app-delivery-shipment',
  templateUrl: './delivery-shipment.component.html',
  styleUrls: ['./delivery-shipment.component.css']
})
export class DeliveryShipmentComponent implements OnInit {

  constructor(private title:PageTitleService,private router:Router) { 
    ga('set', 'page', router.url);
    ga('send', 'pageview');
  }

  ngOnInit() {
    window.scrollTo(0, 0)
    this.title.updateTitle('Delivery and Shipment')
    this.title.updateMetaTitle('Delivery and Shipment')
    this.title.updateMetaInfo('Gloqr Delivery and Shipment')
    this.title.updateMetaURL(this.router.url)
  }
}
