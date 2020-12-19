import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { AllRouteComponent } from './all-route/all-route.component';
import { BannerComponent } from './all-route/banner/banner.component';
import { SliderOneComponent } from './all-route/slider-one/slider-one.component';
import { SliderTwoComponent } from './all-route/slider-two/slider-two.component';
import { SliderThreeComponent } from './all-route/slider-three/slider-three.component';
import { SliderFourComponent } from './all-route/slider-four/slider-four.component';
import { SliderFiveComponent } from './all-route/slider-five/slider-five.component';
import { MainLayoutModule } from '@layout/main-layout/main-layout.module';
import { ProductCategoriesComponent } from './all-route/product-categories/product-categories.component';
import { ServiceCategoriesComponent } from './all-route/service-categories/service-categories.component';
import { HomeRouteComponent } from './home-route.component';
import { NguCarouselModule } from '@ngu/carousel';
import { ExternalModule } from 'app/external-modules/external.module';
import { CustomPipesModule } from 'app/custom-pipes/custom-pipes.module';
import { SliderSixComponent } from './all-route/slider-six/slider-six.component';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    AllRouteComponent,
    BannerComponent,
    SliderOneComponent,
    SliderTwoComponent,
    SliderThreeComponent,
    SliderFourComponent,
    SliderFiveComponent,
    ProductCategoriesComponent,
    ServiceCategoriesComponent,
    HomeRouteComponent,
    SliderSixComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MainLayoutModule,
    ExternalModule,
    NguCarouselModule,
    CustomPipesModule,
    DeviceDetectorModule.forRoot(),
    InfiniteScrollModule
  ],
})
export class HomeModule { }
