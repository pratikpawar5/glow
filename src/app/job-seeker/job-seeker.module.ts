import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { JobSeekerRoutingModule } from './job-seeker-routing.module';
import { MainLayoutModule } from '@layout/main-layout/main-layout.module';
import { JobSeekerService } from './job-seekers-services/job-seeker.service';
import { SharedModule } from 'app/shared/shared.module';
import { JobSeekerRoutePageComponent } from './job-seeker-route-page/job-seeker-route-page.component';
import { JobSeekerDetailPageComponent } from './job-seeker-route-page/job-seeker-detail-page/job-seeker-detail-page.component';
import { SmeHomeLayoutModule } from '@layout/sme-home-layout/sme-home-layout.module';
import { ShortListButtonDialogComponent } from './job-seeker-route-page/short-list-button-dialog/short-list-button-dialog.component';
import { JobSeekerMainPageComponent } from './job-seeker-main-page/job-seeker-main-page.component';
import { JobSeekerProfileDisplayComponent } from './job-seeker-main-page/job-seeker-profile-display/job-seeker-profile-display.component';
import { CreateCareerDesiredDialogComponent } from './job-seeker-main-page/job-seeker-profile-display/career-desired-profile/create-career-desired-dialog/create-career-desired-dialog.component';
import { UpdateCareerDesiredDialogComponent } from './job-seeker-main-page/job-seeker-profile-display/career-desired-profile/update-career-desired-dialog/update-career-desired-dialog.component';
import { UpdateEducationalDetailsDialogComponent } from './job-seeker-main-page/job-seeker-profile-display/educational/update-educational-details-dialog/update-educational-details-dialog.component';
import { CreateEducationalDetailsDialogComponent } from './job-seeker-main-page/job-seeker-profile-display/educational/create-educational-details-dialog/create-educational-details-dialog.component';
import { SkillSetDialogComponent } from './job-seeker-main-page/job-seeker-profile-display/skill-set-dialog/skill-set-dialog.component';
import { JobSeekerBasicDetailsDialogComponent } from './job-seeker-main-page/job-seeker-profile-display/job-seeker-basic-details-dialog/job-seeker-basic-details-dialog.component';
import { CreateExperienceDetailsDialogComponent } from './job-seeker-main-page/job-seeker-profile-display/experience/create-experience-details-dialog/create-experience-details-dialog.component';
import { UpdateExperienceDetailsDialogComponent } from './job-seeker-main-page/job-seeker-profile-display/experience/update-experience-details-dialog/update-experience-details-dialog.component';
import { JobSeekerAppliedJobsComponent } from './job-seeker-main-page/job-seeker-applied-jobs/job-seeker-applied-jobs.component';
import { MesssageFromRecruiterComponent } from './job-seeker-main-page/job-seeker-applied-jobs/messsage-from-recruiter/messsage-from-recruiter.component';

@NgModule({
  declarations: [
    JobSeekerProfileDisplayComponent,
    CreateCareerDesiredDialogComponent,
    UpdateCareerDesiredDialogComponent,
    UpdateEducationalDetailsDialogComponent,
    CreateEducationalDetailsDialogComponent,
    SkillSetDialogComponent,
    JobSeekerBasicDetailsDialogComponent,
    CreateExperienceDetailsDialogComponent,
    UpdateExperienceDetailsDialogComponent,
    JobSeekerRoutePageComponent,
    JobSeekerDetailPageComponent,
    ShortListButtonDialogComponent,
    JobSeekerMainPageComponent,
    JobSeekerAppliedJobsComponent,
    MesssageFromRecruiterComponent,
  ],
  imports: [
    CommonModule,
    JobSeekerRoutingModule,
    MainLayoutModule,
    SharedModule,
    SmeHomeLayoutModule,
  ],
  entryComponents: [
    CreateCareerDesiredDialogComponent,
    UpdateCareerDesiredDialogComponent,
    UpdateEducationalDetailsDialogComponent,
    CreateEducationalDetailsDialogComponent,
    SkillSetDialogComponent,
    JobSeekerBasicDetailsDialogComponent,
    CreateExperienceDetailsDialogComponent,
    UpdateExperienceDetailsDialogComponent,
    ShortListButtonDialogComponent,
    MesssageFromRecruiterComponent
  ],
  providers: [
    JobSeekerService,
    DatePipe
  ]
})
export class JobSeekerModule { }
