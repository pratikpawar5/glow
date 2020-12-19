import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SmeFilterDisplayComponent } from './sme-filter-display/sme-filter-display.component';

const routes: Routes = [
  {path: 'fetch', component:SmeFilterDisplayComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmeFilterRoutingModule { }
