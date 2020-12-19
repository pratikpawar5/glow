import { Component, OnInit } from '@angular/core';
import { SMEItemStatus, SmeEntity, SMEItemsType } from '@models/sme';
import { SMECertificate } from '@models/certificate';
import { DeleteObjectsComponent } from 'app/shared/components/delete-objects/delete-objects.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { PageTitleService } from '@services/page-title/page-title.service';
import { SmeAdminServiceService } from 'app/sme-admin/sme-admin-service/sme-admin-service.service';
import { SmeService } from '@services/sme/sme.service';
import { CertificateDelete, DeleteObject, ObjectType } from '@models/common-delete';
import { SnackBarService } from '@services/common/snack-bar.service';
import { TokenService } from '@services/token/token.service';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { Router } from '@angular/router';

declare var ga: Function;
@Component({
  selector: 'app-admin-certificate',
  templateUrl: './admin-certificate.component.html',
  styleUrls: ['./admin-certificate.component.css']
})
export class AdminCertificateComponent implements OnInit {

  sUuid: string
  edit: boolean = false
  delete: boolean = false
  smeCertificates: Array<SMECertificate>
  disablePublishButton: boolean = true;
  disableDeactiveButton: boolean = true;
  map = new Map<string, SMEItemStatus>();
  selectedCertificateSize: any = 0;
  status: string = 'active'
  status1: string = 'deactive'
  publishCertificateButton: boolean = true
  deleteDialogRef: MatDialogRef<DeleteObjectsComponent>
  showSpinner: boolean = true
  notFound: boolean
  showButton: boolean = true

  constructor(private smeAdminServiceService: SmeAdminServiceService,
    private smeService: SmeService, private token: TokenService, private snackBar: SnackBarService,
    private dialog: DialogService, private matDialog: MatDialog,
    private pageTitleService: PageTitleService, router: Router) {
    ga('set', 'page', router.url);
    ga('send', 'pageview');
  }

  ngOnInit() {
    this.pageTitleService.updateTitle('Certificate | Admin')

    this.sUuid = this.token.getSmeId()
    this.selectedCertificateSize = 0;
    this.getCertificatesOfSME(this.status)
  }
  getCertificatesOfSME(status: string) {
    this.smeService.smeCertificates(status).subscribe(
      res => {
        if (res.error) {
          this.showSpinner = false
          this.notFound = true
        }
        else {
          this.smeCertificates = res.data
          this.showSpinner = false
        }
      }
    )
  }

  onActive() {
    this.edit = false
    this.delete = false
    this.selectedCertificateSize = 0
    this.publishCertificateButton = true
    this.disableDeactiveButton = true
    this.map.clear()
    this.smeCertificates = undefined
    this.getCertificatesOfSME(this.status)
    this.notFound = false

  }

  onInActive() {
    this.edit = true
    this.delete = true
    this.selectedCertificateSize = 0
    this.publishCertificateButton = false
    this.disablePublishButton = true
    this.map.clear()
    this.smeCertificates = undefined
    this.getCertificatesOfSME(this.status1)
    this.notFound = false

  }

  onDelete(certificate: SMECertificate, index) {

    let removeCertificate = new CertificateDelete();
    removeCertificate.crtiUuid = certificate.crtiUuid;
    removeCertificate.certificateType = certificate.certificateType

    let deleteObj: DeleteObject<any> = {
      type: ObjectType.CERTIFICATE,
      uuid: null,
      cirlceObjects: removeCertificate
    }

    let ref = this.matDialog.open(DeleteObjectsComponent, this.dialog.getDeleteDialogConfig(deleteObj))
    ref.afterClosed().subscribe(
      res => {
        if (res) {
          this.smeCertificates.splice(index, 1)
        }
      }
    )
  }
  onclickCheckbox(infraUuid: string, active: boolean) {
    if (!this.map.has(infraUuid)) {
      if (active) {
        this.map.set(infraUuid, SMEItemStatus.ACTIVE);
      }
      else {
        this.map.set(infraUuid, SMEItemStatus.DEACTIVE);
      }

    } else {
      this.map.delete(infraUuid)
    }
    this.selectedCertificateSize = this.map.size
    if (this.map.size > 0) {
      this.disablePublishButton = false
      this.disableDeactiveButton = false
    } else {
      this.disablePublishButton = true
      this.disableDeactiveButton = true
    }
  }

  onClickDeactive() {
    this.showButton = false
    let publishDataArr = new Array<SmeEntity>();
    this.map.forEach((itemStatus: SMEItemStatus, certificateUuid: string) => {
      let smeItem = new SmeEntity();
      smeItem.id = certificateUuid;
      smeItem.smeAction = itemStatus;
      publishDataArr.push(smeItem);

    });
    this.smeAdminServiceService.publishSmeInfo(publishDataArr, SMEItemsType.CERTIFICATE).subscribe(
      res => {
        if (res.error) {
          this.showButton = true;

        }
        else {
          this.snackBar.open('Deactivate Successfully')
          this.map.clear()
          this.showButton = true;
          this.disablePublishButton = true
          this.onActive()
        }

      },
      err => {

      }
    )
  }

  onClickPublish() {
    this.showButton = false
    let publishDataArr = new Array<SmeEntity>();
    this.map.forEach((itemStatus: SMEItemStatus, crtiUuid: string) => {
      let smeItem = new SmeEntity();
      smeItem.id = crtiUuid;
      smeItem.smeAction = itemStatus;
      publishDataArr.push(smeItem);

    });
    this.smeAdminServiceService.publishSmeInfo(publishDataArr, SMEItemsType.CERTIFICATE).subscribe(
      res => {
        if (res.error) {
          this.showButton = true;
        }
        else {
          this.snackBar.open('Publish Data Successfully')
          this.map.clear()
          this.showButton = true;
          this.disablePublishButton = true
          this.onInActive()
        }
      },
    )
  }

  addNewCertificateClick() {
    let url = '/my-sme/' + this.sUuid + '/add-certificate'
    window.open(url, '_blank')
  }
  viewAllCertificataeClick() {
    let url = '/my-sme/' + this.sUuid + '/certificates'
    window.open(url, '_blank')
  }
}
