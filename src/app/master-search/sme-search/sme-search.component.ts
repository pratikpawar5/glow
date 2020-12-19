import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PageTitleService } from '@services/page-title/page-title.service';
import { SearchServiceService } from '@services/search/search-service.service';
import { SMEFilterResponse } from '@models/sme';
import { TokenService } from '@services/token/token.service';

@Component({
  selector: 'app-sme-search',
  templateUrl: './sme-search.component.html',
  styleUrls: ['./sme-search.component.css']
})
export class SmeSearchComponent implements OnInit {

  isSME: boolean
  showSpinner: boolean = true
  notFound: boolean

  filterAndResult: SMEFilterResponse

  constructor(private token: TokenService, private router: Router, route: ActivatedRoute, private searchService: SearchServiceService,
    private title: PageTitleService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    route.queryParams.subscribe(
      res => {
        let url: string = router.url.substring(1)

        if (this.token.isLoggedIn() && this.token.isSME()) {
          this.isSME = true
        } else {
          this.isSME = false
        }
        this.getData(url, this.isSME)
      }
    )
  }

  ngOnInit() {
    this.title.updateTitle('SME Search')
  }

  getData(url: string, isSME: boolean) {
    this.showSpinner = true
    this.notFound = false
    this.searchService.getSMESearchResult(url, this.isSME, "0").subscribe(
      res => {
        if (res.error) {
          this.showSpinner = false
          this.notFound = true
        } else {

          this.showSpinner = false
          this.filterAndResult = res.data
        }
      },
      err => {
        this.showSpinner = false
        this.notFound = true
      }
    )
  }

}
