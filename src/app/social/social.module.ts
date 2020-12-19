import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialRoutingModule } from './social-routing.module';
import { SocialComponent } from './social.component';
import { ProfileContentsComponent } from './profile-contents/profile-contents.component';
import { BusinessPostHomeComponent } from './business-post-home/business-post-home.component';
import { WriteBusinessPostComponent } from './business-post-home/write-business-post/write-business-post.component';
import { DisplayBusinessPostComponent } from './business-post-home/display-business-post/display-business-post.component';
import { RightSideComponent } from './business-post-home/right-side/right-side.component';
import { BiPostHomeBreadCrumbsComponent } from './business-post-home/bi-post-home-bread-crumbs/bi-post-home-bread-crumbs.component';
import { SharedModule } from 'app/shared/shared.module';
import { PeopleYouMayKnowComponent } from './people-you-may-know/people-you-may-know.component';
import { SentRequestHomeComponent } from './sent-request-home/sent-request-home.component';
import { PendingRequestHomeComponent } from './pending-request-home/pending-request-home.component';
import { MyConnectionHomeComponent } from './my-connection-home/my-connection-home.component';
import { SmeHomeLayoutModule } from '@layout/sme-home-layout/sme-home-layout.module';
import { SocialService } from './social-service/social.service';
import { MyConnectionBreadCrumbsComponent } from './my-connection-home/my-connection-bread-crumbs/my-connection-bread-crumbs.component';
import { PendingRequestBreadCrumbsComponent } from './pending-request-home/pending-request-bread-crumbs/pending-request-bread-crumbs.component';
import { SentRequestBreadCrumbsComponent } from './sent-request-home/sent-request-bread-crumbs/sent-request-bread-crumbs.component';
import { PeopleYouMayKnowBreadCrumbsComponent } from './people-you-may-know/people-you-may-know-bread-crumbs/people-you-may-know-bread-crumbs.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { PrivateConnectionDialogBoxComponent } from './business-post-home/write-business-post/private-connection-dialog-box/private-connection-dialog-box.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CirclePrivacyComponent } from './my-connection-home/circle-privacy/circle-privacy.component';
import { NgxGalleryModule } from 'ngx-gallery';
import {ChartModule} from 'primeng/chart';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { CustomPipesModule } from 'app/custom-pipes/custom-pipes.module';

@NgModule({
  declarations: [
    SocialComponent,
    ProfileContentsComponent,
    BusinessPostHomeComponent,
    WriteBusinessPostComponent,
    DisplayBusinessPostComponent,
    RightSideComponent,
    BiPostHomeBreadCrumbsComponent,
    PeopleYouMayKnowComponent,
    SentRequestHomeComponent,
    PendingRequestHomeComponent,
    MyConnectionHomeComponent,
    MyConnectionBreadCrumbsComponent,
    PendingRequestBreadCrumbsComponent,
    SentRequestBreadCrumbsComponent,
    PeopleYouMayKnowBreadCrumbsComponent,
    PrivateConnectionDialogBoxComponent,
    CirclePrivacyComponent,    
  ],
  imports: [
    CommonModule,
    SocialRoutingModule,
    SmeHomeLayoutModule,
    SharedModule,
    InfiniteScrollModule,
    ScrollToModule.forRoot(),
    DeviceDetectorModule.forRoot(),
    NgxGalleryModule,
    ChartModule,
    CustomPipesModule
  ],
  providers: [
    SocialService
  ],
  entryComponents: [
    PrivateConnectionDialogBoxComponent,
    CirclePrivacyComponent
  ]
})
export class SocialModule { }
