import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'environments/environment';
import { SmeProfileImgDialogComponent } from './sme-profile-img-dialog/sme-profile-img-dialog.component';
import { MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { SMEInformationDto } from '@models/sme';

@Component({
  selector: 'app-sme-left-side-bar',
  templateUrl: './sme-left-side-bar.component.html',
  styleUrls: ['./sme-left-side-bar.component.css']
})
export class SmeLeftSideBarComponent implements OnInit {

  @Input()
  smes: SMEInformationDto
  uploadDialogRef: MatDialogRef<SmeProfileImgDialogComponent>;
  contentServer:string = environment.CONTENT_SERVER;
  
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  onUserProfileImage() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose=true
    dialogConfig.autoFocus = false;
    dialogConfig.width = '350px';
    dialogConfig.data = this.smes
    this.uploadDialogRef = this.dialog.open(SmeProfileImgDialogComponent, dialogConfig);
  }

}
