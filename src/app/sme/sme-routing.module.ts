import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SmeRouteComponent } from './sme-route.component';
import { SmeHomeComponent } from './sme-home/sme-home.component';
import { SmeCertificatesComponent } from './sme-left-menu/sme-certificates/sme-certificates.component';
import { SmeProductsComponent } from './sme-left-menu/sme-products/sme-products.component';
import { SmeInfrastructureComponent } from './sme-left-menu/sme-infrastructure/sme-infrastructure.component';
import { SmeManagementTeamComponent } from './sme-left-menu/sme-management-team/sme-management-team.component';
import { SmeGalleryComponent } from './sme-left-menu/sme-gallery/sme-gallery.component';
import { SmeServicesComponent } from './sme-left-menu/sme-services/sme-services.component';
import { SmeVacancyComponent } from './sme-left-menu/sme-vacancy/sme-vacancy.component';
import { AddCertificateComponent } from './sme-add-update-forms/add forms/add-certificate/add-certificate.component';
import { UpdateCertificateComponent } from './sme-add-update-forms/update-forms/update-certificate/update-certificate.component';
import { AddInfrastrcutureComponent } from './sme-add-update-forms/add forms/add-infrastrcuture/add-infrastrcuture.component';
import { UpdateInfrastrcutureComponent } from './sme-add-update-forms/update-forms/update-infrastrcuture/update-infrastrcuture.component';
import { AddManagementTeamComponent } from './sme-add-update-forms/add forms/add-management-team/add-management-team.component';
import { UpdateManagementTeamComponent } from './sme-add-update-forms/update-forms/update-management-team/update-management-team.component';
import { AddGalleryComponent } from './sme-add-update-forms/add forms/add-gallery/add-gallery.component';
import { UpdateGalleryComponent } from './sme-add-update-forms/update-forms/update-gallery/update-gallery.component';
import { AddProductComponent } from './sme-add-update-forms/add forms/add-product/add-product.component';
import { AddServiceComponent } from './sme-add-update-forms/add forms/add-service/add-service.component';
import { UpdateProductComponent } from './sme-add-update-forms/update-forms/update-product/update-product.component';
import { UpdateServiceComponent } from './sme-add-update-forms/update-forms/update-service/update-service.component';
import { AddVacancyComponent } from './sme-add-update-forms/add forms/add-vacancy/add-vacancy.component';
import { NoLeftSideRouteComponent } from './no-left-side-route/no-left-side-route.component';
import { BusinessCreditsComponent } from './no-left-side-route/business-credits/business-credits.component';
import { SmeProfileComponent } from './no-left-side-route/sme-profile/sme-profile.component';
import { UpdateBusinessPostComponent } from './sme-add-update-forms/update-forms/update-business-post/update-business-post.component';
import { UpdateJobsComponent } from './sme-add-update-forms/update-forms/update-jobs/update-jobs.component';
import { SmeDashboardComponent } from './sme-left-menu/sme-dashboard/sme-dashboard.component';
import { CreditConsumptionsComponent } from './no-left-side-route/credit-consumptions/credit-consumptions.component';

const routes: Routes = [
  {
    path: '', component: SmeRouteComponent, children: [
      { path: 'home', component: SmeHomeComponent },
      { path: 'certificates', component: SmeCertificatesComponent },
      { path: 'add-certificate', component: AddCertificateComponent },
      { path: 'update-certificate', component: UpdateCertificateComponent },
      { path: 'infrastrcutures', component: SmeInfrastructureComponent },
      { path: 'add-infrastructure', component: AddInfrastrcutureComponent },
      { path: 'update-infrastructure', component: UpdateInfrastrcutureComponent },
      { path: 'management-teams', component: SmeManagementTeamComponent },
      { path: 'add-management-team', component: AddManagementTeamComponent },
      { path: 'update-management-team', component: UpdateManagementTeamComponent },
      { path: 'galleries', component: SmeGalleryComponent },
      { path: 'add-gallery', component: AddGalleryComponent },
      { path: 'update-gallery', component: UpdateGalleryComponent },
      { path: 'products', component: SmeProductsComponent },
      { path: 'services', component: SmeServicesComponent },
      { path: 'jobs', component: SmeVacancyComponent },
      { path: 'add-job', component: AddVacancyComponent },
      { path: 'update-job', component: UpdateJobsComponent },
      { path: 'add-product', component: AddProductComponent },
      { path: 'update-product', component: UpdateProductComponent },
      { path: 'add-service', component: AddServiceComponent },
      { path: 'update-service', component: UpdateServiceComponent },
      { path: 'update-business-post', component: UpdateBusinessPostComponent },
      { path: 'sme-dashboard', component: SmeDashboardComponent }
    ]
  },
  {
    path: '', component: NoLeftSideRouteComponent, children: [
      {
        path: 'profile', component: SmeProfileComponent
      },
      {
        path: 'business-credits', component: BusinessCreditsComponent, children: [
        ]
      }, 
      {
        path: 'business-credits/credit-consumptions', component: CreditConsumptionsComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmeRoutingModule { }
