import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmeFilterRoutingModule } from './sme-filter-routing.module';
import { SmeFilterDisplayComponent } from './sme-filter-display/sme-filter-display.component';
import { SmeFilterSideComponent } from './sme-filter-display/sme-filter-side/sme-filter-side.component';
import { SmeFilterBreadCrumbsComponent } from './sme-filter-display/sme-filter-bread-crumbs/sme-filter-bread-crumbs.component';
import { MainLayoutModule } from '@layout/main-layout/main-layout.module';
import { SmeListDisplayComponent } from './sme-filter-display/sme-list-display/sme-list-display.component';
import { ExternalModule } from 'app/external-modules/external.module';
import { CustomPipesModule } from 'app/custom-pipes/custom-pipes.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

@NgModule({
  declarations: [
    SmeFilterDisplayComponent,
    SmeFilterSideComponent,
    SmeFilterBreadCrumbsComponent,
    SmeListDisplayComponent,],
  imports: [
    CommonModule,
    SmeFilterRoutingModule,
    MainLayoutModule,
    CustomPipesModule,
    ExternalModule,
    InfiniteScrollModule,
    ScrollToModule.forRoot()
  ]
})
export class SmeFilterModule { }
