import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceRoutingModule } from './service-routing.module';
import { ServiceRouteComponent } from './service-route/service-route.component';
import { ServiceFilterResultComponent } from './service-route/service-filter/service-filter-result/service-filter-result.component';
import { ServiceResultComponent } from './service-route/service-filter/service-result/service-result.component';
import { ServiceSubcategorySliderComponent } from './service-route/service-filter/service-subcategory-slider/service-subcategory-slider.component';
import { ServiceBreadcrumbComponent } from './service-route/service-filter/service-breadcrumb/service-breadcrumb.component';
import { ServiceFilterComponent } from './service-route/service-filter/service-filter.component';
import { ServiceDetailComponent } from './service-route/service-detail/service-detail.component';
import { MainLayoutModule } from '@layout/main-layout/main-layout.module';
import { LazySmeService } from './http-service/lazy-sme.service';
import { ServiceBreadcrumbsComponent } from './service-route/service-detail/service-breadcrumbs/service-breadcrumbs.component';
import { ServiceImagesComponent } from './service-route/service-detail/service-images/service-images.component';
import { ServiceInfoComponent } from './service-route/service-detail/service-info/service-info.component';
import { SimilarServicesComponent } from './service-route/service-detail/similar-services/similar-services.component';
import { Ng5SliderModule } from 'ng5-slider';
import { ExternalModule } from 'app/external-modules/external.module';
import { NguCarouselModule } from '@ngu/carousel';
import { CustomPipesModule } from 'app/custom-pipes/custom-pipes.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [
    ServiceDetailComponent, 
    ServiceFilterComponent, 
    ServiceSubcategorySliderComponent, 
    ServiceBreadcrumbComponent, 
    ServiceResultComponent, 
    ServiceFilterResultComponent, 
    ServiceRouteComponent, ServiceBreadcrumbsComponent, ServiceImagesComponent, ServiceInfoComponent, SimilarServicesComponent
  ],
  imports: [
    CommonModule,
    ServiceRoutingModule,
    MainLayoutModule,
    ExternalModule,
    NguCarouselModule,
    CustomPipesModule,
    Ng5SliderModule,
    InfiniteScrollModule,
    ScrollToModule.forRoot(),
    SharedModule
  ],
  providers:[
    LazySmeService
  ]
})
export class ServiceModule { }
