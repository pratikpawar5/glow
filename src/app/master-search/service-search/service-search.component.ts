import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchServiceService } from '@services/search/search-service.service';
import { PageTitleService } from '@services/page-title/page-title.service';
import { TokenService } from '@services/token/token.service';
import { ServiceResponse } from '@models/service';
import { FilterResult } from '@models/filter';
@Component({
  selector: 'app-service-search',
  templateUrl: './service-search.component.html',
  styleUrls: ['./service-search.component.css']
})
export class ServiceSearchComponent implements OnInit {

  filterResult: FilterResult<ServiceResponse>
  showSpinner: boolean = true
  notFound: boolean

  constructor(router: Router, route: ActivatedRoute, private searchService: SearchServiceService, 
    private title: PageTitleService) {
    route.queryParams.subscribe(
      res => {
        let url: string = router.url.substring(1)
        this.getData(url)
      }
    )
  }

  ngOnInit() {
    this.title.updateTitle('Service Search')
  }

  getData(url: string) {
    this.showSpinner = true
    this.notFound = false
    this.filterResult = undefined

    this.searchService.getServiceSearchResult(url, "0").subscribe(
      res => {
        if (res.error) {
          this.showSpinner = false
          this.notFound = true
        } else {
          this.showSpinner = false
          this.filterResult = res.data
        }
      },
      err => {
        this.showSpinner = false
        this.notFound = true
      }
    )

  }
}

