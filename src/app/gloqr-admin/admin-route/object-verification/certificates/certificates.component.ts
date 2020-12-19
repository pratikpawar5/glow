import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SmeEntity, SMEItemsType } from '@models/sme';
import { SMECertificate } from '@models/certificate';
import { ActivatedRoute } from '@angular/router';
import { CertificateDetailDialogComponent } from './certificate-detail-dialog/certificate-detail-dialog.component';
import { GloqrAdminService } from 'app/gloqr-admin/gloqr-admin-services/gloqr-admin.service';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.css']
})
export class CertificatesComponent implements OnInit {

  smeEntities = new Array<SmeEntity>();
  smeCertificate: Array<SMECertificate>
  approveSelectedSize: any = 0;
  keepGoing: boolean = true;
  name: string;
  rejectSelectedSize: any = 0;
  @Input()
  sUuid: string
  isSelect: boolean = false
  disableFlag: boolean = true;
  approveCertificateDialog: MatDialogRef<CertificateDetailDialogComponent>
  showSpinner: boolean = true
  showButton: boolean = true
  notFound: boolean
  constructor(private gloqrAdminService: GloqrAdminService, private matDialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit() {
    this.approveSelectedSize = 0
    this.rejectSelectedSize = 0
    this.gloqrAdminService.getSmeItems(this.sUuid, SMEItemsType.CERTIFICATE).subscribe(
      res => {
        if (res.error) {
          this.showSpinner = false
          this.notFound = true
        }
        else {
          this.smeCertificate = res.data
          this.showSpinner = false
        }
      }
    )
  }


  onViewDetail(certificate: SMECertificate, index: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = false;
    dialogConfig.width = '1000px';
    dialogConfig.height = '800px';
    dialogConfig.data = { certificate: certificate, sUuid: this.sUuid }
    this.approveCertificateDialog = this.matDialog.open(CertificateDetailDialogComponent, dialogConfig);
    this.approveCertificateDialog.afterClosed().subscribe(
      res => {

        if (res) {
          this.rejectSelectedSize = 0
          this.approveSelectedSize = 0
          if (res.state === 1) {
            certificate.isApprove = true
            certificate.isReject = false
          }

          if (res.state === 2) {
            certificate.isReject = true
            certificate.isApprove = false
          }
          let entityIndex: number = this.smeEntities.findIndex(entity => entity.id == res.id);
          if (entityIndex != -1) {
            this.smeEntities.splice(entityIndex, 1);
          }
          this.smeEntities.push(res)
          this.smeEntities.forEach(smeEntity => {
            let certificate: SMECertificate = this.smeCertificate.find(certificate => certificate.crtiUuid === smeEntity.id)
            if (certificate) {
              certificate.frontFeedBackMessage = smeEntity.feedbackMessage
              if (smeEntity.state == 2) {
                this.smeCertificate[index].isSelected = true
                ++this.rejectSelectedSize;
              }
              if (smeEntity.state == 1) {
                this.smeCertificate[index].isSelected = true
                ++this.approveSelectedSize
              }

            }

          })

        }

      }
    )
  }

  onSubmit() {
    if (this.smeEntities.length > 0) {
      this.showButton = false
      this.gloqrAdminService.updateSmeItems(this.smeEntities, SMEItemsType.CERTIFICATE).subscribe(
        res => {
          this.smeEntities.forEach(smeEntity => {
            let index: number = this.smeCertificate.findIndex(certificate => certificate.crtiUuid === smeEntity.id)
            if (index != -1) {
              this.smeCertificate.splice(index, 1)
              this.showButton = true
              this.smeEntities = []
              this.approveSelectedSize = 0
              this.rejectSelectedSize = 0
            }
          })
        }
      )
    }

  }
}
