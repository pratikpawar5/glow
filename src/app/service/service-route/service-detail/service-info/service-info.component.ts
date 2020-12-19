import { Component, OnInit, Input } from '@angular/core';
import { Service } from '@models/service';
import { BusinessInterestService } from '@services/shared/business-interest.service';
import { ItemType } from '@models/cart';
import { TokenService } from '@services/token/token.service';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { MatDialog } from '@angular/material';
import { AuthRouteComponent } from 'app/auth/auth-route/auth-route.component';

@Component({
  selector: 'app-service-info',
  templateUrl: './service-info.component.html',
  styleUrls: ['./service-info.component.css']
})
export class ServiceInfoComponent implements OnInit {

  @Input()
  service: Service

  @Input()
  sUuid: string

  constructor(private bi: BusinessInterestService, private token: TokenService,
    private dialog: DialogService, private matDialog: MatDialog) { }

  ngOnInit() {
  }

  businessInterest(uuid: string) {
    if (this.token.isLoggedIn()) {

      this.service.addedToCart = true
      this.bi.generate(uuid, 1, ItemType.SERVICE, this.service.sUuid, false)

    } else {

      let ref = this.matDialog.open(AuthRouteComponent, this.dialog.loginConfig())
      ref.afterClosed().subscribe(
        res => {
          if (res) {
            this.service.addedToCart = true
            this.bi.generate(uuid, 1, ItemType.SERVICE, this.service.sUuid, true)
          }
        }
      )

    }
  }
}
