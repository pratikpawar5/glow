import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterSearchRoutingModule } from './master-search-routing.module';
import { ProductSearchComponent } from './product-search/product-search.component';
import { ServiceSearchComponent } from './service-search/service-search.component';
import { ProductResultComponent } from './product-search/product-result/product-result.component';
import { ServiceResultComponent } from './service-search/service-result/service-result.component';
import { MainLayoutModule } from '@layout/main-layout/main-layout.module';
import { CustomPipesModule } from 'app/custom-pipes/custom-pipes.module';
import { ExternalModule } from 'app/external-modules/external.module';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CommonFilterComponent } from './common-filter/common-filter.component';
import { CombineResultComponent } from './combine-result/combine-result.component';
import { NguCarouselModule } from '@ngu/carousel';
import { MasterSearchRouteComponent } from './master-search-route.component';
import { SmeSearchComponent } from './sme-search/sme-search.component';
import { SmeSearchResultComponent } from './sme-search/sme-search-result/sme-search-result.component';
import { SmeSearchFilterComponent } from './sme-search/sme-search-filter/sme-search-filter.component';
import { JobSearchComponent } from './job-search/job-search.component';
import { JobSearchFilterComponent } from './job-search/job-search-filter/job-search-filter.component';
import { JobSearchResultComponent } from './job-search/job-search-result/job-search-result.component';

@NgModule({
  declarations: [
    ProductSearchComponent,
    ServiceSearchComponent,
    ProductResultComponent,
    ServiceResultComponent,
    CommonFilterComponent,
    CombineResultComponent,
    MasterSearchRouteComponent,
    SmeSearchComponent,
    SmeSearchResultComponent,
    SmeSearchFilterComponent,
    JobSearchComponent,
    JobSearchFilterComponent,
    JobSearchResultComponent,
  ],
  imports: [
    CommonModule,
    MasterSearchRoutingModule,
    MainLayoutModule,
    CustomPipesModule,
    ExternalModule,
    ScrollToModule.forRoot(),
    InfiniteScrollModule,
    NguCarouselModule
  ]
})
export class MasterSearchModule { }
