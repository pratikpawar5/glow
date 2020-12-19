import { Component, OnInit } from '@angular/core';
import { SMEItemStatus, SmeEntity } from '@models/sme';
import { Product, ProductDTO } from '@models/product';
import { SmeAdminServiceService } from 'app/sme-admin/sme-admin-service/sme-admin-service.service';
import { SmeService } from '@services/sme/sme.service';
import { PageTitleService } from '@services/page-title/page-title.service';
import { TokenService } from '@services/token/token.service';
import { ProductDelete, DeleteObject, ObjectType } from '@models/common-delete';
import { SnackBarService } from '@services/common/snack-bar.service';
import { SelectedCreditType, CreditErrorCode, CreditType } from '@models/pricing';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { MatDialog } from '@angular/material';
import { NoCreditsLeftComponent } from 'app/shared/components/no-credits-left/no-credits-left.component';
import { BuyCreditsComponent } from 'app/shared/components/buy-credits/buy-credits.component';
import { DeleteObjectsComponent } from 'app/shared/components/delete-objects/delete-objects.component';
import { Router } from '@angular/router';
declare var ga: Function;

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  products: Array<Product>

  map = new Map<string, SMEItemStatus>();
  disablePublishButton: boolean = true;
  disableDeactiveButton: boolean = true;
  status: string = 'active'
  status1: string = 'deactive'
  publishProductButton: boolean = true
  selectedProductSize: any = 0;
  sUuid: string
  showSpinner: boolean = true
  notFound: boolean
  activeDeactiveProductCount: number
  isActive: boolean
  showButton: boolean = true

  constructor(private smeAdminServiceService: SmeAdminServiceService,
    private dialog: DialogService, private smeService: SmeService, private snackBar: SnackBarService,
    private pageTitleService: PageTitleService, private token: TokenService,
    private matDialog: MatDialog, router: Router) {
    ga('set', 'page', router.url);
    ga('send', 'pageview');
  }

  ngOnInit() {
    this.pageTitleService.updateTitle('Product | Admin')
    this.selectedProductSize = 0
    this.sUuid = this.token.getSmeId()
    this.getProductsofSME(this.sUuid, this.status)
  }

  getProductsofSME(sUuid: string, status: string) {
    this.smeService.smeProducts(status).subscribe(
      res => {
        if (res.error) {
          this.showSpinner = false
          this.notFound = true
        }
        else {
          this.products = res.data
          this.activeDeactiveProductCount = res.data.length
          this.showSpinner = false
          let feedbackMsg;
          this.products.forEach(msg => {
            if(msg.feedBackMessage)
            {
              msg.feedBackMessage = feedbackMsg
            }
          })
        }
      }
    )
  }

  onActive() {
    this.isActive = false
    this.selectedProductSize = 0
    this.publishProductButton = true
    this.disableDeactiveButton = true
    this.map.clear();
    this.products = undefined
    this.getProductsofSME(this.sUuid, this.status);
    this.notFound = false
  }

  onInActive() {
    this.isActive = true
    this.selectedProductSize = 0
    this.publishProductButton = false
    this.map.clear();
    this.disablePublishButton = true
    this.products = undefined
    this.getProductsofSME(this.sUuid, this.status1);
    this.notFound = false
  }

  onSendQuotation(e, productUuid) {
    let p = new ProductDTO()
    if (e.checked) {
      p.autoQuotation = true
    }
    else {
      p.autoQuotation = false
    }
    this.smeService.autoQuotationProduct(productUuid, p).subscribe(
      res => {
        if (res.error) {

        }
        else {
          this.snackBar.open("Quotation Status Updated")
        }
      }
    )
  }
  onDelete(product: Product, index) {
    let removeProduct = new ProductDelete();
    removeProduct.uuid = product.productUuid;
    removeProduct.productDisplayName = product.productName

    let deleteObj: DeleteObject<any> = {
      type: ObjectType.PRODUCT,
      uuid: null,
      cirlceObjects: removeProduct
    }

    let ref = this.matDialog.open(DeleteObjectsComponent, this.dialog.getDeleteDialogConfig(deleteObj))
    ref.afterClosed().subscribe(
      res => {
        if (res) {
          this.products.splice(index, 1)
        }
      }
    )
  }
  addNewProductClick() {
    let url = '/my-sme/' + this.sUuid + '/add-product';
    window.open(url, '_blank')
  }
  viewAllProductClick() {
    let url = '/my-sme/' + this.sUuid + '/products'
    window.open(url, '_blank')
  }

  onclickCheckbox(productUuid: string, active: boolean) {
    if (!this.map.has(productUuid)) {
      if (active) {
        this.map.set(productUuid, SMEItemStatus.ACTIVE);
      }
      else {
        this.map.set(productUuid, SMEItemStatus.DEACTIVE);
      }

    } else {
      this.map.delete(productUuid)
    }
    this.selectedProductSize = this.map.size
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
    this.smeAdminServiceService.publishProduct(publishDataArr).subscribe(
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

    this.map.forEach((itemStatus: SMEItemStatus, productUuid: string) => {
      let smeItem = new SmeEntity();
      smeItem.id = productUuid;
      smeItem.smeAction = itemStatus;
      publishDataArr.push(smeItem);

    });
    this.smeAdminServiceService.publishProduct(publishDataArr).subscribe(
      res => {
        if (res.error) {
          if (res.code === 402) {
            this.showButton = true
            let selectedCreditType: SelectedCreditType

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
          this.showButton = true
          this.snackBar.open('Publish Data Successfully')
          this.map.clear()
          this.disablePublishButton = true
          this.onInActive()
        }
      }
    )
  }

}