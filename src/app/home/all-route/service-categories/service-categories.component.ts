import { Component, OnInit } from '@angular/core';
import { ServiceCategory, ServiceSubCategory } from '@models/service';
import { environment } from 'environments/environment';
import { NguCarouselConfig } from '@ngu/carousel';
import { HomeService } from '@services/home/home.service';

@Component({
  selector: 'app-service-categories',
  templateUrl: './service-categories.component.html',
  styleUrls: ['./service-categories.component.css']
})
export class ServiceCategoriesComponent implements OnInit {

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
  constructor(private homePage: HomeService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.homePage.serviceCategoriesObservable().subscribe(
      res => {
        if (!res.error) {
          this.serviceCategories = res.data
          this.serviceCategories.forEach(c => {
            let count: number = 0;
            c.subCategories.forEach(s => count += s.servicesCount)
            c.servicesCount = count;
          })
        }
      }
    )
  }

}
