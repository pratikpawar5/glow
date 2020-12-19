import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'environments/environment';
import { BusinessInterestService } from '@services/shared/business-interest.service';
import { TokenService } from '@services/token/token.service';
import { ItemType } from '@models/cart';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { MatDialog } from '@angular/material';
import { AuthRouteComponent } from 'app/auth/auth-route/auth-route.component';
import { ServiceResponse } from '@models/service';
import { Result } from '@models/filter';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchServiceService } from '@services/search/search-service.service';

@Component({
  selector: 'app-service-result',
  templateUrl: './service-result.component.html',
  styleUrls: ['./service-result.component.css']
})
export class ServiceResultComponent implements OnInit {

  @Input()
  services: Result<ServiceResponse>
  contentServer: string = environment.CONTENT_SERVER
  sUuid: string
  searchText: string

  asc: string = 'asc';
  desc: string = 'desc';
  popularity: string = 'popularity'
  newest: string = 'new'
  sortBy: string

  page = 0;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;

  showSpinner: boolean

  constructor(private bi: BusinessInterestService, private dialog: DialogService,
    private token: TokenService, private matDialog: MatDialog, route: ActivatedRoute, private router: Router,
    private searchService: SearchServiceService) {
    route.queryParams.subscribe(
      res => {
        this.searchText = res['searchText']

        let s = res['sort']
        if (s === this.asc) {
          this.sortBy = this.asc
        } else if (s === this.desc) {
          this.sortBy = this.desc
        } else if (s === this.newest) {
          this.sortBy = this.newest
        } else {
          this.sortBy = this.popularity
        }
      }
    )
  }

  ngOnInit() {
    if (this.token.isLoggedIn()) {
      if (this.token.isSME()) {
        this.sUuid = this.token.getSmeId()
      }
    }
  }

  sort(sortBy: string) {
    this.router.navigate([], {
      queryParams: { sort: sortBy },
      queryParamsHandling: 'merge'
    })
  }

  onScrollDown() {

    if (this.services.result.length >= (this.page * 40)) {
      this.page++;
      this.searchService.getServiceSearchResult(this.router.url.substring(1), this.page.toLocaleString()).subscribe(
        res => {
          if (res.error) {
            this.showSpinner = false
          } else {
            this.showSpinner = false
            this.services.result.push(...res.data.response.result)
          }
        }
      )
    }

  }


  businessInterest(uuid: string, index: number) {

    if (this.token.isLoggedIn()) {

      this.services.result[index].addedToCart = true
      this.bi.generate(uuid, 1, ItemType.SERVICE, this.services.result[index].sUuid, false)

    } else {

      let ref = this.matDialog.open(AuthRouteComponent, this.dialog.loginConfig())
      ref.afterClosed().subscribe(
        res => {
          if (res) {
            this.services.result[index].addedToCart = true
            this.bi.generate(uuid, 1, ItemType.SERVICE, this.services.result[index].sUuid, true)
          }
        }
      )

    }
  }


}
