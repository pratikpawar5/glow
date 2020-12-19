import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceRouteComponent } from './service-route/service-route.component';
import { ServiceDetailComponent } from './service-route/service-detail/service-detail.component';
import { ServiceFilterComponent } from './service-route/service-filter/service-filter.component';

const routes: Routes = [
  { path: '', component: ServiceRouteComponent,children:[
    { path: ':serviceName/s/:serviceUuid', component: ServiceDetailComponent },
    { path: ':category', component: ServiceFilterComponent },
    { path: ':category/:subcategory', component: ServiceFilterComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceRoutingModule { }
