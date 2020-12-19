import { Component, OnInit, Input } from '@angular/core';
import { ProductCategory } from '@models/product';
import { environment } from 'environments/environment';
import { NguCarouselConfig } from '@ngu/carousel';

@Component({
  selector: 'app-slider-three',
  templateUrl: './slider-three.component.html',
  styleUrls: ['./slider-three.component.css']
})
export class SliderThreeComponent implements OnInit {

  @Input()
  productCategories: Array<ProductCategory>
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

  constructor() {

  }

  ngOnInit() {
    this.productCategories.forEach(c => {
      let count: number = 0;
      c.subCategories.forEach(s => count += s.productsCount)
      c.productsCount = count;
    })
    this.productCategories.sort((c1:ProductCategory,c2:ProductCategory)=>{
      return c2.productsCount - c1.productsCount;
    })
  }

}
