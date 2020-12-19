import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { VerifiedPayment } from '@models/payment';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { SnackBarService } from '@services/common/snack-bar.service';
import { GloqrAdminService } from 'app/gloqr-admin/gloqr-admin-services/gloqr-admin.service';
import { RejectMessageComponent } from './reject-message/reject-message.component';

@Component({
  selector: 'app-package-details',
  templateUrl: './package-details.component.html',
  styleUrls: ['./package-details.component.css']
})
export class PackageDetailsComponent implements OnInit {


  paymentDetails: any
  contentServer = environment.CONTENT_SERVER

  baseComponentUrl:string
  @Input()
  uuid: string;
  @Input()
  sUuid: string

  tab: string = "Offline"

  showSpinner: boolean = true
  notFound: boolean

  constructor(private gloqrAdminService: GloqrAdminService, private router: Router,
    private route: ActivatedRoute, private matDialog: MatDialog, private snackBar: SnackBarService) {
    this.baseComponentUrl = this.route.snapshot.params['baseComponentUrl']
  }

  ngOnInit() {
    this.gloqrAdminService.getSmePackageDetails(this.route.snapshot.params['uuid'],
      this.route.snapshot.params['sUuid']).subscribe(
        res => {
          if (res.error) {
            this.showSpinner = false
            this.notFound = true
          }
          else {
            this.paymentDetails = res.data
            this.showSpinner = false
          }
        }
      )
  }


  verify(offlinePayment: any, index: number) {
    this.paymentDetails.offlineDetails[index].action = false
    this.paymentDetails.offlineDetails[index].processing = true
    let verifiedPayment = new VerifiedPayment();
    verifiedPayment.offlinePaymentUuid = offlinePayment.offlinePaymentUuid
    verifiedPayment.sUuid = this.sUuid
    verifiedPayment.verified = true

    this.gloqrAdminService.verifyPlan(verifiedPayment).subscribe(
      res => {
        if (res.error) {
          this.paymentDetails.offlineDetails[index].processing = false
        } else {
          if (res.code === 201) {
            this.snackBar.open("Plan Upgraded Successfully")
            this.router.navigateByUrl('', { skipLocationChange: true }).then(() =>
              this.router.navigateByUrl('/gloqr-admin/'+this.baseComponentUrl+'/' + this.sUuid + '/' + this.uuid + '/sme-basic-details'));
          }
          this.paymentDetails.offlineDetails[index].processing = false
        }
      }
    )
  }

  reject(offlinePayment: any, index: number) {

    this.paymentDetails.offlineDetails[index].action = false
    this.paymentDetails.offlineDetails[index].processing = true

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = true
    dialogConfig.width = '400px';
    dialogConfig.data = { payment: offlinePayment, sUuid: this.sUuid }

    let ref = this.matDialog.open(RejectMessageComponent, dialogConfig);
    ref.afterClosed().subscribe(
      res => {
        this.paymentDetails.offlineDetails[index].processing = false
        if (res) {
          this.paymentDetails.offlineDetails[index].rejectReason = res
          this.router.navigateByUrl('', { skipLocationChange: true }).then(() =>
            this.router.navigateByUrl('/gloqr-admin/'+this.baseComponentUrl+'/' + this.sUuid + '/' + this.uuid + '/package-details'));
        } else {
          this.paymentDetails.offlineDetails[index].action = true
        }
      }
    )
  }

  changeTab(b: boolean) {
    if (b) {
      this.tab = "Online"
    } else {
      this.tab = "Offline"
    }

  }

}
