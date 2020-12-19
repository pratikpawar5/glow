import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-service-route',
  templateUrl: './service-route.component.html',
  styleUrls: ['./service-route.component.css']
})
export class ServiceRouteComponent implements OnInit {

  constructor() { }
  windowScrolled: boolean
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
