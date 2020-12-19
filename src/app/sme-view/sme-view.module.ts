import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmeViewHomeComponent } from './sme-view-home.component';
import { SmeDisplayComponent } from './sme-display/sme-display.component';
import { SmeImageSliderComponent } from './sme-display/sme-image-slider/sme-image-slider.component';
import { SmeWebHomeContentComponent } from './sme-display/sme-web-home-content/sme-web-home-content.component';
import { SmeCategoryComponent } from './sme-display/sme-category/sme-category.component';
import { SmeProductsViewComponent } from './sme-display/sme-category/sme-products-view/sme-products-view.component';
import { SmeServicesViewComponent } from './sme-display/sme-category/sme-services-view/sme-services-view.component';
import { SmeInfrastructuresViewComponent } from './sme-display/sme-category/sme-infrastructures-view/sme-infrastructures-view.component';
import { SmeCertificatesViewComponent } from './sme-display/sme-category/sme-certificates-view/sme-certificates-view.component';
import { SmeGalleriesViewComponent } from './sme-display/sme-category/sme-galleries-view/sme-galleries-view.component';
import { SmeManagementTeamViewComponent } from './sme-display/sme-category/sme-management-team-view/sme-management-team-view.component';
import { SmeCircleViewComponent } from './sme-display/sme-category/sme-circle-view/sme-circle-view.component';
import { SmeContactUsViewComponent } from './sme-display/sme-category/sme-contact-us-view/sme-contact-us-view.component';
import { SmeSocialPostViewComponent } from './sme-display/sme-category/sme-social-post-view/sme-social-post-view.component';
import { SmeVacanciesViewComponent } from './sme-display/sme-category/sme-vacancies-view/sme-vacancies-view.component';
import { SmeViewLayoutModule } from '@layout/sme-view-layout/sme-view-layout.module';
import { SMEViewRoutingModule } from './sme-view-routing.module';
import { LazySmeViewService } from './http-service/lazy-sme-view.service';
import { NguCarouselModule } from '@ngu/carousel';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { SharedModule } from 'app/shared/shared.module';
import { CustomPipesModule } from 'app/custom-pipes/custom-pipes.module';
import { ChartModule } from 'primeng/chart';
import { NgxGalleryModule } from 'ngx-gallery';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  imports: [
    CommonModule,
    SmeViewLayoutModule,
    SMEViewRoutingModule,
    SharedModule,
    NguCarouselModule,
    ScrollToModule.forRoot(),
    CustomPipesModule,
    ChartModule,
    InfiniteScrollModule,
    NgxGalleryModule
  ],
  declarations: [
    SmeViewHomeComponent,
    SmeDisplayComponent,
    SmeImageSliderComponent,
    SmeWebHomeContentComponent,
    SmeCategoryComponent,
    SmeProductsViewComponent,
    SmeServicesViewComponent,
    SmeInfrastructuresViewComponent,
    SmeCertificatesViewComponent,
    SmeGalleriesViewComponent,
    SmeManagementTeamViewComponent,
    SmeCircleViewComponent,
    SmeContactUsViewComponent,
    SmeSocialPostViewComponent,
    SmeVacanciesViewComponent,
  ],
  providers: [
    LazySmeViewService
  ]
})
export class SmeViewModule { }
