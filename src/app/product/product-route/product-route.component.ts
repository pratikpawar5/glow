import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-product-route',
  templateUrl: './product-route.component.html',
  styleUrls: ['./product-route.component.css']
})
export class ProductRouteComponent implements OnInit {

  windowScrolled: boolean
  constructor() { }

  ngOnInit() {
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
