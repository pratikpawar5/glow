import { Component, OnInit, Input } from '@angular/core';
import { Service, ServiceResponse } from '@models/service';
import { environment } from 'environments/environment';
import { NguCarouselConfig } from '@ngu/carousel';
import { TokenService } from '@services/token/token.service';
import { LazySmeService } from 'app/service/http-service/lazy-sme.service';
import { BusinessInterestService } from '@services/shared/business-interest.service';
import { ItemType } from '@models/cart';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { MatDialog } from '@angular/material';
import { AuthRouteComponent } from 'app/auth/auth-route/auth-route.component';

@Component({
  selector: 'app-similar-services',
  templateUrl: './similar-services.component.html',
  styleUrls: ['./similar-services.component.css']
})
export class SimilarServicesComponent implements OnInit {

  @Input()
  service: Service

  sUuid: string

  similarServices: Array<ServiceResponse>
  contentServer: string = environment.CONTENT_SERVER

  carousel: NguCarouselConfig = {
    grid: { xs: 1, sm: 3, md: 5, lg: 6, all: 0 },
    slide: 3,
    speed: 150,
    point: {
      visible: false
    },
    load: 6,
  }

  constructor(private token: TokenService, private lazyService: LazySmeService,
    private bi: BusinessInterestService, private dialog: DialogService, private matDialog: MatDialog) { }

  ngOnInit() {
    if (this.service.subCategory) {
      this.lazyService.similarServices(this.service.subCategory.subCategoryUuid,
        this.service.serviceUuid).subscribe(
          res => {
            if (!res.error) {
              this.similarServices = res.data
            }
          }
        )
    }
  }

  businessInterest(uuid: string, index: number) {
    if (this.token.isLoggedIn()) {

      this.similarServices[index].addedToCart = true
      this.bi.generate(uuid, 1, ItemType.SERVICE, this.similarServices[index].sUuid, false)

    } else {

      let ref = this.matDialog.open(AuthRouteComponent, this.dialog.loginConfig())
      ref.afterClosed().subscribe(
        res => {
          if (res) {
            this.similarServices[index].addedToCart = true
            this.bi.generate(uuid, 1, ItemType.SERVICE, this.similarServices[index].sUuid, true)
          }
        }
      )

    }

  }
}
