import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { SMECircleDto } from '@models/business-circle';
import { PageTitleService } from '@services/page-title/page-title.service';
import { SocialService } from '../social-service/social.service';
import { DeleteObject, ObjectType } from '@models/common-delete';
import { SelectedCreditType, CreditType } from '@models/pricing';
import { SnackBarService } from '@services/common/snack-bar.service';
import { Router } from '@angular/router';
import { TokenService } from '@services/token/token.service';
import { MatDialog } from '@angular/material';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { NoCreditsLeftComponent } from 'app/shared/components/no-credits-left/no-credits-left.component';
import { BuyCreditsComponent } from 'app/shared/components/buy-credits/buy-credits.component';
import { DeleteObjectsComponent } from 'app/shared/components/delete-objects/delete-objects.component';
import { MutualConnectionDialogComponent } from 'app/shared/components/mutual-connection-dialog/mutual-connection-dialog.component';
declare var ga: Function;
@Component({
  selector: 'app-pending-request-home',
  templateUrl: './pending-request-home.component.html',
  styleUrls: ['./pending-request-home.component.css']
})
export class PendingRequestHomeComponent implements OnInit {

  ReceivedReq: SMECircleDto[];
  pendingRequestNotFound: boolean = false;
  seeMoreCount: number;
  contentServer: string = environment.CONTENT_SERVER;
  showSpinner: boolean = true
  notFound: boolean
  isDisableId: string
  sUuid:string
  constructor(private pageTitleService: PageTitleService, private token: TokenService,
    private router: Router, private matDialog: MatDialog, private dialog: DialogService,
    private snackbar: SnackBarService,
    private socialService: SocialService) { 
      ga('set', 'page', router.url);
      ga('send', 'pageview');
    }

  ngOnInit() {
    this.pageTitleService.updateTitle('Pending Request')

    this.socialService.getAllReceivedRequest().subscribe(
      res => {
        if (res.error) {
          this.showSpinner = false
          this.notFound = true
        }
        else {
          this.ReceivedReq = res.data;
          this.showSpinner = false

        }
      }
    );

  }

  onOpenDialog(mutualConnections: SMECircleDto[], smeName: string) {
    this.matDialog.open(MutualConnectionDialogComponent, this.dialog.getMutualConnDialogConfig(mutualConnections, smeName))
  }

  onConfirmRequest(rreq, index) {
    this.isDisableId = rreq.sUuid
    let makeCon = new SMECircleDto();
    makeCon.receiveReqUuid = rreq.receiveReqUuid;

    this.socialService.makeConnection(makeCon).subscribe(
      res => {
        if (!res.error) {
          this.snackbar.open('Request Accepted');
          this.ReceivedReq.splice(index, 1);
          this.socialService.incMyConnReqCount();
          this.socialService.decPendingReqCount()
        }
        else if (res.code == 402) {
          this.buyCredit(rreq.receiveReqUuid, index);
        }
      },
    );
  }


  buyCredit(receiveReqUuid, index) {
    let selectedCreditType: SelectedCreditType
    selectedCreditType = {
      creditType: CreditType.CIRCLE_CONNECTION,
      displayName: "Active Connections Allowed"
    }

    let ref = this.matDialog.open(NoCreditsLeftComponent, this.dialog.getNoCreditsDialogConfig(selectedCreditType))

    ref.afterClosed().subscribe(
      res => {
        if (res) {
          let buyRef = this.matDialog.open(BuyCreditsComponent, this.dialog.getBuyCreditsDialogConfig(selectedCreditType))
          buyRef.afterClosed().subscribe(
            res => {
              if (res) {
                this.onConfirmRequest(receiveReqUuid, index)
                  this.router.navigateByUrl('', { skipLocationChange: true }).then(() =>
                  this.router.navigate(['social', this.sUuid, 'pending-request-home']));
              }
              else {
              }
            }
          )
        }
        else{
          this.isDisableId = null;

        }
      })
  }


  onDeleteRequest(receiveRequest: SMECircleDto, index) {
    let delCon = new SMECircleDto();
    delCon.receiveReqUuid = receiveRequest.receiveReqUuid;
    delCon.smeName = receiveRequest.smeName
    delCon.sUuid = this.token.getSmeId();
    let deleteObj: DeleteObject<SMECircleDto> = {
      type: ObjectType.DELETE_PENDING_REQUEST,
      uuid: null,
      cirlceObjects: delCon
    }
    let ref = this.matDialog.open(DeleteObjectsComponent, this.dialog.getDeleteDialogConfig(deleteObj))
    ref.afterClosed().subscribe(
      res => {
        if (res) {
          this.ReceivedReq.splice(index, 1);
          this.socialService.decPendingReqCount();

        }
      }
    )
  }
  onSeeMore() {
    if (this.seeMoreCount >= 1) {
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
}
