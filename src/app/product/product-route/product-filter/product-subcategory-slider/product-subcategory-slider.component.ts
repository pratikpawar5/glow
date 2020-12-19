import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'environments/environment';
import { NguCarouselConfig } from '@ngu/carousel';
import { ProductCategory, ProductSubCategory } from '@models/product';

@Component({
  selector: 'app-product-subcategory-slider',
  templateUrl: './product-subcategory-slider.component.html',
  styleUrls: ['./product-subcategory-slider.component.css']
})
export class ProductSubcategorySliderComponent implements OnInit {
  
  @Input()
  category:ProductCategory
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
    this.category.subCategories.sort((s1:ProductSubCategory,s2:ProductSubCategory) => {
      return s2.productsCount - s1.productsCount;
    })
  }

}
