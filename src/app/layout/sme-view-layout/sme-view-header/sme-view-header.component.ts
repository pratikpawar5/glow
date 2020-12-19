import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'environments/environment';
import { SMEInformationVo } from '@models/sme';
import { SMECircleDto, BusinessCircle } from '@models/business-circle';
import { AuthRouteComponent } from 'app/auth/auth-route/auth-route.component';
import { MatDialog } from '@angular/material';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { TokenService } from '@services/token/token.service';
import { Router } from '@angular/router';
import { HomeService } from '@services/home/home.service';
import { SnackBarService } from '@services/common/snack-bar.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-sme-view-header',
  templateUrl: './sme-view-header.component.html',
  styleUrls: ['./sme-view-header.component.css']
})
//sme view home nav bar
export class SmeViewHeaderComponent implements OnInit {

  @Input()
  smes: SMEInformationVo;
  @Input()
  status:string
  contentServer: string = environment.CONTENT_SERVER
  isDisableId: string;
  isDesktop:boolean
  isTablet:boolean
  constructor(private snackBar: SnackBarService,private deviceDetector:DeviceDetectorService, private homeService: HomeService, private router: Router, private matDialog: MatDialog, private dialog: DialogService, private token: TokenService) { }

  ngOnInit() {
    this.isDesktop = this.deviceDetector.isDesktop();
    this.isTablet = this.deviceDetector.isTablet();
  }

  onSendRequest(smeConnection: SMECircleDto) {
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
          window.alert("Request has already been sent to "+ smeConnection.smeName);
        }
        else if (response.error && response.customErrorCode === 101) {
          window.alert("You are already Connected with " + smeConnection.smeName);
        }
        else if (response.error && response.customErrorCode === 102) {
          window.alert(smeConnection.smeName + " has already sent you a Circle Invite. Please check your 'Circle Invites Received' section in Social.")

        }
        else if (response.error && response.customErrorCode === 103) {
          this.snackBar.open("Oops! you're trying to send request yourself");
        }
        else {
          this.snackBar.open('Invitation Sent to ' + smeConnection.smeName);
        }
        this.router.navigateByUrl('', { skipLocationChange: true }).then(() =>
        this.router.navigate(['sme', this.smes.sUuid]));
      },
    )
  }

  onClickCircleInvite(smeConnection: SMECircleDto) {
    if (!this.token.isLoggedIn()) {
      const dialogRef = this.matDialog.open(AuthRouteComponent, this.dialog.loginConfig())
      dialogRef.afterClosed().subscribe(
        res => {
          if (this.token.isLoggedIn() && this.token.isSME()) {
            this.onSendRequest(smeConnection);
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
        this.onSendRequest(smeConnection);
      }
      else if (this.token.isNormalUser()) {
        let c2 = window.confirm("To connect with " + smeConnection.smeName + " you need to Register as SME on gloqr. Click 'OK' to register on gloqr");
        if (c2 === true) {
          this.router.navigateByUrl('/pricing');
        }
      }
    }
  }

  scrolltoTop() {
    window.scrollTo(0, 0)
  }
}
