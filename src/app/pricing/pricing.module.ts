import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricingRoutingModule } from './pricing-routing.module';
import { PricingRouteComponent } from './pricing-route.component';
import { PricingTableComponent } from './pricing-table/pricing-table.component';
import { MainLayoutModule } from '@layout/main-layout/main-layout.module';
import { SharedModule } from 'app/shared/shared.module';
import { PaymentComponent } from './payment/payment.component';
import { PaymentGuardService } from './guard/payment-guard.service';

@NgModule({
  declarations:
    [
      PricingRouteComponent,
      PricingTableComponent,
      PaymentComponent,
    ],
  imports:
    [
      CommonModule,
      PricingRoutingModule,
      MainLayoutModule,
      SharedModule
    ],
  exports: [
    PricingTableComponent
  ],
  providers: [
    PaymentGuardService
  ]
})
export class PricingModule { }
