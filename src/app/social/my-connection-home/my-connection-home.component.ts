import { Component, OnInit } from '@angular/core';
import { SMECircleDto, CirclePrivacy, CountAndData, BusinessCircle } from '@models/business-circle';
import { environment } from 'environments/environment';
import { PageTitleService } from '@services/page-title/page-title.service';
import { SocialService } from '../social-service/social.service';
import { TokenService } from '@services/token/token.service';
import { DeleteObject, ObjectType } from '@models/common-delete';
import { SelectedCreditType, CreditType } from '@models/pricing';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { BuyCreditsComponent } from 'app/shared/components/buy-credits/buy-credits.component';
import { NoCreditsLeftComponent } from 'app/shared/components/no-credits-left/no-credits-left.component';
import { DeleteObjectsComponent } from 'app/shared/components/delete-objects/delete-objects.component';
import { MutualConnectionDialogComponent } from 'app/shared/components/mutual-connection-dialog/mutual-connection-dialog.component';
import { Router } from '@angular/router';
import { CirclePrivacyComponent } from './circle-privacy/circle-privacy.component';
declare var ga: Function;
@Component({
  selector: 'app-my-connection-home',
  templateUrl: './my-connection-home.component.html',
  styleUrls: ['./my-connection-home.component.css']
})
export class MyConnectionHomeComponent implements OnInit {
  countAndData:CountAndData
  myConnection: boolean = false
  contentServer: string = environment.CONTENT_SERVER
  showSpinner: boolean = true
  notFound: boolean
  circlePrivacyDialogComponent: MatDialogRef<CirclePrivacyComponent>;
  circlePrivacy:string
  constructor(private pageTitleService: PageTitleService, router: Router,
    private dialog: DialogService, private matDialog: MatDialog, private token: TokenService,
    private socialService: SocialService) {
    ga('set', 'page', router.url);
    ga('send', 'pageview');
  }

  ngOnInit() {
    this.pageTitleService.updateTitle('My Connection')
    this.socialService.getCircleConnectionPrivacy().subscribe(
      res => {
        if (res.error) {
        }
        else {
          this.circlePrivacy = res.data.circlePrivacy
        }
      }
    )

    this.socialService.getMyCircleConnection().subscribe(
      res => {
        if (res.error) {
          this.showSpinner = false
          this.notFound = true
        }
        else {
          this.countAndData = res.data;
          this.showSpinner = false
        }
      }
    );
  }

  onOpenDialog(mutualConnections: SMECircleDto[], smeName: string) {
    this.matDialog.open(MutualConnectionDialogComponent, this.dialog.getMutualConnDialogConfig(mutualConnections, smeName))
  }
  onRemoveConnection(smeCircleDto: SMECircleDto, index) {
    let removeCon = new SMECircleDto();
    removeCon.connectionUuid = smeCircleDto.connectionUuid;
    removeCon.smeName = smeCircleDto.smeName
    removeCon.sUuid = this.token.getSmeId();

    let deleteObj: DeleteObject<SMECircleDto> = {
      type: ObjectType.DELETE_CONNECTION,
      uuid: null,
      cirlceObjects: removeCon
    }
    let ref = this.matDialog.open(DeleteObjectsComponent, this.dialog.getDeleteDialogConfig(deleteObj))
    ref.afterClosed().subscribe(
      res => {
        if (res) {
          this.countAndData.data.splice(index, 1);
          this.socialService.decMyConnReqCount()
        }
      }
    )
  }

  onSeeMore() {
    if (this.countAndData.seeMoreCount >= 1) {
      let selectedCreditType: SelectedCreditType
      selectedCreditType = {
        creditType: CreditType.CIRCLE_CONNECTION,
        displayName: "Active Connections Allowed"
      }
      let ref = this.matDialog.open(NoCreditsLeftComponent, this.dialog.getNoCreditsDialogConfig(selectedCreditType))
      ref.afterClosed().subscribe(
        res => {
          if (res) {
            this.matDialog.open(BuyCreditsComponent, this.dialog.getBuyCreditsDialogConfig(selectedCreditType))
          }
        }
      )
    }
  }

  onClickSetting() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = false
    dialogConfig.width = '400px';
    dialogConfig.height = '200px';
    dialogConfig.data = this.circlePrivacy
    this.circlePrivacyDialogComponent = this.matDialog.open(CirclePrivacyComponent, dialogConfig);
  }
}
