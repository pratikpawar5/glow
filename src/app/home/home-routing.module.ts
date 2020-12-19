import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllRouteComponent } from './all-route/all-route.component';
import { HomeRouteComponent } from './home-route.component';
import { ProductCategoriesComponent } from './all-route/product-categories/product-categories.component';
import { ServiceCategoriesComponent } from './all-route/service-categories/service-categories.component';

const routes: Routes = [
  { path: '', component: HomeRouteComponent ,children:[
    { path: '', component: AllRouteComponent },
    { path: 'products', component: ProductCategoriesComponent },
    { path: 'services', component: ServiceCategoriesComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
