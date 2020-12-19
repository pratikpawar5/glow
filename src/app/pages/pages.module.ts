import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { TermsAndConditionComponent } from './terms-and-condition/terms-and-condition.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { DeliveryShipmentComponent } from './delivery-shipment/delivery-shipment.component';
import { CancellationRefundComponent } from './cancellation-refund/cancellation-refund.component';
import { MainLayoutModule } from '@layout/main-layout/main-layout.module';
import { PageRouteComponent } from './page-route.component';
import { ExternalModule } from 'app/external-modules/external.module';
import { JobSeekerCreateProfilePermissionComponent } from './job-seeker-create-profile-permission/job-seeker-create-profile-permission.component';
import { UnSubscribedComponent } from './un-subscribed/un-subscribed.component';
import { UnsubscribeDoneComponent } from './un-subscribed/unsubscribe-done/unsubscribe-done.component';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    MainLayoutModule,
    ExternalModule,
  ],
  declarations: [TermsAndConditionComponent,
    PrivacyComponent,
    ContactUsComponent,
    AboutUsComponent,
    DeliveryShipmentComponent,
    CancellationRefundComponent,
    PageRouteComponent,
    JobSeekerCreateProfilePermissionComponent,
    UnSubscribedComponent,
    UnsubscribeDoneComponent,
  ]
})
export class PagesModule { }
