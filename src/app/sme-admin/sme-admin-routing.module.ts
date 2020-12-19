import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SmeAdminPageComponent } from './sme-admin-page.component';
import { SmeAdminPageRouteComponent } from './sme-admin-page-route/sme-admin-page-route.component';
import { AdminProductsComponent } from './sme-admin-page-route/admin-category-object/admin-products/admin-products.component';
import { AdminServicesComponent } from './sme-admin-page-route/admin-category-object/admin-services/admin-services.component';
import { AdminCertificateComponent } from './sme-admin-page-route/admin-category-object/admin-certificate/admin-certificate.component';
import { AdminGalleryComponent } from './sme-admin-page-route/admin-category-object/admin-gallery/admin-gallery.component';
import { AdminInfraComponent } from './sme-admin-page-route/admin-category-object/admin-infra/admin-infra.component';
import { AdminTeamComponent } from './sme-admin-page-route/admin-category-object/admin-team/admin-team.component';
import { AdminVacancyComponent } from './sme-admin-page-route/admin-category-object/admin-vacancy/admin-vacancy.component';
import { AdminBusinessPostComponent } from './sme-admin-page-route/admin-category-object/admin-business-post/admin-business-post.component';

const routes: Routes = [
  {
    path: '', component: SmeAdminPageComponent, canActivate: [],
    children: [
      { path: '', component: SmeAdminPageRouteComponent, canActivate: [] },
      { path: 'products', component: AdminProductsComponent },
      { path: 'services', component: AdminServicesComponent },
      { path: 'certificates', component: AdminCertificateComponent},
      { path: 'gallery', component: AdminGalleryComponent },
      { path: 'infrastructure', component: AdminInfraComponent },
      { path: 'team', component: AdminTeamComponent},
      { path: 'jobs', component: AdminVacancyComponent},
      { path: 'business-post', component: AdminBusinessPostComponent}
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmeAdminRoutingModule { }
