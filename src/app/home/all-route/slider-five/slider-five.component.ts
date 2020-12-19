import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'environments/environment';
import { NguCarouselConfig } from '@ngu/carousel';
import { TokenService } from '@services/token/token.service';
import { BusinessCircle, SMECircleDto } from '@models/business-circle';
import { SnackBarService } from '@services/common/snack-bar.service';
import { HomeService } from '@services/home/home.service';
import { SMEInformationVo } from '@models/sme';
import { MatDialog } from '@angular/material';
import { AuthRouteComponent } from 'app/auth/auth-route/auth-route.component';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { Router } from '@angular/router';
const sentReqStatus = "SENT_REQ";

@Component({
  selector: 'app-slider-five',
  templateUrl: './slider-five.component.html',
  styleUrls: ['./slider-five.component.css']
})
export class SliderFiveComponent implements OnInit {
  @Input()
  smes: Array<SMEInformationVo>;
  isSME: boolean
  contentServer: string = environment.CONTENT_SERVER
  isDisableId: string;
  carousel: NguCarouselConfig = {
    grid: { xs: 1, sm: 3, md: 5, lg: 6, all: 0 },
    slide: 3,
    speed: 150,
    point: {
      visible: false
    },
    load: 6,
  }
  constructor(private token: TokenService, private router: Router, private dialog: DialogService, private matDialog: MatDialog, private snackBar: SnackBarService, private homeService: HomeService) { }

  ngOnInit() {
    if (this.token.isLoggedIn()) {
      if (this.token.isSME()) {
        this.isSME = true;
      }
    } else {
      this.isSME = false;
    }
  }
  onSendRequest(smeConnection: SMECircleDto, index) {
    this.isDisableId = smeConnection.sUuid;
    let circle = new BusinessCircle()
    circle.smeId = smeConnection.sUuid
    this.homeService.sentConnectionRequest(circle).subscribe(
      response => {
        if (response.error && response.code === 404) {
          this.isDisableId = null
          window.alert("This functionality will be active as soon as your SME is Verified by our gloqr team")
        }
        else if (response.error && response.customErrorCode === 100) {
          window.alert("Request has already been sent to " + smeConnection.smeName)
        }
        else if (response.error && response.customErrorCode === 101) {
          window.alert("You are already Connected with " + smeConnection.smeName)
        }
        else if (response.error && response.customErrorCode === 102) {
          window.alert(smeConnection.smeName + " has already sent you a Circle Invite. Please check your 'Circle Invites Received' section in Social.")
        }
        else if (response.error && response.customErrorCode === 103) {
          window.alert("Oops! you're trying to send request yourself")
        }
        else {
          this.isDisableId = smeConnection.sUuid;
          this.smes[index].status = sentReqStatus
          this.snackBar.open('Invitation Sent to ' + smeConnection.smeName);
        }
        window.location.reload();

      },
    )
  }

  onClickCircleInvite(smeConnection: SMECircleDto, index) {
    if (!this.token.isLoggedIn()) {
      const dialogRef = this.matDialog.open(AuthRouteComponent, this.dialog.loginConfig())
      dialogRef.afterClosed().subscribe(
        res => {
          if (this.token.isLoggedIn() && this.token.isSME()) {
            this.onSendRequest(smeConnection, index);

          }
          else if (this.token.isLoggedIn() && this.token.isNormalUser()) {
            let c1 = window.confirm("To connect with " + smeConnection.smeName + " you need to Register as SME on gloqr. Click 'OK' to register on gloqr");
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
        let c2 = window.confirm("To connect with " + smeConnection.smeName + " you need to Register as SME on gloqr. Click 'OK' to register on gloqr");
        if (c2 === true) {
          this.router.navigateByUrl('/pricing');
        }
      }
    }
  }

}
