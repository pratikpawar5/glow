import { Component, OnInit } from '@angular/core';
import { SmeService } from '@services/sme/sme.service';
import { TokenService } from '@services/token/token.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PageTitleService } from '@services/page-title/page-title.service';
import { Subscription } from 'rxjs';
import { JobSeeker, JobApplicantDto } from '@models/jobs';
import { JobPostService } from '@services/job-post/job-post.service';
import { SMEInformationVo } from '@models/sme';

@Component({
  selector: 'app-job-seeker-route-page',
  templateUrl: './job-seeker-route-page.component.html',
  styleUrls: ['./job-seeker-route-page.component.css']
})
export class JobSeekerRoutePageComponent implements OnInit {

  smes: SMEInformationVo
  jobApplicantDto: JobApplicantDto
  subcription$: Subscription
  constructor(private smeService: SmeService, private token: TokenService,
    private title: PageTitleService, private router: Router, private route: ActivatedRoute, private jobPosting: JobPostService) {
    this.subcription$ = this.route.params.subscribe(
      params => {
        this.jobApplicantByApplicantUuid(params['applicantUuid'])
      }
    )
  }

  jobApplicantByApplicantUuid(applicantUuid: string) {
    if (this.token.isLoggedIn()) {
      this.getSingleApplicant(applicantUuid);
    }
  }

  ngOnInit() {
    this.smeService.getSmeNameAndImage(this.token.getSmeId()).subscribe(
      res => {
        if (res.error) {
        }
        else {
          this.smes = res.data
          this.title.updateTitle(this.smes.smeName)
          this.title.updateMetaTitle(res.data.smeName)
          this.title.updateMetaInfo(this.smes.smeName + ', ' + this.smes.smeAddress.locality +
            ', ' + this.smes.smeAddress.city)
          this.title.updateMetaURL(this.router.url)
          this.title.updateMetaImage(this.smes.logoImage)
        }
      }
    )

    window.scrollTo(0, 0)
  }


  getSingleApplicant(applicantUuid: string) {
    this.jobPosting.getSingleJobApplicantProfile(applicantUuid).subscribe(
      res => {
        if (res.error) {

        }
        else {
          this.jobApplicantDto = res.data
        }
      },
    )
  }

  ngOnDestroy(): void {
    this.subcription$.unsubscribe()
  }
}
