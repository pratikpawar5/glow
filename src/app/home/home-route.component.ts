import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var ga: Function;

@Component({
  selector: 'app-home-route',
  templateUrl: './home-route.component.html',
  styleUrls: ['./home-route.component.css']
})
export class HomeRouteComponent implements OnInit {

  constructor(router: Router) {
    ga('set', 'page', router.url);
    ga('send', 'pageview');
  }

  ngOnInit() {
  }

}

