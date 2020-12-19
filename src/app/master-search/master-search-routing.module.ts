import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductSearchComponent } from './product-search/product-search.component';
import { ServiceSearchComponent } from './service-search/service-search.component';
import { CombineResultComponent } from './combine-result/combine-result.component';
import { MasterSearchRouteComponent } from './master-search-route.component';
import { SmeSearchComponent } from './sme-search/sme-search.component';

const routes: Routes = [
  {
    path: '', component: MasterSearchRouteComponent, children: [
      { path: 'p', component: ProductSearchComponent },
      { path: 's', component: ServiceSearchComponent },
      { path: 'all', component: CombineResultComponent },
      { path: 'res', component: SmeSearchComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterSearchRoutingModule { }
