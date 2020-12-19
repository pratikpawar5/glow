import { Component, OnInit } from '@angular/core';
import { SmeService } from '@services/sme/sme.service';
import { SMEItemStatus, SmeEntity } from '@models/sme';
import { PageTitleService } from '@services/page-title/page-title.service';
import { TokenService } from '@services/token/token.service';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from '@services/common/snack-bar.service';
import { SelectedCreditType, CreditType, CreditErrorCode } from '@models/pricing';
import { ServiceDelete, DeleteObject, ObjectType } from '@models/common-delete';
import { Service, ServiceDTO } from '@models/service';
import { SmeAdminServiceService } from 'app/sme-admin/sme-admin-service/sme-admin-service.service';
import { Router } from '@angular/router';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { NoCreditsLeftComponent } from 'app/shared/components/no-credits-left/no-credits-left.component';
import { BuyCreditsComponent } from 'app/shared/components/buy-credits/buy-credits.component';
import { DeleteObjectsComponent } from 'app/shared/components/delete-objects/delete-objects.component';
declare var ga: Function;

@Component({
  selector: 'app-admin-services',
  templateUrl: './admin-services.component.html',
  styleUrls: ['./admin-services.component.css']
})
export class AdminServicesComponent implements OnInit {

  smeServices: Array<Service>
  disablePublishButton: boolean = true;
  disableDeactiveButton: boolean = true;
  selectedServiceSize: any = 0;
  map = new Map<string, SMEItemStatus>();
  sUuid: string
  status: string = 'active'
  status1: string = 'deactive'
  publishServiceButton: boolean = true
  showSpinner: boolean = true
  notFound: boolean
  isActive: boolean
  showButton: boolean = true

  constructor(private smeService: SmeService, private router: Router, private matDialog: MatDialog,
    private dialog: DialogService, private smeAdminServiceService: SmeAdminServiceService, private snackBar: SnackBarService,
    private token: TokenService, private title: PageTitleService) {
    ga('set', 'page', router.url);
    ga('send', 'pageview');
  }
  ngOnInit() {
    this.title.updateTitle('Service | Admin')
    this.selectedServiceSize = 0
    this.getServicesOfSME(this.status);
    this.sUuid = this.token.getSmeId();
  }
  addNewProductClick() {
    let url = '/my-sme/' + this.sUuid + '/add-service'
    window.open(url, '_blank')
  }
  viewAllProductClick() {
    let url = '/my-sme/' + this.sUuid + '/services'
    window.open(url, '_blank')
  }
  onSendQuotation(e, serviceUuid) {
    let s = new ServiceDTO()
    if (e.checked) {
      s.autoQuotation = true
    }
    else {
      s.autoQuotation = false
    }
    this.smeService.autoQuotationService(serviceUuid, s).subscribe(
      res => {
        if (res.error) {

        }
        else {
          this.snackBar.open("Quotation Status Updated")
        }
      }
    )
  }

  getServicesOfSME(status: string) {
    this.smeService.servicesOfSME(status).subscribe(
      res => {
        if (res.error) {
          this.showSpinner = false
          this.notFound = true
        }
        else {
          this.smeServices = res.data
          this.showSpinner = false
        }
      }
    )
  }

  onDelete(service: Service, index) {
    let removeService = new ServiceDelete();
    removeService.serviceUUID = service.serviceUuid;
    removeService.serviceDisplayName = service.serviceName
    let deleteObj: DeleteObject<any> = {
      type: ObjectType.SERVICE,
      uuid: null,
      cirlceObjects: removeService

    }
    let ref = this.matDialog.open(DeleteObjectsComponent, this.dialog.getDeleteDialogConfig(deleteObj))
    ref.afterClosed().subscribe(
      res => {
        if (res) {
          this.smeServices.splice(index, 1)
        }
      }
    )
  }

  onActive() {
    this.isActive = false
    this.selectedServiceSize = 0
    this.publishServiceButton = true
    this.disableDeactiveButton = true
    this.map.clear()
    this.smeServices = undefined
    this.getServicesOfSME(this.status)
    this.notFound = false

  }

  onInActive() {
    this.isActive = true

    this.selectedServiceSize = 0
    this.publishServiceButton = false
    this.disablePublishButton = true
    this.map.clear()
    this.smeServices = undefined
    this.getServicesOfSME(this.status1)
    this.notFound = false
  }

  onclickCheckbox(serviceUuid: string, active: boolean) {
    if (!this.map.has(serviceUuid)) {
      if (active) {
        this.map.set(serviceUuid, SMEItemStatus.ACTIVE);
      }
      else {
        this.map.set(serviceUuid, SMEItemStatus.DEACTIVE);
      }

    } else {
      this.map.delete(serviceUuid)
    }
    this.selectedServiceSize = this.map.size
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

    this.map.forEach((itemStatus: SMEItemStatus, productUuid: string) => {
      let smeItem = new SmeEntity();
      smeItem.id = productUuid;
      smeItem.smeAction = itemStatus;
      publishDataArr.push(smeItem);

    });
    this.smeAdminServiceService.publishService(publishDataArr).subscribe(
      res => {
        if (res.error) {
          this.showButton = true
        }
        else {
          this.showButton = true
          this.snackBar.open('Deactivate Successfully')
          this.map.clear()
          this.disableDeactiveButton = true
          this.onActive()
        }
      },
    )
  }

  onClickPublish() {
    this.showButton = false
    let publishDataArr = new Array<SmeEntity>();

    this.map.forEach((itemStatus: SMEItemStatus, serviceUUID: string) => {
      let smeItem = new SmeEntity();
      smeItem.id = serviceUUID;
      smeItem.smeAction = itemStatus;
      publishDataArr.push(smeItem);
    });
    this.smeAdminServiceService.publishService(publishDataArr).subscribe(
      res => {
        if (res.error) {
          if (res.code === 402) {
            let selectedCreditType: SelectedCreditType
            this.showButton = true

            if (res.errorResponse.errorCode === CreditErrorCode.PRODUCT_SERVICE_LISTING) {
              selectedCreditType = {
                creditType: CreditType.PRODUCT_SERVICE_LISTING,
                displayName: res.errorResponse.typeDisplayName
              }
            }

            let ref = this.matDialog.open(NoCreditsLeftComponent, this.dialog.getNoCreditsDialogConfig(selectedCreditType))
            ref.afterClosed().subscribe(
              res => {
                if (res) {
                  let ref = this.matDialog.open(BuyCreditsComponent, this.dialog.getBuyCreditsDialogConfig(selectedCreditType))
                  ref.afterClosed().subscribe(
                    res => {
                      if (res) {
                        this.onClickPublish();
                      }
                    }
                  )
                }
              }
            )
          }
        }
        else {
          this.snackBar.open('Publish Data Successfully')
          this.map.clear()
          this.showButton = true
          this.disablePublishButton = true
          this.onInActive()
        }

      },
    )
  }


}