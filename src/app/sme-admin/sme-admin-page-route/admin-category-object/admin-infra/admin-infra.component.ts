import { Component, OnInit } from '@angular/core';
import { DeleteObjectsComponent } from 'app/shared/components/delete-objects/delete-objects.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { SMEItemStatus, SmeEntity, SMEItemsType } from '@models/sme';
import { SMEInfrastrcture } from '@models/infrastructure';
import { SmeAdminServiceService } from 'app/sme-admin/sme-admin-service/sme-admin-service.service';
import { SmeService } from '@services/sme/sme.service';
import { PageTitleService } from '@services/page-title/page-title.service';
import { TokenService } from '@services/token/token.service';
import { InfrastrctureDelete, DeleteObject, ObjectType } from '@models/common-delete';
import { SnackBarService } from '@services/common/snack-bar.service';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { Router } from '@angular/router';
declare var ga: Function;

@Component({
  selector: 'app-admin-infra',
  templateUrl: './admin-infra.component.html',
  styleUrls: ['./admin-infra.component.css']
})
export class AdminInfraComponent implements OnInit {

  edit: boolean = false
  delete: boolean = false
  smeInfra: Array<SMEInfrastrcture>
  disablePublishButton: boolean = true;
  disableDeactiveButton: boolean = true;
  map = new Map<string, SMEItemStatus>();
  selectedInfraSize: any = 0
  status: string = 'active'
  status1: string = 'deactive'
  publishInfraButton: boolean = true
  deleteDialogRef: MatDialogRef<DeleteObjectsComponent>
  sUuid: string
  showSpinner: boolean = true
  showButton: boolean = true

  notFound: boolean
  constructor(private smeAdminServiceService: SmeAdminServiceService, private smeService: SmeService,
    private snackBar: SnackBarService, private dialog: DialogService, private matDialog: MatDialog,
    private pageTitleService: PageTitleService, private token: TokenService, router: Router) {
    ga('set', 'page', router.url);
    ga('send', 'pageview');
  }

  ngOnInit() {
    this.pageTitleService.updateTitle('Infrastructure | Admin')
    this.selectedInfraSize = 0;
    this.getInfrastructureOfSME(this.status)
    this.sUuid = this.token.getSmeId();
  }
  getInfrastructureOfSME(status: string) {
    this.smeService.smeInfrastructure(status).subscribe(
      res => {
        if (res.error) {
          this.showSpinner = false
          this.notFound = true
        }
        else {
          this.smeInfra = res.data
          this.showSpinner = false
        }
      }
    )
  }

  onActive() {
    this.edit = false
    this.delete = false
    this.selectedInfraSize = 0
    this.publishInfraButton = true
    this.disableDeactiveButton = true
    this.map.clear()
    this.smeInfra = undefined
    this.getInfrastructureOfSME(this.status)
    this.notFound = false

  }

  onInActive() {
    this.edit = true
    this.delete = true
    this.selectedInfraSize = 0
    this.publishInfraButton = false
    this.disablePublishButton = true
    this.map.clear()
    this.smeInfra = undefined
    this.getInfrastructureOfSME(this.status1)
    this.notFound = false

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
    this.selectedInfraSize = this.map.size
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
    this.smeInfra = undefined
    this.map.forEach((itemStatus: SMEItemStatus, infraUuid: string) => {
      let smeItem = new SmeEntity();
      smeItem.id = infraUuid;
      smeItem.smeAction = itemStatus;
      publishDataArr.push(smeItem);

    });
    this.smeAdminServiceService.publishSmeInfo(publishDataArr, SMEItemsType.INFRASTRUCTURE).subscribe(
      res => {

        if (res.error) {
          this.showButton = true
        }
        else {
          this.snackBar.open('Deactivate Successfully')
          this.map.clear()
          this.showButton = true
          this.disableDeactiveButton = true
          this.onActive()
        }
      },
    )
  }

  onClickPublish() {
    this.showButton = false
    let publishDataArr = new Array<SmeEntity>();
    this.smeInfra = undefined
    this.map.forEach((itemStatus: SMEItemStatus, infraUuid: string) => {
      let smeItem = new SmeEntity();
      smeItem.id = infraUuid;
      smeItem.smeAction = itemStatus;
      publishDataArr.push(smeItem);

    });
    this.smeAdminServiceService.publishSmeInfo(publishDataArr, SMEItemsType.INFRASTRUCTURE).subscribe(
      res => {
        if (res.error) {
          this.showButton = true
        }
        else {
          this.snackBar.open('Publish Data Successfully')
          this.map.clear()
          this.disablePublishButton = true
          this.showButton = true
          this.smeInfra = undefined
          this.onInActive()
        }
      },
    )
  }
  onDelete(infra: SMEInfrastrcture, index) {

    let removeInfra = new InfrastrctureDelete();
    removeInfra.infraUuid = infra.infraUuid;
    removeInfra.machineName = infra.machineName

    let deleteObj: DeleteObject<any> = {
      type: ObjectType.INFRASTRUCTURE,
      uuid: null,
      cirlceObjects: removeInfra

    }
    let ref = this.matDialog.open(DeleteObjectsComponent, this.dialog.getDeleteDialogConfig(deleteObj))
    ref.afterClosed().subscribe(
      res => {
        if (res) {
          this.smeInfra.splice(index, 1)
        }
      }
    )
  }
  addInfrastructure() {
    let url = '/my-sme/' + this.sUuid + '/add-infrastructure'
    window.open(url, '_blank')
  }
  viewAllInfrastructure() {
    let url = '/my-sme/' + this.sUuid + '/infrastrcutures'
    window.open(url, '_blank')
  }
}
