import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationRoutingModule } from './registration-routing.module';
import { RegRoutesComponent } from './reg-routes/reg-routes.component';
import { MainLayoutModule } from '@layout/main-layout/main-layout.module';
import { SmeRegTermsConditionComponent } from './sme-registration/first-step-reg/sme-reg-terms-condition/sme-reg-terms-condition.component';
import { SecondStepRegComponent } from './sme-registration/second-step-reg/second-step-reg.component';
import { FirstStepRegComponent } from './sme-registration/first-step-reg/first-step-reg.component';
import { ListOnGloqrComponent } from './list-on-gloqr/list-on-gloqr.component';
import { PricingModule } from 'app/pricing/pricing.module';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [
    RegRoutesComponent,
    FirstStepRegComponent,
    SecondStepRegComponent,
    SmeRegTermsConditionComponent,
    ListOnGloqrComponent,
  ],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    MainLayoutModule,
    SharedModule,
    PricingModule
  ],
  entryComponents: [
    SmeRegTermsConditionComponent
  ]
})
export class RegistrationModule { }
