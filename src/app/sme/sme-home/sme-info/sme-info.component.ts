import { Component, OnInit, Input } from '@angular/core';
import { SMEInformationDto } from '@models/sme';
import { ItemsCount } from '@models/sme-items-count';
import { ShareLinksDialogComponent } from 'app/shared/components/share-links-dialog/share-links-dialog.component';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sme-info',
  templateUrl: './sme-info.component.html',
  styleUrls: ['./sme-info.component.css']
})
export class SmeInfoComponent implements OnInit {

  @Input()
  smes: SMEInformationDto
  @Input()
  editModeItemsCount: ItemsCount
  data: any
  shareLinksDialogComponent: MatDialogRef<ShareLinksDialogComponent>;
  url: string
  chartOptions: any
  constructor(private router: Router, private matDialog: MatDialog) {
  }

  ngOnInit() {
    this.url = '/sme/'+this.smes.sUuid;
    // this.chartOptions = {
    //   legend: {
    //     display: false
    //   }
    // },
      this.data = {
        labels: [
          'Products',
          'Service',
          'Certificates',
          'Infrastructure',
          'Team',
          'Gallery',
          'Jobs'],
        datasets: [
          {
            data: [
              this.editModeItemsCount.totalProducts,
              this.editModeItemsCount.totalServices,
              this.editModeItemsCount.totalCertificates,
              this.editModeItemsCount.totalInfras,
              this.editModeItemsCount.totalTeams,
              this.editModeItemsCount.totalGalleries,
              this.editModeItemsCount.totalVacancies,
            ],

            backgroundColor: [
              "#e94949",
              "#ff9933",
              "#f6f655",
              "#80ff80",
              "#6666ff",
              "#c680ff",
              "#99ffff",

            ],
            hoverBackgroundColor: [
              "#FF0000",
              "#FF7F00",
              "#FFFF00",
              "#00FF00",
              "#0000FF",
              "#8B00FF",
              "#00ffff"
            ]
          }]

      };

  }

  onClickShare() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = false
    dialogConfig.width = '500px';
    dialogConfig.height = '250px';
    dialogConfig.data = { url: this.url, name: this.smes.smeName, mailContent: 'SME', sUuid: this.smes.sUuid }
    this.shareLinksDialogComponent = this.matDialog.open(ShareLinksDialogComponent, dialogConfig);
  }
}
