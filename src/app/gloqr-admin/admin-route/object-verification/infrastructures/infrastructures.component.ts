import { Component, OnInit, Input } from '@angular/core';
import { SmeEntity, SMEItemsType } from '@models/sme';
import { SMEInfrastrcture } from '@models/infrastructure';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { InfrastructureDetailDialogComponent } from './infrastructure-detail-dialog/infrastructure-detail-dialog.component';
import { GloqrAdminService } from 'app/gloqr-admin/gloqr-admin-services/gloqr-admin.service';


@Component({
  selector: 'app-infrastructures',
  templateUrl: './infrastructures.component.html',
  styleUrls: ['./infrastructures.component.css']
})
export class InfrastructuresComponent implements OnInit {

  smeEntities = new Array<SmeEntity>();
  smeInfrastructure: Array<SMEInfrastrcture>
  @Input()
  sUuid: string
  isSelect: boolean = false
  disableFlag: boolean = true;
  approveSelectedSize: any = 0;
  rejectSelectedSize: any = 0;
  name: string;
  showSpinner: boolean = true
  showButton: boolean = true
  notFound: boolean
  approveInfrastructureSMEfaceDialog: MatDialogRef<InfrastructureDetailDialogComponent>

  constructor(private gloqrAdminService: GloqrAdminService, private matDialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit() {
    this.approveSelectedSize = 0
    this.rejectSelectedSize = 0
    this.gloqrAdminService.getSmeItems(this.sUuid, SMEItemsType.INFRASTRUCTURE).subscribe(
      res => {
        if (res.error) {
          this.showSpinner = false
          this.notFound = true
        }
        else {
          this.smeInfrastructure = res.data
          this.showSpinner = false
        }
      }
    )

  }
  onViewInfraDetail(infrastructure: SMEInfrastrcture, index: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = false;
    dialogConfig.width = '1000px';
    dialogConfig.height = '800px';
    dialogConfig.data = {infrastructure:infrastructure,sUuid:this.sUuid}
    this.approveInfrastructureSMEfaceDialog = this.matDialog.open(InfrastructureDetailDialogComponent, dialogConfig);
    this.approveInfrastructureSMEfaceDialog.afterClosed().subscribe(
      res => {
        if (res) {
          this.rejectSelectedSize = 0
          this.approveSelectedSize = 0
          if (res.state === 1) {
            infrastructure.isApprove = true
            infrastructure.isReject = false
          }

          if (res.state === 2) {
            infrastructure.isReject = true
            infrastructure.isApprove = false
          }

          let entityIndex: number = this.smeEntities.findIndex(entity => entity.id == res.id);
          if (entityIndex != -1) {
            this.smeEntities.splice(entityIndex, 1);
          }
          this.smeEntities.push(res)

          this.smeEntities.forEach(smeEntity => {
            let infrastructure: SMEInfrastrcture = this.smeInfrastructure.find(infrastructure => infrastructure.infraUuid === smeEntity.id)
            if (infrastructure) {
              infrastructure.frontFeedBackMessage = smeEntity.feedbackMessage

              if (smeEntity.state == 2) {
                this.smeInfrastructure[index].isSelected = true
                ++this.rejectSelectedSize;
              }

              if (smeEntity.state == 1) {
                this.smeInfrastructure[index].isSelected = true
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
      this.gloqrAdminService.updateSmeItems(this.smeEntities, SMEItemsType.INFRASTRUCTURE).subscribe(
        res => {
          this.smeEntities.forEach(smeEntity => {
            let index: number = this.smeInfrastructure.findIndex(infrastructure => infrastructure.infraUuid === smeEntity.id)
            if (index != -1) {
              this.smeInfrastructure.splice(index, 1)
              this.showButton = true
              this.smeEntities = []
              this.rejectSelectedSize = 0
              this.approveSelectedSize = 0
            }
          })

        }
      )
    }

  }

}
