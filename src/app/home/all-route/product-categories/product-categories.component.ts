import { Component, OnInit } from '@angular/core';
import { NguCarouselConfig } from '@ngu/carousel';
import { ProductCategory, ProductSubCategory } from '@models/product';
import { environment } from 'environments/environment';
import { HomeService } from '@services/home/home.service';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.css']
})
export class ProductCategoriesComponent implements OnInit {

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
  constructor(private homePage: HomeService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.homePage.productCategoriesObservable().subscribe(
      res => {
        if (!res.error) {
          this.productCategories = res.data
          this.productCategories.forEach(c => {
            let count: number = 0;
            c.subCategories.forEach(s => count += s.productsCount)
            c.productsCount = count;
          })
        }
      }
    )
  }

}
