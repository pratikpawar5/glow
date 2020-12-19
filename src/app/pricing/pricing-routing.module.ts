import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PricingRouteComponent } from './pricing-route.component';
import { PricingTableComponent } from './pricing-table/pricing-table.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentGuardService } from './guard/payment-guard.service';

const routes: Routes = [
  {
    path: '', component: PricingRouteComponent, children: 
    [
      { path: '', component: PricingTableComponent },
      { path: 'make-payment', component: PaymentComponent,canActivate:[PaymentGuardService] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PricingRoutingModule { }
