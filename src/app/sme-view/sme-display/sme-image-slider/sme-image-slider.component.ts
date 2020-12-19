import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'environments/environment';
import { NguCarouselConfig } from '@ngu/carousel';
import { SMEImage } from '@models/sme-image';

@Component({
  selector: 'app-sme-image-slider',
  templateUrl: './sme-image-slider.component.html',
  styleUrls: ['./sme-image-slider.component.css']
})
export class SmeImageSliderComponent implements OnInit {

  @Input()
  sliderImages: SMEImage[]
  contentServer: string = environment.CONTENT_SERVER
  carousel: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
    slide:1,
    speed: 400,
    interval:{
      timing:3000,
      initialDelay:1000,
    },
    point: {
      visible: false
    },
    loop: true,
    load: 2
  }
  constructor() { }

  ngOnInit() {
  }

}
