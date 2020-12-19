import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VacancyRoutingModule } from './vacancy-routing.module';
import { VacancyDisplayComponent } from './vacancy-display.component';
import { MainLayoutModule } from '@layout/main-layout/main-layout.module';
import { JobBreadCrumbsComponent } from './components/job-bread-crumbs/job-bread-crumbs.component';
import { JobLeftSideBarComponent } from './components/job-left-side-bar/job-left-side-bar.component';
import { JobDisplayListComponent } from './components/job-display-list/job-display-list.component';
import { SharedModule } from 'app/shared/shared.module';
import { VacancyRoutePageComponent } from './vacancy-route-page/vacancy-route-page.component';
import { VacancyDetailPageComponent } from './vacancy-route-page/vacancy-detail-page/vacancy-detail-page.component';
import { VacancyDetailPageBreadcrumbsComponent } from './vacancy-route-page/vacancy-detail-page/vacancy-detail-page-breadcrumbs/vacancy-detail-page-breadcrumbs.component';
import { CustomPipesModule } from 'app/custom-pipes/custom-pipes.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { DeviceDetectorModule } from 'ngx-device-detector';


@NgModule({
  declarations: [VacancyDisplayComponent, JobBreadCrumbsComponent, JobLeftSideBarComponent, JobDisplayListComponent, VacancyRoutePageComponent, VacancyDetailPageComponent, VacancyDetailPageBreadcrumbsComponent],
  imports: [
    CommonModule,
    VacancyRoutingModule,
    MainLayoutModule,
    SharedModule,
    CustomPipesModule,
    InfiniteScrollModule,
    ScrollToModule.forRoot(),

  ]
})
export class VacancyModule { }
