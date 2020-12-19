import { Component, OnInit, Input } from '@angular/core';
import { TokenService } from '@services/token/token.service';
import { environment } from 'environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { SmeService } from '@services/sme/sme.service';
import { LazySmeViewService } from 'app/sme-view/http-service/lazy-sme-view.service';
import { SMECircleDto, BusinessCircle } from '@models/business-circle';
import { ViewModeItemsCount } from '@models/sme-items-count';
import { DeviceDetectorService } from 'ngx-device-detector';
import { SMEInformationVo } from '@models/sme';
import { SnackBarService } from '@services/common/snack-bar.service';
import { HomeService } from '@services/home/home.service';
import { AuthRouteComponent } from 'app/auth/auth-route/auth-route.component';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-sme-category',
  templateUrl: './sme-category.component.html',
  styleUrls: ['./sme-category.component.css']
})
export class SmeCategoryComponent implements OnInit {

  @Input()
  smes: SMEInformationVo;
  @Input()
  status:string
  isDisableId: string;

  isSME: boolean
  contentServer: string = environment.CONTENT_SERVER

  productCount: number = 0;

  serviceCount: number = 0;

  vacancyCount: number = 0;

  infrastructureCount: number = 0;

  teamCount: number = 0;

  galleryCount: number = 0;

  certificatesCount: number = 0

  socialPostCount: number = 0

  smeConnections: Array<SMECircleDto>

  viewModeItemsCount: ViewModeItemsCount

  isMobile: boolean
  constructor(private token: TokenService, private matDialog: MatDialog, private dialog: DialogService, private snackBar: SnackBarService, private homeService: HomeService, private router: Router, private detectorService: DeviceDetectorService, private lazySmeViewService: LazySmeViewService, private route: ActivatedRoute, private smeService: SmeService) { }

  ngOnInit() {
    this.isMobile = this.detectorService.isMobile();
    if (this.token.isLoggedIn()) {
      if (this.token.isSME()) {
        this.isSME = true
      }
    }

    this.lazySmeViewService.smeCircle(this.smes.sUuid).subscribe(
      res => {
        if (!res.error && res.code == 200) {
          this.smeConnections = res.data
        }
        else {
        }
      },
    )

    this.smeService.getSmeObjectCountForViewMode(this.smes.sUuid, 'false').subscribe(
      res => {
        if (res.error) {
        }
        else {
          this.viewModeItemsCount = res.data
          this.productCount = this.viewModeItemsCount.activeApprovedProducts
          this.certificatesCount = this.viewModeItemsCount.activeApprovedCertificates
          this.serviceCount = this.viewModeItemsCount.activeApprovedServices
          this.vacancyCount = this.viewModeItemsCount.activeApprovedVacancies
          this.infrastructureCount = this.viewModeItemsCount.activeApprovedInfras
          this.galleryCount = this.viewModeItemsCount.activeApprovedGalleries
          this.teamCount = this.viewModeItemsCount.activeApprovedTeams
          this.socialPostCount = this.viewModeItemsCount.activeApprovedBusinessPosts
        }
      }
    )

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
          window.alert("Request has already been sent to " + smeConnection.smeName);
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

}
