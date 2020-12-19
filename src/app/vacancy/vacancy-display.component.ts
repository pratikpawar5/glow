import { Component, OnInit, HostListener } from '@angular/core';
import { JobPostService } from '@services/job-post/job-post.service';
import { PageTitleService } from '@services/page-title/page-title.service';
import { Router, ActivatedRoute } from '@angular/router';
import { JobFilterResponse } from '@models/jobs';
declare var ga: Function;
@Component({
  selector: 'app-vacancy-display',
  templateUrl: './vacancy-display.component.html',
  styleUrls: ['./vacancy-display.component.css']
})
export class VacancyDisplayComponent implements OnInit {

  showSpinner: boolean = false
  jobFilterAndResult: JobFilterResponse
  totalVacanciesCount: number
  windowScrolled: boolean
  constructor(private jobPostService: JobPostService, private pageTitleService: PageTitleService, router: Router,
    route: ActivatedRoute) {

    router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    route.queryParams.subscribe(
      res => {
        this.showSpinner = true
        this.smeJobDisplay(router.url)
      }
    )
  }

  ngOnInit() {
    this.pageTitleService.updateTitle('Job Filter');
  }
  smeJobDisplay(url: string) {
    this.showSpinner = true
    this.jobPostService.getAllJobs(url).subscribe(
      res => {
        if (!res.error) {
          this.jobFilterAndResult = res.data
          this.showSpinner = false
        }
        else {


        }
      },

    )
  }
  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (window.pageYOffset > 500) {
      this.windowScrolled = true;
    }
    else if (this.windowScrolled && window.pageYOffset < 50) {
      this.windowScrolled = false;
    }
  }
}
