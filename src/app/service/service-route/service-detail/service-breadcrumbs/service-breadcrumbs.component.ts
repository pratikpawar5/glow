import { Component, OnInit, Input } from '@angular/core';
import { Service } from '@models/service';
import { PageTitleService } from '@services/page-title/page-title.service';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DomSanitizer } from '@angular/platform-browser';
import { ShareLinksDialogComponent } from 'app/shared/components/share-links-dialog/share-links-dialog.component';
import { MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material';

@Component({
  selector: 'app-service-breadcrumbs',
  templateUrl: './service-breadcrumbs.component.html',
  styleUrls: ['./service-breadcrumbs.component.css']
})
export class ServiceBreadcrumbsComponent implements OnInit {

  @Input()
  service: Service
  url: string
  shareLinksDialogComponent: MatDialogRef<ShareLinksDialogComponent>;
  constructor(private title: PageTitleService, private router: Router, private matDialog: MatDialog) { }

  ngOnInit() {
    this.url = this.router.url;
    this.title.updateTitle(this.service.serviceName)
    this.title.updateMetaTitle(this.service.serviceName)
    this.title.updateMetaInfo(this.service.serviceName + ', ' + this.service.smeInfo.smeName
      + ', ' + this.service.smeInfo.smeAddress.locality + ', ' + this.service.smeInfo.smeAddress.city)
    this.title.updateMetaURL(this.router.url)
    this.title.updateMetaImage(this.service.mainImage)
  }

  onClickShare() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = false
    dialogConfig.width = '500px';
    dialogConfig.height = '250px';
    dialogConfig.data = { url: this.url, name: this.service.serviceName,mailContent:'Service'}
    this.shareLinksDialogComponent = this.matDialog.open(ShareLinksDialogComponent, dialogConfig);

  }
}
