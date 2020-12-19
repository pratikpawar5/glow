import { Component, OnInit, Input } from '@angular/core';
import { ServiceCategory } from '@models/service';
import { environment } from 'environments/environment';
import { NguCarouselConfig } from '@ngu/carousel';

@Component({
  selector: 'app-slider-four',
  templateUrl: './slider-four.component.html',
  styleUrls: ['./slider-four.component.css']
})
export class SliderFourComponent implements OnInit {

  @Input()
  serviceCategories: Array<ServiceCategory>
  contentServer: string = environment.CONTENT_SERVER

  carousel: NguCarouselConfig = {
    grid: { xs: 1, sm: 3, md: 5, lg: 6, all: 0 },
    slide: 3,
    speed: 150,
    point: {
      visible: false
    },
    load: 6,
  }

  constructor() { }

  ngOnInit() {
    this.serviceCategories.forEach(c => {
      let count: number = 0;
      c.subCategories.forEach(s => count += s.servicesCount)
      c.servicesCount = count;
    })
    this.serviceCategories.sort((c1: ServiceCategory, c2: ServiceCategory) => {
      return c2.servicesCount - c1.servicesCount;
    })
  }

}
