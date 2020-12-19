import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VacancyDisplayComponent } from './vacancy-display.component';
import { VacancyRoutePageComponent } from './vacancy-route-page/vacancy-route-page.component';

const routes: Routes = [
  { path: 'jobs', component: VacancyDisplayComponent, canActivate: [] },
  { path: ':urlName/v/:vacancyUuid', component: VacancyRoutePageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VacancyRoutingModule { }
