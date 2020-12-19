import { Component, OnInit, Input } from '@angular/core';
import { SMEInformationDto } from '@models/sme';
import { Router } from '@angular/router';
import { ViewModeItemsCount, ItemsCount } from '@models/sme-items-count';
import { MatDialogConfig, MatDialogRef, MatDialog } from '@angular/material';
import { ShareLinksDialogComponent } from 'app/shared/components/share-links-dialog/share-links-dialog.component';

@Component({
  selector: 'app-sme-web-home-content',
  templateUrl: './sme-web-home-content.component.html',
  styleUrls: ['./sme-web-home-content.component.css']
})
export class SmeWebHomeContentComponent implements OnInit {

  @Input()
  smes: SMEInformationDto;
  @Input()
  viewModeItemsCount: ItemsCount;
  data: any;
  url: string
  headingArray: Array<string> = new Array<string>();
  dataArray: Array<number> = new Array<number>();
  backgroundColorArray: Array<string> = new Array<string>();
  hoverBackgroundColorArray: Array<string> = new Array<string>();
  shareLinksDialogComponent: MatDialogRef<ShareLinksDialogComponent>;

  constructor(private router: Router, private matDialog: MatDialog) {
  }

  ngOnInit() {
    this.url = this.router.url
    if (this.viewModeItemsCount.activeApprovedProducts > 0) {
      this.headingArray.push('Products');
      this.dataArray.push(this.viewModeItemsCount.activeApprovedProducts);
      this.backgroundColorArray.push('#e94949');
      this.hoverBackgroundColorArray.push('#FF0000');
    }
    if (this.viewModeItemsCount.activeApprovedServices > 0) {
      this.headingArray.push('Services');
      this.dataArray.push(this.viewModeItemsCount.activeApprovedServices);
      this.backgroundColorArray.push('#ff9933');
      this.hoverBackgroundColorArray.push('#FF7F00');
    }
    if (this.viewModeItemsCount.activeApprovedCertificates > 0) {
      this.headingArray.push('Certificates')
      this.dataArray.push(this.viewModeItemsCount.activeApprovedCertificates);
      this.backgroundColorArray.push('#f6f655');
      this.hoverBackgroundColorArray.push('#FFFF00');
    }
    if (this.viewModeItemsCount.activeApprovedInfras > 0) {
      this.headingArray.push('Infrastructures')
      this.dataArray.push(this.viewModeItemsCount.activeApprovedInfras);
      this.backgroundColorArray.push('#80ff80');
      this.hoverBackgroundColorArray.push('#00FF00');
    }
    if (this.viewModeItemsCount.activeApprovedTeams > 0) {
      this.headingArray.push('Management Team')
      this.dataArray.push(this.viewModeItemsCount.activeApprovedTeams);
      this.backgroundColorArray.push('#6666ff');
      this.hoverBackgroundColorArray.push('#0000FF');
    }
    if (this.viewModeItemsCount.activeApprovedGalleries > 0) {
      this.headingArray.push('Gallery')
      this.dataArray.push(this.viewModeItemsCount.activeApprovedGalleries);
      this.backgroundColorArray.push('#c680ff');
      this.hoverBackgroundColorArray.push('#8B00FF');
    }
    if (this.viewModeItemsCount.activeApprovedVacancies > 0) {
      this.headingArray.push('Jobs')
      this.dataArray.push(this.viewModeItemsCount.activeApprovedVacancies);
      this.backgroundColorArray.push('#99ffff');
      this.hoverBackgroundColorArray.push('#00ffff');
    }

    this.data = {
      labels: this.headingArray,
      datasets: [
        {
          data: this.dataArray,
          backgroundColor: this.backgroundColorArray,
          hoverBackgroundColor: this.hoverBackgroundColorArray
        }]
    };
  }

  onClickShare() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = false
    dialogConfig.width = '500px';
    dialogConfig.height = '250px';
    dialogConfig.data = { url: this.url, name: this.smes.smeName, mailContent: 'SME',sUuid:this.smes.sUuid}
    this.shareLinksDialogComponent = this.matDialog.open(ShareLinksDialogComponent, dialogConfig);
  }

}
