import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { JobSeekerRoutePageComponent } from './job-seeker-route-page/job-seeker-route-page.component';
import { UserGuardService } from 'app/core/guards/user-guard.service';
import { JobSeekerProfileDisplayComponent } from './job-seeker-main-page/job-seeker-profile-display/job-seeker-profile-display.component';
import { JobSeekerAppliedJobsComponent } from './job-seeker-main-page/job-seeker-applied-jobs/job-seeker-applied-jobs.component';
import { JobSeekerMainPageComponent } from './job-seeker-main-page/job-seeker-main-page.component';

const routes: Routes = [
    {
        path: '', component: JobSeekerMainPageComponent, canActivate: [UserGuardService],
        children: [
            { path: 'job-seeker-display', component: JobSeekerProfileDisplayComponent },
            { path: 'applied-jobs', component: JobSeekerAppliedJobsComponent },
        ]
    },
    { path: 'j/:applicantUuid', component: JobSeekerRoutePageComponent },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class JobSeekerRoutingModule { }