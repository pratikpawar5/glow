import { Routes, RouterModule } from "@angular/router";
import { SmeViewHomeComponent } from './sme-view-home.component';
import { SmeDisplayComponent } from './sme-display/sme-display.component';
import { SmeCertificatesViewComponent } from './sme-display/sme-category/sme-certificates-view/sme-certificates-view.component';
import { SmeInfrastructuresViewComponent } from './sme-display/sme-category/sme-infrastructures-view/sme-infrastructures-view.component';
import { SmeManagementTeamViewComponent } from './sme-display/sme-category/sme-management-team-view/sme-management-team-view.component';
import { SmeGalleriesViewComponent } from './sme-display/sme-category/sme-galleries-view/sme-galleries-view.component';
import { SmeCircleViewComponent } from './sme-display/sme-category/sme-circle-view/sme-circle-view.component';
import { SmeServicesViewComponent } from './sme-display/sme-category/sme-services-view/sme-services-view.component';
import { SmeVacanciesViewComponent } from './sme-display/sme-category/sme-vacancies-view/sme-vacancies-view.component';
import { SmeSocialPostViewComponent } from './sme-display/sme-category/sme-social-post-view/sme-social-post-view.component';
import { SmeProductsViewComponent } from './sme-display/sme-category/sme-products-view/sme-products-view.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '', component: SmeViewHomeComponent,
        children: [
            { path: '', component: SmeDisplayComponent },
            { path: 'products', component: SmeProductsViewComponent },
            { path: 'services', component: SmeServicesViewComponent },
            { path: 'certificates', component: SmeCertificatesViewComponent },
            { path: 'infrastructures', component: SmeInfrastructuresViewComponent },
            { path: 'management-teams', component: SmeManagementTeamViewComponent },
            { path: 'galleries', component: SmeGalleriesViewComponent },
            { path: 'jobs', component: SmeVacanciesViewComponent },
            { path: 'circle', component: SmeCircleViewComponent },
            { path: 'postView', component: SmeSocialPostViewComponent },
            { path: 'contact-us', component: SmeDisplayComponent }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class SMEViewRoutingModule { }