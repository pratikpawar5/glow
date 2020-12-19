import { Component, OnInit, Input } from '@angular/core';
import { SmeEntity } from '@models/sme';
import { Product } from '@models/product';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailDialogComponent } from './product-detail-dialog/product-detail-dialog.component';
import { GloqrAdminService } from 'app/gloqr-admin/gloqr-admin-services/gloqr-admin.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {

  smeEntities = new Array<SmeEntity>();
  products: Array<Product>
  
  @Input()
  sUuid: string
  @Input()
  uuid: string
  disableFlag: boolean = true;
  approveSelectedSize: any = 0;
  rejectSelectedSize: any = 0;
  name: string;
  specifications: Map<string, string>
 
  approveProductSMEfaceDialog: MatDialogRef<ProductDetailDialogComponent>
  showSpinner: boolean = true
  notFound: boolean
  showButton: boolean = true

  constructor(private gloqrAdminService: GloqrAdminService, private matDialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit() {
    this.approveSelectedSize = 0
    this.rejectSelectedSize = 0

    this.gloqrAdminService.getProduct(this.sUuid).subscribe(
      res => {
        if (res.error) {
          this.showSpinner = false
          this.notFound = true
        }
        else {
          this.products = res.data
          this.showSpinner = false
        }
      }
    )
  }

  onViewProductDetail(product: Product, index: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = false;
    dialogConfig.width = '1000px';
    dialogConfig.height = '800px';
    dialogConfig.data = product
    this.approveProductSMEfaceDialog = this.matDialog.open(ProductDetailDialogComponent, dialogConfig);
    this.approveProductSMEfaceDialog.afterClosed().subscribe(
      res => {

        if (res) {
          this.rejectSelectedSize = 0
          this.approveSelectedSize = 0
          if (res.state === 1) {
            product.isApprove = true
            product.isReject = false
          }

          if (res.state === 2) {
            product.isReject = true
            product.isApprove = false
          }

          let entityIndex: number = this.smeEntities.findIndex(entity => entity.id == res.id);
          if (entityIndex != -1) {
            this.smeEntities.splice(entityIndex, 1);
          }

          this.smeEntities.push(res)

          this.smeEntities.forEach(smeEntity => {

            let product: Product = this.products.find(product => product.productUuid === smeEntity.id)
            if (product) {
              product.frontFeedBackMessage = smeEntity.feedbackMessage

              if (smeEntity.state == 2) {
                this.products[index].isSelected = true
                ++this.rejectSelectedSize;
              }

              if (smeEntity.state == 1) {
                this.products[index].isSelected = true
                ++this.approveSelectedSize
              }
            }
          })
        }

      }
    )
  }
  
  onSubmit() {
    let adminProductPublish = {
      userId: this.uuid,
      smeId: this.sUuid,
      data: this.smeEntities
    }
    if (adminProductPublish.data.length > 0) {
      this.showButton = false

      this.gloqrAdminService.updateProduct(adminProductPublish).subscribe(
        res => {
          if (res.error) {
            this.showButton = true

          }
          else {
            this.smeEntities.forEach(smeEntity => {
              let index: number = this.products.findIndex(product => product.productUuid === smeEntity.id)
              if (index != -1) {
                this.products.splice(index, 1)
                this.smeEntities = []
                this.showButton = true
                this.approveSelectedSize = 0
                this.rejectSelectedSize = 0
              }
            })
          }
        }
      )
    }

  }
}

