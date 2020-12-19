import { Component, OnInit, Input } from '@angular/core';
import { Result } from '@models/filter';
import { ServiceResponse } from '@models/service';
import { BusinessInterestService } from '@services/shared/business-interest.service';
import { TokenService } from '@services/token/token.service';
import { ItemType } from '@models/cart';
import { environment } from 'environments/environment';
import { AuthRouteComponent } from 'app/auth/auth-route/auth-route.component';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { LazySmeService } from 'app/service/http-service/lazy-sme.service';

@Component({
  selector: 'app-service-result',
  templateUrl: './service-result.component.html',
  styleUrls: ['./service-result.component.css']
})
export class ServiceResultComponent implements OnInit {

  @Input()
  response: Result<ServiceResponse>

  @Input()
  category: any

  sUuid: string
  contentServer: string = environment.CONTENT_SERVER

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

  constructor(private bi: BusinessInterestService, private token: TokenService,
    private dialog: DialogService, private matDialog: MatDialog, private router: Router,
    route: ActivatedRoute, private service: LazySmeService) {
    route.queryParams.subscribe(
      res => {
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

  onScrollDown() {
    if (this.response.result.length >= (this.page * 40)) {
      this.page++;
      this.service.servicesByCategory(this.router.url, this.page.toLocaleString()).subscribe(
        res => {
          if (res.error) {
            this.showSpinner = false
          } else {
            this.showSpinner = false
            this.response.result.push(...res.data.response.result)
          }
        }
      )
    }

  }

  businessInterest(uuid: string, index: number) {

    if (this.token.isLoggedIn()) {

      this.response.result[index].addedToCart = true
      this.bi.generate(uuid, 1, ItemType.SERVICE, this.response.result[index].sUuid, false)

    } else {

      let ref = this.matDialog.open(AuthRouteComponent, this.dialog.loginConfig())
      ref.afterClosed().subscribe(
        res => {
          if (res) {
            this.response.result[index].addedToCart = true
            this.bi.generate(uuid, 1, ItemType.SERVICE, this.response.result[index].sUuid, true)
          }
        }
      )

    }

  }

  sort(sortBy: string) {
    this.router.navigate([], {
      queryParams: { sort: sortBy },
      queryParamsHandling: 'merge'
    })
  }
}
