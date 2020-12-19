import { Component, OnInit, Input } from '@angular/core';
import { Product } from '@models/product';
import { PageTitleService } from '@services/page-title/page-title.service';
import { Router } from '@angular/router';
import { ShareLinksDialogComponent } from 'app/shared/components/share-links-dialog/share-links-dialog.component';
import { MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material';

@Component({
  selector: 'app-product-breadcrumbs',
  templateUrl: './product-breadcrumbs.component.html',
  styleUrls: ['./product-breadcrumbs.component.css']
})
export class ProductBreadcrumbsComponent implements OnInit {

  @Input()
  product: Product
  url: string
  shareLinksDialogComponent: MatDialogRef<ShareLinksDialogComponent>;

  constructor(private title: PageTitleService, private router: Router, private matDialog: MatDialog) { }

  ngOnInit() {
    this.url = this.router.url;
    this.title.updateTitle(this.product.productName)
    this.title.updateMetaTitle(this.product.productName)
    this.title.updateMetaInfo(this.product.productName + ', ' + this.product.smeInfo.smeName
      + ', ' + this.product.smeInfo.smeAddress.locality + ', ' + this.product.smeInfo.smeAddress.city)
    this.title.updateMetaURL(this.router.url)
    this.title.updateMetaImage(this.product.mainImage)
  }

  onClickShare() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = false
    dialogConfig.width = '500px';
    dialogConfig.height = '250px';
    dialogConfig.data = { url: this.url, name: this.product.productName, mailContent: 'Product' }
    this.shareLinksDialogComponent = this.matDialog.open(ShareLinksDialogComponent, dialogConfig);

  }
}
