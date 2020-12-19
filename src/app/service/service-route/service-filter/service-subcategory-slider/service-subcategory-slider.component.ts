import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'environments/environment';
import { NguCarouselConfig } from '@ngu/carousel';
import { ServiceSubCategory, ServiceCategory } from '@models/service';

@Component({
  selector: 'app-service-subcategory-slider',
  templateUrl: './service-subcategory-slider.component.html',
  styleUrls: ['./service-subcategory-slider.component.css']
})
export class ServiceSubcategorySliderComponent implements OnInit {

  @Input()
  category:ServiceCategory
  contentServer:string = environment.CONTENT_SERVER

  carousel: NguCarouselConfig = {
    grid: { xs: 1, sm: 3, md: 5, lg: 6, all: 0 },
    slide:3,
    speed: 150,
    point: {
      visible: false
    },
    load: 6,
  }
  
  constructor() { }

  ngOnInit() {
    this.category.subCategories.sort((s1:ServiceSubCategory,s2:ServiceSubCategory) => {
      return s2.servicesCount - s1.servicesCount;
    })
  }

}
