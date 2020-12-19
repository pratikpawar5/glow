import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { SmeRoutingModule } from './sme-routing.module';
import { SmeRouteComponent } from './sme-route.component';
import { SmeHomeLayoutModule } from '@layout/sme-home-layout/sme-home-layout.module';
import { SmeHomeComponent } from './sme-home/sme-home.component';
import { SmeSliderComponent } from './sme-home/sme-slider/sme-slider.component';
import { SmeInfoComponent } from './sme-home/sme-info/sme-info.component';
import { SmeLeftMenuComponent } from './sme-left-menu/sme-left-menu.component';
import { SmeProductsComponent } from './sme-left-menu/sme-products/sme-products.component';
import { SmeServicesComponent } from './sme-left-menu/sme-services/sme-services.component';
import { SmeCertificatesComponent } from './sme-left-menu/sme-certificates/sme-certificates.component';
import { SmeGalleryComponent } from './sme-left-menu/sme-gallery/sme-gallery.component';
import { SmeManagementTeamComponent } from './sme-left-menu/sme-management-team/sme-management-team.component';
import { SmeInfrastructureComponent } from './sme-left-menu/sme-infrastructure/sme-infrastructure.component';
import { SmeVacancyComponent } from './sme-left-menu/sme-vacancy/sme-vacancy.component';
import { SharedModule } from 'app/shared/shared.module';
import { AddCertificateComponent } from './sme-add-update-forms/add forms/add-certificate/add-certificate.component';
import { AddGalleryComponent } from './sme-add-update-forms/add forms/add-gallery/add-gallery.component';
import { AddInfrastrcutureComponent } from './sme-add-update-forms/add forms/add-infrastrcuture/add-infrastrcuture.component';
import { AddManagementTeamComponent } from './sme-add-update-forms/add forms/add-management-team/add-management-team.component';
import { AddProductComponent } from './sme-add-update-forms/add forms/add-product/add-product.component';
import { AddServiceComponent } from './sme-add-update-forms/add forms/add-service/add-service.component';
import { AddVacancyComponent } from './sme-add-update-forms/add forms/add-vacancy/add-vacancy.component';
import { UpdateCertificateComponent } from './sme-add-update-forms/update-forms/update-certificate/update-certificate.component';
import { UpdateInfrastrcutureComponent } from './sme-add-update-forms/update-forms/update-infrastrcuture/update-infrastrcuture.component';
import { UpdateManagementTeamComponent } from './sme-add-update-forms/update-forms/update-management-team/update-management-team.component';
import { UpdateProductComponent } from './sme-add-update-forms/update-forms/update-product/update-product.component';
import { UpdateServiceComponent } from './sme-add-update-forms/update-forms/update-service/update-service.component';
import { SpecializationDialogComponent } from './sme-add-update-forms/add forms/add-vacancy/specialization-dialog/specialization-dialog.component';
import { UpdateGalleryComponent } from './sme-add-update-forms/update-forms/update-gallery/update-gallery.component';
import { PopUpSliderComponent } from './sme-home/sme-slider/pop-up-slider/pop-up-slider.component';
import { LazySmeModuleService } from './http-service/lazy-sme-module.service';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { NoLeftSideRouteComponent } from './no-left-side-route/no-left-side-route.component';
import { BusinessCreditsComponent } from './no-left-side-route/business-credits/business-credits.component';
import { SmeProfileComponent } from './no-left-side-route/sme-profile/sme-profile.component';
import { SmeLeftSideBarComponent } from './no-left-side-route/sme-profile/components/sme-left-side-bar/sme-left-side-bar.component';
import { SmeProfileImgDialogComponent } from './no-left-side-route/sme-profile/components/sme-left-side-bar/sme-profile-img-dialog/sme-profile-img-dialog.component';
import { UpdateBusinessPostComponent } from './sme-add-update-forms/update-forms/update-business-post/update-business-post.component';
import { NguCarouselModule } from '@ngu/carousel';
import { UpdateJobsComponent } from './sme-add-update-forms/update-forms/update-jobs/update-jobs.component';
import { PreviewVacancyComponent } from './sme-add-update-forms/add forms/add-vacancy/preview-vacancy/preview-vacancy.component';
import { GalleriaModule } from 'primeng/galleria';
import { LightboxModule } from 'primeng/lightbox';
import { ViewApplicantsComponent } from './sme-left-menu/sme-vacancy/view-applicants/view-applicants.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CroppedImageComponent } from './sme-add-update-forms/add forms/add-management-team/cropped-image/cropped-image.component';
import { ChartModule } from 'primeng/chart';
import { NgxGalleryModule } from 'ngx-gallery';
import { SmeDashboardComponent } from './sme-left-menu/sme-dashboard/sme-dashboard.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import {ProgressBarModule} from "angular-progress-bar"
import {DropdownModule} from 'primeng/dropdown';
import { SocialCirclePrivacyComponent } from './sme-left-menu/sme-dashboard/social-circle-privacy/social-circle-privacy.component';
import { ProfileDetailsViewComponent } from './sme-left-menu/sme-dashboard/profile-details-view/profile-details-view.component';
import { SmeBasicDetailsComponent } from './no-left-side-route/sme-profile/components/sme-right-side/sme-basic-details/sme-basic-details.component';
import { SmeAddressDetailsComponent } from './no-left-side-route/sme-profile/components/sme-right-side/sme-address-details/sme-address-details.component';
import {MultiSelectModule} from 'primeng/multiselect';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CreditConsumptionsComponent } from './no-left-side-route/credit-consumptions/credit-consumptions.component';

