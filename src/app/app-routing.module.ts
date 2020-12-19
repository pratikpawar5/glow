import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SmeGuardService } from './core/guards/sme-guard.service';
import { LoggedInGuardService } from './core/guards/logged-in-guard.service';
import { SmeAndUserGuardService } from './core/guards/sme-and-user-guard.service';
import { TokenValidGuardService } from './core/guards/token-valid-guard.service';

const routes: Routes = [
  { path: '', loadChildren: './home/home.module#HomeModule', canActivate: [TokenValidGuardService] },
  { path: 'l', loadChildren: './pdf-viewer/pdf-viewer.module#CustomPdfViewerModule' },
  { path: 'pricing', loadChildren: './pricing/pricing.module#PricingModule'},
  {
    path: 'cart', loadChildren: './cart/cart.module#CartModule',
    canActivate: [LoggedInGuardService, SmeAndUserGuardService]
  },
  { path: 'products', loadChildren: './product/product.module#ProductModule' },
  { path: 'services', loadChildren: './service/service.module#ServiceModule' },
  { path: 'vacancies', loadChildren: './vacancy/vacancy.module#VacancyModule' },
  {
    path: 'account/:uuid', loadChildren: './user/user.module#UserModule',
    canActivate: [LoggedInGuardService, SmeAndUserGuardService]
  },
  { path: 'smes', loadChildren: './sme-filter/sme-filter.module#SmeFilterModule' },
  { path: 'sme/:sUuid', loadChildren: './sme-view/sme-view.module#SmeViewModule' },
  {
    path: 'job-seeker/:uuid', loadChildren: './job-seeker/job-seeker.module#JobSeekerModule',
    canActivate: [LoggedInGuardService]
  },
  {
    path: 'social', loadChildren: './social/social.module#SocialModule',
    canActivate: [LoggedInGuardService, SmeGuardService]
  },
  { path: 'pages', loadChildren: './pages/pages.module#PagesModule' },
  {
    path: 'social/:sUuid', loadChildren: './social/social.module#SocialModule',
    canActivate: [LoggedInGuardService, SmeGuardService]
  },
  {
    path: 'my-sme/:sUuid', loadChildren: './sme/sme.module#SmeModule',
    canActivate: [LoggedInGuardService, SmeGuardService]
  },
  {
    path: 'my-sme/:sUuid/admin', loadChildren: './sme-admin/sme-admin.module#SmeAdminModule',
    canActivate: [LoggedInGuardService, SmeGuardService]
  },
  {
    path: 'list-on-gloqr', loadChildren: './registration/registration.module#RegistrationModule',
  },
  { path: 'search', loadChildren: './master-search/master-search.module#MasterSearchModule' },
  { path: 'gloqr-admin', loadChildren: './gloqr-admin/gloqr-admin.module#GloqrAdminModule' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

