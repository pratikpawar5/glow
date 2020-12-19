import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TermsAndConditionComponent } from './terms-and-condition/terms-and-condition.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { DeliveryShipmentComponent } from './delivery-shipment/delivery-shipment.component';
import { CancellationRefundComponent } from './cancellation-refund/cancellation-refund.component';
import { PageRouteComponent } from './page-route.component';
import { JobSeekerCreateProfilePermissionComponent } from './job-seeker-create-profile-permission/job-seeker-create-profile-permission.component';
import { UnSubscribedComponent } from './un-subscribed/un-subscribed.component';
import { UnsubscribeDoneComponent } from './un-subscribed/unsubscribe-done/unsubscribe-done.component';

const routes: Routes = [
  {
    path: '', component: PageRouteComponent, children:
      [
        { path: 'terms-and-condition', component: TermsAndConditionComponent },
        { path: 'privacy-policy', component: PrivacyComponent },
        { path: 'contact-us', component: ContactUsComponent },
        { path: 'about-us', component: AboutUsComponent },
        { path: 'shipping', component: DeliveryShipmentComponent },
        { path: 'cancellation-return', component: CancellationRefundComponent },
        { path: 'job-seeker-permission', component: JobSeekerCreateProfilePermissionComponent }
      ]
  },
  {
    path: 'unsubscribeEmailList', component: UnSubscribedComponent
  },
  {
    path: 'sumnb/:unSubscribeEmailId', component: UnsubscribeDoneComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