@NgModule({
  declarations: [
    SmeRouteComponent,
    SmeHomeComponent,
    SmeSliderComponent,
    SmeInfoComponent,
    SmeLeftMenuComponent,
    SmeProductsComponent,
    SmeServicesComponent,
    SmeCertificatesComponent,
    SmeGalleryComponent,
    SmeManagementTeamComponent,
    SmeInfrastructureComponent,
    SmeVacancyComponent,
    AddCertificateComponent,
    AddGalleryComponent,
    AddInfrastrcutureComponent,
    AddManagementTeamComponent,
    AddProductComponent,
    AddServiceComponent,
    AddVacancyComponent,
    UpdateCertificateComponent,
    UpdateInfrastrcutureComponent,
    UpdateManagementTeamComponent,
    UpdateProductComponent,
    UpdateServiceComponent,
    SpecializationDialogComponent,
    UpdateGalleryComponent,
    PopUpSliderComponent,
    SmeProfileComponent,
    SmeLeftSideBarComponent,
    SmeProfileImgDialogComponent,
    NoLeftSideRouteComponent,
    BusinessCreditsComponent,
    UpdateBusinessPostComponent,
    UpdateJobsComponent,
    PreviewVacancyComponent,
    ViewApplicantsComponent,
    CroppedImageComponent,
    SmeDashboardComponent,
    SocialCirclePrivacyComponent,
    ProfileDetailsViewComponent,
    SmeBasicDetailsComponent,
    SmeAddressDetailsComponent,
    CreditConsumptionsComponent,

  ],
  imports: [
    CommonModule,
    SmeRoutingModule,
    SmeHomeLayoutModule,
    SharedModule,
    ScrollToModule.forRoot(),
    NguCarouselModule,
    GalleriaModule,
    LightboxModule,
    ImageCropperModule,
    ChartModule,
    NgxGalleryModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    }),
    InfiniteScrollModule,
    MultiSelectModule,
    ProgressBarModule,
    DropdownModule
  ],
  entryComponents: [
    PopUpSliderComponent,
    SpecializationDialogComponent,
    SmeProfileImgDialogComponent,
    PreviewVacancyComponent,
    ViewApplicantsComponent,
    CroppedImageComponent,
    SocialCirclePrivacyComponent,
    ProfileDetailsViewComponent
  ],
  providers: [
    LazySmeModuleService,
    DatePipe
  ]
})
export class SmeModule { }
