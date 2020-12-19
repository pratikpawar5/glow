import { Component, OnInit } from '@angular/core';
import { NguCarouselConfig } from '@ngu/carousel';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  carousel: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
    slide: 1,
    speed: 400,
    interval: {
      timing: 3000,
      initialDelay: 1000,
    },
    point: {
      visible: false
    },
    loop: true,
    load: 2
  }

  src: string = '../.././../../assets/home-banner/';

  bannerImages: Array<string> = [
    this.src + 'Banner1.jpg',
  ]
  constructor() { }

  ngOnInit() {
  }

}
