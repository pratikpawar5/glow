import { Component, OnInit, Inject } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-share-links-dialog',
  templateUrl: './share-links-dialog.component.html',
  styleUrls: ['./share-links-dialog.component.css']
})
export class ShareLinksDialogComponent implements OnInit {
  isDesktopDevice: boolean
  isMobile: boolean
  isTablet: boolean 
  url: any
  public myAngularxQrCode: string = null;

  constructor(private deviceService: DeviceDetectorService, public domSanitizer: DomSanitizer, private dialogRef: MatDialogRef<ShareLinksDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.url = "whatsapp://send?text=https://www.gloqr.com" + this.data.url;
    this.url = this.domSanitizer.bypassSecurityTrustUrl(this.url);

    this.isDesktopDevice = this.deviceService.isDesktop();
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
    this.myAngularxQrCode = 'https://www.gloqr.com/sme/' + this.data.sUuid;
  }
  onClickClose() {
    this.dialogRef.close();
  }
}
