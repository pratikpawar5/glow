import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchServiceService } from '@services/search/search-service.service';
import { TokenService } from '@services/token/token.service';
import { PageTitleService } from '@services/page-title/page-title.service';
import { FilterResult } from '@models/filter';
import { ProductResponse } from '@models/product';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {

  filterResult: FilterResult<ProductResponse>
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
    this.title.updateTitle('Product Search')
  }

  getData(url: string) {
    this.showSpinner = true
    this.notFound = false
    this.filterResult = undefined

    this.searchService.getProductSearchResult(url, "0").subscribe(
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
