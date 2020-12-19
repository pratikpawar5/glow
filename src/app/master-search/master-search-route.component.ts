import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-master-search-route',
  templateUrl: './master-search-route.component.html',
  styleUrls: ['./master-search-route.component.css']
})
export class MasterSearchRouteComponent implements OnInit {
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
