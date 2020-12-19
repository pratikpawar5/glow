import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SocialComponent } from './social.component';
import { BusinessPostHomeComponent } from './business-post-home/business-post-home.component';
import { PeopleYouMayKnowComponent } from './people-you-may-know/people-you-may-know.component';
import { SentRequestHomeComponent } from './sent-request-home/sent-request-home.component';
import { PendingRequestHomeComponent } from './pending-request-home/pending-request-home.component';
import { MyConnectionHomeComponent } from './my-connection-home/my-connection-home.component';

const routes: Routes = [
  {
    path: '', component: SocialComponent,
    children: [
      { path: '', component: BusinessPostHomeComponent },
      { path: 'people-you-may-know', component: PeopleYouMayKnowComponent },
      { path: 'sent-request-home', component: SentRequestHomeComponent },
      { path: 'pending-request-home', component: PendingRequestHomeComponent },
      { path: 'my-connection-home', component: MyConnectionHomeComponent }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocialRoutingModule { }
