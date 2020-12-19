import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GloqrAdminRoutingModule } from './gloqr-admin-routing.module';
import { AdminRouteComponent } from './admin-route/admin-route.component';
import { AdminLayoutModule } from '@layout/admin-layout/admin-layout.module';
import { ExternalModule } from 'app/external-modules/external.module';
import { NewSmesComponent } from './admin-route/new-smes/new-smes.component';
import { ExistingSmesComponent } from './admin-route/existing-smes/existing-smes.component';
import { DashboardComponent } from './admin-route/dashboard/dashboard.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ObjectVerificationComponent } from './admin-route/object-verification/object-verification.component';
import { SmeBasicDetailsComponent } from './admin-route/object-verification/sme-basic-details/sme-basic-details.component';
import { ProductsComponent } from './admin-route/object-verification/products/products.component';
import { ServicesComponent } from './admin-route/object-verification/services/services.component';
import { BusinessPostsComponent } from './admin-route/object-verification/business-posts/business-posts.component';
import { CertificatesComponent } from './admin-route/object-verification/certificates/certificates.component';
import { InfrastructuresComponent } from './admin-route/object-verification/infrastructures/infrastructures.component';
import { ManagementTeamsComponent } from './admin-route/object-verification/management-teams/management-teams.component';
import { GalleriesComponent } from './admin-route/object-verification/galleries/galleries.component';
import { PackageDetailsComponent } from './admin-route/object-verification/package-details/package-details.component';
import { CustomPipesModule } from 'app/custom-pipes/custom-pipes.module';
import { VacanciesComponent } from './admin-route/object-verification/vacancies/vacancies.component';
import { CertificateDetailDialogComponent } from './admin-route/object-verification/certificates/certificate-detail-dialog/certificate-detail-dialog.component';
import { InfrastructureDetailDialogComponent } from './admin-route/object-verification/infrastructures/infrastructure-detail-dialog/infrastructure-detail-dialog.component';
import { ProductDetailDialogComponent } from './admin-route/object-verification/products/product-detail-dialog/product-detail-dialog.component';
import { GalleryDetailDialogComponent } from './admin-route/object-verification/galleries/gallery-detail-dialog/gallery-detail-dialog.component';
import { ServiceDetailDialogComponent } from './admin-route/object-verification/services/service-detail-dialog/service-detail-dialog.component';
import { TeamDetailDialogComponent } from './admin-route/object-verification/management-teams/team-detail-dialog/team-detail-dialog.component';
import { VacancyDetailDialogComponent } from './admin-route/object-verification/vacancies/vacancy-detail-dialog/vacancy-detail-dialog.component';
import { RejectMessageComponent } from './admin-route/object-verification/package-details/reject-message/reject-message.component';
import { PostDetailDialogComponent } from './admin-route/object-verification/business-posts/post-detail-dialog/post-detail-dialog.component';
import { GloqrAdminService } from './gloqr-admin-services/gloqr-admin.service';
import { GloqrLoginComponent } from './gloqr-login/gloqr-login.component';
import { GloqrAdminTokenService } from './gloqr-admin-services/gloqr-admin-token.service';
import { GloqrAdminGuardService } from './gloqr-admin-services/gloqr-admin-guard.service';
import { SmeVerifyComponent } from './admin-route/object-verification/sme-basic-details/sme-verify/sme-verify.component';
import { AddProductCategoryComponent } from './admin-route/add-external-category/add-product-category/add-product-category.component';
import { AddServiceCategoryComponent } from './admin-route/add-external-category/add-service-category/add-service-category.component';
import { AddSmeCategoryComponent } from './admin-route/add-external-category/add-sme-category/add-sme-category.component';
import { AddProductPriceUnitsComponent } from './admin-route/add-external-category/add-product-price-units/add-product-price-units.component';
import { AddServicePriceUnitsComponent } from './admin-route/add-external-category/add-service-price-units/add-service-price-units.component';
import { AddExternalCategoryComponent } from './admin-route/add-external-category/add-external-category.component';
import { AccessLevelService } from './gloqr-admin-services/access-level.service';
import { AddIndustrialAreaComponent } from './admin-route/add-external-category/add-industrial-area/add-industrial-area.component';
import { NewUserListComponent } from './admin-route/dashboard/new-user-list/new-user-list.component';
import { BuinessInterestComponent } from './admin-route/dashboard/buiness-interest/buiness-interest.component';
import { BusinessCircleComponent } from './admin-route/dashboard/business-circle/business-circle.component';
import { JobAppliedComponent } from './admin-route/dashboard/job-applied/job-applied.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { JobRoleComponent } from './admin-route/add-external-category/job-role/job-role.component';



@NgModule({
  declarations: [AdminRouteComponent,
    NewSmesComponent,
    ExistingSmesComponent,
    DashboardComponent,
    ObjectVerificationComponent,
    SmeBasicDetailsComponent,
    ProductsComponent,
    ServicesComponent,
    BusinessPostsComponent,
    CertificatesComponent,
    InfrastructuresComponent,
    ManagementTeamsComponent,
    GalleriesComponent,
    PackageDetailsComponent,
    VacanciesComponent,
    CertificateDetailDialogComponent,
    InfrastructureDetailDialogComponent,
    ProductDetailDialogComponent,
    GalleryDetailDialogComponent,
    ServiceDetailDialogComponent,
    TeamDetailDialogComponent,
    VacancyDetailDialogComponent,
    RejectMessageComponent,
    PostDetailDialogComponent,
    PostDetailDialogComponent,
    GloqrLoginComponent,
    SmeVerifyComponent,
    AddProductCategoryComponent,
    AddServiceCategoryComponent,
    AddSmeCategoryComponent,
    AddProductPriceUnitsComponent,
    AddServicePriceUnitsComponent,
    AddExternalCategoryComponent,
    AddIndustrialAreaComponent,
    NewUserListComponent,
    BuinessInterestComponent,
    BusinessCircleComponent,
    JobAppliedComponent,
    JobRoleComponent
  ],
  imports: [
    CommonModule,
    GloqrAdminRoutingModule,
    AdminLayoutModule,
    ExternalModule,
    InfiniteScrollModule, //external npm use for Pagination
    CustomPipesModule,
    ScrollToModule.forRoot(), //external npm use for bottom to top

  ],
  providers: [
    GloqrAdminService,
    GloqrAdminTokenService,
    GloqrAdminGuardService,
    AccessLevelService
  ],
  entryComponents: [
    PostDetailDialogComponent,
    CertificateDetailDialogComponent,
    GalleryDetailDialogComponent,
    InfrastructureDetailDialogComponent,
    ProductDetailDialogComponent,
    ServiceDetailDialogComponent,
    TeamDetailDialogComponent,
    VacancyDetailDialogComponent,
    RejectMessageComponent,
    SmeVerifyComponent
  ]

})
export class GloqrAdminModule { }
