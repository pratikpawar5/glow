import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmeAdminRoutingModule } from './sme-admin-routing.module';
import { SmeAdminPageComponent } from './sme-admin-page.component';
import { SmeAdminPageRouteComponent } from './sme-admin-page-route/sme-admin-page-route.component';
import { AdminCategoryObjectComponent } from './sme-admin-page-route/admin-category-object/admin-category-object.component';
import { AdminBusinessPostComponent } from './sme-admin-page-route/admin-category-object/admin-business-post/admin-business-post.component';
import { AdminCertificateComponent } from './sme-admin-page-route/admin-category-object/admin-certificate/admin-certificate.component';
import { AdminGalleryComponent } from './sme-admin-page-route/admin-category-object/admin-gallery/admin-gallery.component';
import { AdminInfraComponent } from './sme-admin-page-route/admin-category-object/admin-infra/admin-infra.component';
import { AdminProductsComponent } from './sme-admin-page-route/admin-category-object/admin-products/admin-products.component';
import { AdminServicesComponent } from './sme-admin-page-route/admin-category-object/admin-services/admin-services.component';
import { AdminTeamComponent } from './sme-admin-page-route/admin-category-object/admin-team/admin-team.component';
import { AdminVacancyComponent } from './sme-admin-page-route/admin-category-object/admin-vacancy/admin-vacancy.component';
import { SmeHomeLayoutModule } from '@layout/sme-home-layout/sme-home-layout.module';
import { SmeAdminServiceService } from './sme-admin-service/sme-admin-service.service';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [
    SmeAdminPageComponent,
    SmeAdminPageRouteComponent,
    AdminCategoryObjectComponent,
    AdminBusinessPostComponent,
    AdminCertificateComponent,
    AdminGalleryComponent,
    AdminInfraComponent,
    AdminProductsComponent,
    AdminServicesComponent,
    AdminTeamComponent,
    AdminVacancyComponent],
  imports: [
    CommonModule,
    SmeAdminRoutingModule,
    SmeHomeLayoutModule,
    SharedModule
  ],
  providers:[
    SmeAdminServiceService
  ]
})
export class SmeAdminModule { }
