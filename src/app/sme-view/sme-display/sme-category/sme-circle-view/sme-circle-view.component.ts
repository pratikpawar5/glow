import { Component, OnInit } from '@angular/core';
import { SMECircleDto, CircleStatus, BusinessCircle } from '@models/business-circle';
import { environment } from 'environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from '@services/common/snack-bar.service';
import { TokenService } from '@services/token/token.service';
import { PageTitleService } from '@services/page-title/page-title.service';
import { LazySmeViewService } from 'app/sme-view/http-service/lazy-sme-view.service';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { MatDialog } from '@angular/material';
import { MutualConnectionDialogComponent } from 'app/shared/components/mutual-connection-dialog/mutual-connection-dialog.component';
import { AuthRouteComponent } from 'app/auth/auth-route/auth-route.component';
const sentReqStatus = "SENT_REQ";

declare var ga: Function;
@Component({
  selector: 'app-sme-circle-view',
  templateUrl: './sme-circle-view.component.html',
  styleUrls: ['./sme-circle-view.component.css']
})
export class SmeCircleViewComponent implements OnInit {

  smeConnections: Array<SMECircleDto>
  sUuid: string
  circleNotFound: boolean = false
  isNew: boolean = false
  circleConnection: SMECircleDto[]
  circleStatus = new CircleStatus();
  isSME: boolean = false
  showSpinner: boolean = true
  notFound: boolean
  contentServer: string = environment.CONTENT_SERVER
  isDisableId: string
  constructor(private lazySmeViewService: LazySmeViewService,
    private route: ActivatedRoute,
    private router: Router, private snackbarService: SnackBarService,
    private token: TokenService, private matDialog: MatDialog,
    private dialog: DialogService, private pageTitleService: PageTitleService) {
    ga('set', 'page', router.url);
    ga('send', 'pageview');
  }
  ngOnInit() {
    this.pageTitleService.updateTitle('Circle')

    if (this.token.isLoggedIn() && this.token.isSME()) {
      this.isSME = true
    }

    this.sUuid = this.route.snapshot.root.firstChild.children[0].params['sUuid']
    this.lazySmeViewService.smeCircle(this.sUuid).subscribe(
      res => {
        if (!res.error && res.code == 200) {
          this.smeConnections = res.data
        }
        else {
          this.circleNotFound = true
        }
      },
    )

  }
  onOpenDialog(mutualConnections: SMECircleDto[], smeName: string) {
    this.matDialog.open(MutualConnectionDialogComponent, this.dialog.getMutualConnDialogConfig(mutualConnections, smeName))
  }
  onSendRequest(smeConnection,index) {
    this.isDisableId = smeConnection.sUuid
    let circle = new BusinessCircle()
    circle.smeId = smeConnection.sUuid
    this.lazySmeViewService.addBusinessRequest(circle).subscribe(
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
          this.isDisableId = smeConnection.sUuid;
          this.smeConnections[index].status = sentReqStatus
          this.snackbarService.open('Invitation Sent to ' + smeConnection.smeName);
        }
      },
    )
  }

  onClickCircleInvite(smeConnection: SMECircleDto, index) {
    if (!this.token.isLoggedIn()) {
      const dialogRef = this.matDialog.open(AuthRouteComponent, this.dialog.loginConfig())
      dialogRef.afterClosed().subscribe(
        res => {
          if (this.token.isSME()) {
            this.onSendRequest(smeConnection, index);
          }
          else if (this.token.isNormalUser()) {
            let c1 = window.confirm("To connect with" + smeConnection.smeName + "you need to Register as SME on gloqr")
            if (c1 === true) {
              this.router.navigateByUrl('/pricing');
            }
          }
        }
      )
    }
    else {
      if (this.token.isSME()) {
        this.onSendRequest(smeConnection, index);
      }
      else if (this.token.isNormalUser()) {
        let c2 = window.confirm("To connect with " + smeConnection.smeName + " you need to Register as SME on gloqr")
        if (c2 === true) {
          this.router.navigateByUrl('/pricing');
        }
      }
    }

  }
  
}
