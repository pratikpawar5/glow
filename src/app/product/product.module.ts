import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { MainLayoutModule } from '@layout/main-layout/main-layout.module';
import { ProductRouteComponent } from './product-route/product-route.component';
import { ProductFilterComponent } from './product-route/product-filter/product-filter.component';
import { ProductBreadcrumbComponent } from './product-route/product-filter/product-breadcrumb/product-breadcrumb.component';
import { ProductFilterResultComponent } from './product-route/product-filter/product-filter-result/product-filter-result.component';
import { ProductResultComponent } from './product-route/product-filter/product-result/product-result.component';
import { ProductSubcategorySliderComponent } from './product-route/product-filter/product-subcategory-slider/product-subcategory-slider.component';
import { ProductDetailComponent } from './product-route/product-detail/product-detail.component';
import { SimilarProductsComponent } from './product-route/product-detail/similar-products/similar-products.component';
import { ProductImagesComponent } from './product-route/product-detail/product-images/product-images.component';
import { ProductInfoComponent } from './product-route/product-detail/product-info/product-info.component';
import { LazyProductService } from './http-services/lazy-product.service';
import { ProductBreadcrumbsComponent } from './product-route/product-detail/product-breadcrumbs/product-breadcrumbs.component';
import { Ng5SliderModule } from 'ng5-slider';
import { ExternalModule } from 'app/external-modules/external.module';
import { CustomPipesModule } from 'app/custom-pipes/custom-pipes.module';
import { NguCarouselModule } from '@ngu/carousel';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [
    ProductDetailComponent,
    ProductRouteComponent,
    ProductFilterComponent,
    ProductBreadcrumbComponent,
    ProductFilterResultComponent,
    ProductResultComponent,
    ProductSubcategorySliderComponent,
    SimilarProductsComponent,
    ProductImagesComponent,
    ProductInfoComponent,
    ProductBreadcrumbsComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MainLayoutModule,
    ExternalModule,
    NguCarouselModule,
    CustomPipesModule,
    Ng5SliderModule,
    InfiniteScrollModule,
    ScrollToModule.forRoot(),
    SharedModule
  ],
  providers: [
    LazyProductService
  ]
})
export class ProductModule { }
