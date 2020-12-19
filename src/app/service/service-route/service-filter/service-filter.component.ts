import { Component, OnInit, HostListener } from '@angular/core';
import { LazySmeService } from 'app/service/http-service/lazy-sme.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FilterResult } from '@models/filter';
import { ServiceResponse } from '@models/service';
import { TokenService } from '@services/token/token.service';
declare var ga: Function;
@Component({
  selector: 'app-service-filter',
  templateUrl: './service-filter.component.html',
  styleUrls: ['./service-filter.component.css']
})
export class ServiceFilterComponent implements OnInit {

  filterResult: FilterResult<ServiceResponse>
  subscription$: Subscription

  showSpinner: boolean = false
  notFound: boolean

  constructor(private service: LazySmeService, router: Router, route: ActivatedRoute,
    private token: TokenService) {
      route.queryParams.subscribe(
        res => {
          this.getResult(router.url)
        }
      )
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  getResult(url: string) {
    this.showSpinner = true
    this.filterResult = undefined
    this.notFound = false
    this.service.servicesByCategory(url, "0").subscribe(
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
