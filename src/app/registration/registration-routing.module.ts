import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegRoutesComponent } from './reg-routes/reg-routes.component';
import { ListOnGloqrComponent } from './list-on-gloqr/list-on-gloqr.component';
import { FirstStepRegComponent } from './sme-registration/first-step-reg/first-step-reg.component';
import { SecondStepRegComponent } from './sme-registration/second-step-reg/second-step-reg.component';
import { LoggedInGuardService } from 'app/core/guards/logged-in-guard.service';
import { UserGuardService } from 'app/core/guards/user-guard.service';

const routes: Routes = [
  {
    path: '', component: RegRoutesComponent, children:
      [
        { path: '', component: ListOnGloqrComponent },
        { path: 'first-step', component: FirstStepRegComponent, canActivate: [LoggedInGuardService, UserGuardService] },
        { path: 'second-step', component: SecondStepRegComponent, canActivate: [LoggedInGuardService] },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }
