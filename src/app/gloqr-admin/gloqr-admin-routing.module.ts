import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminRouteComponent } from './admin-route/admin-route.component';
import { NewSmesComponent } from './admin-route/new-smes/new-smes.component';
import { DashboardComponent } from './admin-route/dashboard/dashboard.component';
import { ExistingSmesComponent } from './admin-route/existing-smes/existing-smes.component';
import { GloqrLoginComponent } from './gloqr-login/gloqr-login.component';
import { GloqrAdminGuardService } from './gloqr-admin-services/gloqr-admin-guard.service';
import { AddProductCategoryComponent } from './admin-route/add-external-category/add-product-category/add-product-category.component';
import { AddServiceCategoryComponent } from './admin-route/add-external-category/add-service-category/add-service-category.component';
import { AddSmeCategoryComponent } from './admin-route/add-external-category/add-sme-category/add-sme-category.component';
import { AddProductPriceUnitsComponent } from './admin-route/add-external-category/add-product-price-units/add-product-price-units.component';
import { AddServicePriceUnitsComponent } from './admin-route/add-external-category/add-service-price-units/add-service-price-units.component';
import { AddExternalCategoryComponent } from './admin-route/add-external-category/add-external-category.component';
import { AccessLevelService } from './gloqr-admin-services/access-level.service';
import { AddIndustrialAreaComponent } from './admin-route/add-external-category/add-industrial-area/add-industrial-area.component';
import { ObjectVerificationComponent } from './admin-route/object-verification/object-verification.component';
import { JobRoleComponent } from './admin-route/add-external-category/job-role/job-role.component';


const routes: Routes = [
  { path: 'login', component: GloqrLoginComponent },
  {
    path: '', component: AdminRouteComponent, canActivate: [GloqrAdminGuardService],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'add-external-category', component: AddExternalCategoryComponent, canActivate: [AccessLevelService] },
      { path: 'new-smes', component: NewSmesComponent },
      { path: 'existing-smes', component: ExistingSmesComponent },
      { path: ':baseComponentUrl/:sUuid/:uuid/sme-basic-details', component: ObjectVerificationComponent },
      { path: 'add-product-category', component: AddProductCategoryComponent },
      { path: 'add-service-category', component: AddServiceCategoryComponent },
      { path: 'add-sme-category', component: AddSmeCategoryComponent },
      { path: 'add-product-price-units', component: AddProductPriceUnitsComponent },
      { path: 'add-service-price-units', component: AddServicePriceUnitsComponent },
      { path: 'add-industrial-area', component: AddIndustrialAreaComponent },
      { path: 'add-job-role', component: JobRoleComponent }

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GloqrAdminRoutingModule { }
