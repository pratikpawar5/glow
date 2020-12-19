import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusinessCartComponent } from './business-cart/business-cart.component';
import { UserCartComponent } from './business-cart/user-cart/user-cart.component';
import { SmeCartComponent } from './business-cart/sme-cart/sme-cart.component';

const routes: Routes = [
  {
    path: '', component: BusinessCartComponent,
    children: [
      { path: '', component: UserCartComponent },
      { path: 'received', component: SmeCartComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
