import { Component, OnInit } from '@angular/core';
import { SocialService } from '../social-service/social.service';
import { TokenService } from '@services/token/token.service';
import { environment } from 'environments/environment';
import { BusinessCircle, SMECircleDto } from '@models/business-circle';
import { SnackBarService } from '@services/common/snack-bar.service';
import { MutualConnectionDialogComponent } from 'app/shared/components/mutual-connection-dialog/mutual-connection-dialog.component';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
declare var ga: Function;
@Component({
  selector: 'app-people-you-may-know',
  templateUrl: './people-you-may-know.component.html',
  styleUrls: ['./people-you-may-know.component.css']
})
export class PeopleYouMayKnowComponent implements OnInit {

  showButton: boolean = true
  suggestions = new Array<SMECircleDto>();
  contentServer: string = environment.CONTENT_SERVER
  showSpinner: boolean = true
  notFound: boolean
  isDisableId: string

  //PAGINATION. CURRENTLY NOTE IN USE
  page: number = 1;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  //

  constructor(private socialService: SocialService, private matDialog: MatDialog,
    private dialog: DialogService, private token: TokenService, private snackBar: SnackBarService, router: Router) {
    ga('set', 'page', router.url);
    ga('send', 'pageview');
  }

  ngOnInit() {
    this.getSuggestions(this.page);
  }

  getSuggestions(page: number) {
    this.socialService.getSuggestions(page, null).subscribe(
      res => {
        if (!res.error) {
          this.suggestions.push(...res.data);
          this.showSpinner = false
        } else {
          this.showSpinner = false
        }
        if (this.suggestions.length <= 0) {
          this.notFound = true;
        }
      }
    );
  }

  onScrollDown() {
    this.getSuggestions(++this.page);
  }



  onOpenDialog(mutualConnections: SMECircleDto[], smeName: string) {

    this.matDialog.open(MutualConnectionDialogComponent, this.dialog.getMutualConnDialogConfig(mutualConnections, smeName))
  }

  onSendRequest(platformSMEs, index) {
    this.isDisableId = platformSMEs.sUuid
    let circle = new BusinessCircle()
    circle.smeId = platformSMEs.sUuid
    this.socialService.addBusinessRequest(circle).subscribe(
      response => {
        if (response.error && response.code === 404) {
          this.isDisableId = null
          window.alert("This functionality will be active as soon as your SME is Verified by our gloqr team")
        }
        else if (response.error && response.customErrorCode === 100) {
          window.alert("Request already sent to given SME");
        }
        else if (response.error && response.customErrorCode === 101) {
          window.alert("Already Connected");
        }
        else if (response.error && response.customErrorCode === 102) {
          window.alert("Already in Receive Request");
        }
        else {
          this.snackBar.open('Invitation Sent to ' + platformSMEs.smeName);
          this.suggestions.splice(index, 1);
          this.socialService.incSentReqCount();
        }
      }
    )
  }

  close(platformSMEs, index) {
    this.suggestions.splice(index, 1);
  }

}
