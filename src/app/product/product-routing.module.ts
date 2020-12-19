import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductRouteComponent } from './product-route/product-route.component';
import { ProductFilterComponent } from './product-route/product-filter/product-filter.component';
import { ProductDetailComponent } from './product-route/product-detail/product-detail.component';

const routes: Routes = [
  { path: '', component: ProductRouteComponent,children:[
    { path: ':productName/p/:productUuid', component: ProductDetailComponent },
    { path: ':category', component: ProductFilterComponent },
    { path: ':category/:subcategory', component: ProductFilterComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
