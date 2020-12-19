import { Component, OnInit, Input } from '@angular/core';
import { ServiceResponse } from '@models/service';
import { environment } from 'environments/environment';
import { NguCarouselConfig } from '@ngu/carousel';
import { BusinessInterestService } from '@services/shared/business-interest.service';
import { ItemType } from '@models/cart';
import { TokenService } from '@services/token/token.service';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { MatDialog } from '@angular/material';
import { AuthRouteComponent } from 'app/auth/auth-route/auth-route.component';

@Component({
  selector: 'app-slider-two',
  templateUrl: './slider-two.component.html',
  styleUrls: ['./slider-two.component.css']
})
export class SliderTwoComponent implements OnInit {

  @Input()
  services: Array<ServiceResponse>

  @Input()
  sUuid: string
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

  constructor(private bi: BusinessInterestService, private token: TokenService,
    private dialog: DialogService, private matDialog: MatDialog) {
  }

  ngOnInit() {
  }

  businessInterest(itemUuid: string, index: number) {

    if (this.token.isLoggedIn()) {

      this.services[index].addedToCart = true
      this.bi.generate(itemUuid, 1, ItemType.SERVICE, this.services[index].sUuid, false)

    } else {

      let ref = this.matDialog.open(AuthRouteComponent, this.dialog.loginConfig())
      ref.afterClosed().subscribe(
        res => {
          if (res) {
            this.services[index].addedToCart = true
            this.bi.generate(itemUuid, 1, ItemType.SERVICE, this.services[index].sUuid, true)
          }
        }
      )

    }

  }

}
