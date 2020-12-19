import { Component, OnInit } from '@angular/core';
import { SMECircleDto } from '@models/business-circle';
import { environment } from 'environments/environment';
import { PageTitleService } from '@services/page-title/page-title.service';
import { TokenService } from '@services/token/token.service';
import { SocialService } from '../social-service/social.service';
import { DeleteObject, ObjectType } from '@models/common-delete';
import { DeleteObjectsComponent } from 'app/shared/components/delete-objects/delete-objects.component';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { MatDialog } from '@angular/material';
import { MutualConnectionDialogComponent } from 'app/shared/components/mutual-connection-dialog/mutual-connection-dialog.component';
import { Router } from '@angular/router';
declare var ga: Function;
@Component({
  selector: 'app-sent-request-home',
  templateUrl: './sent-request-home.component.html',
  styleUrls: ['./sent-request-home.component.css']
})
export class SentRequestHomeComponent implements OnInit {

  sendReqs: SMECircleDto[];
  contentServer: string = environment.CONTENT_SERVER
  showSpinner: boolean = true
  notFound: boolean
  constructor(private pageTitleService: PageTitleService, router: Router,
    private dialog: DialogService, private matDialog: MatDialog,
    private token: TokenService, private socialService: SocialService) {
    ga('set', 'page', router.url);
    ga('send', 'pageview');
  }

  ngOnInit() {
    this.pageTitleService.updateTitle('Sent Request')
    this.socialService.getAllSentRequest().subscribe(
      res => {
        if (res.error) {
          this.showSpinner = false
          this.notFound = true
        }
        else {
          this.sendReqs = res.data;
          this.showSpinner = false
        }
      }
    );
  }


  cancelSentrequest(sendRequest: SMECircleDto, index) {
    let cancelCon = new SMECircleDto();
    cancelCon.sendReqUuid = sendRequest.sendReqUuid;
    cancelCon.smeName = sendRequest.smeName;
    cancelCon.sUuid = this.token.getSmeId();

    let deleteObj: DeleteObject<SMECircleDto> = {
      type: ObjectType.DELETE_SENT_REQUEST,
      uuid: null,
      cirlceObjects: cancelCon
    }

    let ref = this.matDialog.open(DeleteObjectsComponent, this.dialog.getDeleteDialogConfig(deleteObj))
    ref.afterClosed().subscribe(
      res => {
        if (res) {
          this.sendReqs.splice(index, 1);
          this.socialService.decSentReqCount();
        }
      }
    )
  }
  onOpenDialog(mutualConnections: SMECircleDto[], smeName: string) {
    this.matDialog.open(MutualConnectionDialogComponent, this.dialog.getMutualConnDialogConfig(mutualConnections, smeName))
  }

}
