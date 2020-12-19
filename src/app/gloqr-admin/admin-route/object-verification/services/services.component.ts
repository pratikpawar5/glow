import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SmeEntity } from '@models/sme';
import { Service } from '@models/service';
import { ActivatedRoute } from '@angular/router';
import { ServiceDetailDialogComponent } from './service-detail-dialog/service-detail-dialog.component';
import { GloqrAdminService } from 'app/gloqr-admin/gloqr-admin-services/gloqr-admin.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  smeEntities = new Array<SmeEntity>();
  services: Array<Service>
  @Input()
  sUuid: string
  disableFlag: boolean = true;
  approveSelectedSize: any = 0;
  rejectSelectedSize: any = 0;
  name: string;
  approveServiceSMEfaceDialog: MatDialogRef<ServiceDetailDialogComponent>;
  @Input()
  uuid: string
  showSpinner: boolean = true
  notFound: boolean
  showButton: boolean = true

  constructor(private gloqrAdminService: GloqrAdminService, private matDialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit() {
    this.approveSelectedSize = 0
    this.rejectSelectedSize = 0

    this.gloqrAdminService.getService(this.sUuid).subscribe(
      res => {
        if (res.error) {
          this.showSpinner = false
          this.notFound = true
        }
        else {
          this.services = res.data
          this.showSpinner = false
        }
      }
    )
  }

  onViewserviceDetail(service: Service, index: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = false;
    dialogConfig.width = '1000px';
    dialogConfig.height = '800px';
    dialogConfig.data = service
    this.approveServiceSMEfaceDialog = this.matDialog.open(ServiceDetailDialogComponent, dialogConfig);
    this.approveServiceSMEfaceDialog.afterClosed().subscribe(
      res => {

        if (res) {
          this.rejectSelectedSize = 0
          this.approveSelectedSize = 0
          if (res.state === 1) {
            service.isApprove = true
            service.isReject = false
          }

          if (res.state === 2) {
            service.isReject = true
            service.isApprove = false
          }

          let entityIndex: number = this.smeEntities.findIndex(entity => entity.id == res.id);
          if (entityIndex != -1) {
            this.smeEntities.splice(entityIndex, 1);
          }
          this.smeEntities.push(res)


          this.smeEntities.forEach(smeEntity => {
            let smeService: Service = this.services.find(smeService => smeService.serviceUuid === smeEntity.id)
            if (smeService) {
              smeService.frontFeedBackMessage = smeEntity.feedbackMessage

              if (smeEntity.state == 2) {
                this.services[index].isSelected = true
                ++this.rejectSelectedSize;
              }

              if (smeEntity.state == 1) {
                this.services[index].isSelected = true
                ++this.approveSelectedSize
              }

            }
          })

        }

      }
    )
  }

  onSubmit() {
    let adminservicePublish = {
      userId: this.uuid,
      smeId: this.sUuid,
      data: this.smeEntities
    }
    if (adminservicePublish.data.length > 0) {
      this.showButton = false
      this.gloqrAdminService.updateService(adminservicePublish).subscribe(
        res => {
          if (res.error) {
            this.showButton = true
          }
          else {
            this.smeEntities.forEach(smeEntity => {
              let index: number = this.services.findIndex(service => service.serviceUuid === smeEntity.id)
              if (index != -1) {
                this.services.splice(index, 1)
                this.showButton = true
                this.smeEntities = []
                this.rejectSelectedSize = 0
                this.approveSelectedSize = 0
              }
            })
          }
        }
      )
    }

  }

}
