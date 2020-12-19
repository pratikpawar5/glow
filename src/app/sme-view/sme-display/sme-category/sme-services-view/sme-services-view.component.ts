import { Component, OnInit } from '@angular/core';
import { LazySmeViewService } from 'app/sme-view/http-service/lazy-sme-view.service';
import { environment } from 'environments/environment';
import { ServiceResponse } from '@models/service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '@services/token/token.service';
import { ItemType } from '@models/cart';
import { BusinessInterestService } from '@services/shared/business-interest.service';
import { AuthRouteComponent } from 'app/auth/auth-route/auth-route.component';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { MatDialog } from '@angular/material';
declare var ga: Function;
@Component({
  selector: 'app-sme-services-view',
  templateUrl: './sme-services-view.component.html',
  styleUrls: ['./sme-services-view.component.css']
})
export class SmeServicesViewComponent implements OnInit {

  services: Array<ServiceResponse>
  contentServer: string = environment.CONTENT_SERVER
  sUuid: string
  tokenSuuid: string
  showSpinner: boolean = true
  notFound: boolean

  constructor(private lazyService: LazySmeViewService, private route: ActivatedRoute,
    private token: TokenService, private bi: BusinessInterestService,
    private dialog: DialogService, private matDialog: MatDialog, router: Router) {
    this.route.parent.params.subscribe(params => {
      this.sUuid = params['sUuid']
    })
    ga('set', 'page', router.url);
    ga('send', 'pageview');
  }

  ngOnInit() {

    if (this.token.isLoggedIn()) {
      if(this.token.isSME()){
        this.tokenSuuid = this.token.getSmeId()
      }
    }

    this.lazyService.smeServices(this.sUuid).subscribe(
      res => {
        if (res.error) {
          this.showSpinner = false
          this.notFound = true
        } else {
          this.showSpinner = false
          this.services = res.data
        }
      },
      err => {
        this.showSpinner = false
        this.notFound = true
      }
    )
  }

  businessInterest(uuid: string, index: number) {

    if (this.token.isLoggedIn()) {

      this.services[index].addedToCart = true
      this.bi.generate(uuid, 1, ItemType.SERVICE, this.services[index].sUuid, false)

    } else {

      let ref = this.matDialog.open(AuthRouteComponent, this.dialog.loginConfig())
      ref.afterClosed().subscribe(
        res => {
          if (res) {
            this.services[index].addedToCart = true
            this.bi.generate(uuid, 1, ItemType.SERVICE, this.services[index].sUuid, true)
          }
        }
      )

    }
  }
}
