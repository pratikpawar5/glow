
/* Modules */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartRoutingModule } from './cart-routing.module';
import { SharedModule } from '../shared/shared.module';

/* Components */
import { BusinessCartComponent } from './business-cart/business-cart.component';
import { UserCartComponent } from './business-cart/user-cart/user-cart.component';
import { SmeCartComponent } from './business-cart/sme-cart/sme-cart.component';
import { SmeCartItemsComponent } from './business-cart/sme-cart/components/sme-cart-items/sme-cart-items.component';
import { SmeCartItemStatusComponent } from './business-cart/sme-cart/components/sme-cart-item-status/sme-cart-item-status.component';
import { UserCartItemsComponent } from './business-cart/user-cart/components/user-cart-items/user-cart-items.component';
import { UserCartItemStatusComponent } from './business-cart/user-cart/components/user-cart-item-status/user-cart-item-status.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MainLayoutModule } from '@layout/main-layout/main-layout.module';
import { RejectQuotationComponent } from './dialog-boxes/reject-quotation/reject-quotation.component';
import { LazyCartService } from './http-service/lazy-cart.service';
import { AcceptQuotationComponent } from './dialog-boxes/accept-quotation/accept-quotation.component';
import { ViewQuotationComponent } from './dialog-boxes/view-quotation/view-quotation.component';
import { RejectOrderComponent } from './dialog-boxes/reject-order/reject-order.component';
import { RejectPurchaseOrderComponent } from './dialog-boxes/reject-purchase-order/reject-purchase-order.component';
import { AcceptOrderComponent } from './dialog-boxes/accept-order/accept-order.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

@NgModule({
  imports: [
    CommonModule,
    CartRoutingModule,
    MainLayoutModule,
    SharedModule,
    InfiniteScrollModule,
    ScrollToModule.forRoot()
  ],
  declarations: [
    BusinessCartComponent,
    UserCartComponent,
    SmeCartComponent,
    SmeCartItemsComponent,
    SmeCartItemStatusComponent,
    UserCartItemsComponent,
    UserCartItemStatusComponent,
    ViewQuotationComponent,
    AcceptQuotationComponent,
    RejectQuotationComponent,
    RejectOrderComponent,
    RejectPurchaseOrderComponent,
    AcceptOrderComponent,
  ],
  entryComponents: [
    AcceptOrderComponent,
    RejectOrderComponent,
    RejectPurchaseOrderComponent,
    ViewQuotationComponent,
    AcceptQuotationComponent,
    RejectQuotationComponent
  ],
  providers: [
    LazyCartService
  ]
})
export class CartModule {

}
