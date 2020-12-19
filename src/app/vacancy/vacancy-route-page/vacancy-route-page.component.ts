import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { JobView } from '@models/jobs';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from '@services/token/token.service';
import { JobPostService } from '@services/job-post/job-post.service';

@Component({
  selector: 'app-vacancy-route-page',
  templateUrl: './vacancy-route-page.component.html',
  styleUrls: ['./vacancy-route-page.component.css']
})
export class VacancyRoutePageComponent implements OnInit {

  smeJob: JobView
  subcription$: Subscription
  constructor(private route: ActivatedRoute, private token: TokenService, private jobPosting: JobPostService) {
    this.subcription$ = this.route.params.subscribe(
      params => {
        this.vacancyByJobUuid(params['vacancyUuid'])
      }
    )
  }

  vacancyByJobUuid(jobUuid: string) {
    if (this.token.isLoggedIn()) {
      this.forUser(jobUuid);
    } else {
      this.forAll(jobUuid)
    }
  }

  ngOnInit() {
  }

  forAll(jobUuid: string) {
    this.jobPosting.getJobByJobUuidforViewMode(jobUuid).subscribe(
      res => {
        if (res.error) {

        }
        else {
          this.smeJob = res.data

        }
      },
    )
  }

  forUser(jobUuid: string) {
    this.jobPosting.getJobsByUuidTypeUSER(jobUuid, this.token.getUserId()).subscribe(
      res => {
        if (res.error) {

        }
        else {
          this.smeJob = res.data
        }

      },
    )
  }

  ngOnDestroy(): void {
    this.subcription$.unsubscribe()
  }

}
