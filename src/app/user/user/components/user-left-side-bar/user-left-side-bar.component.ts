import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'environments/environment';
import { MatDialogConfig, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { UploadUserProfilePhotoComponent } from './upload-user-profile-photo/upload-user-profile-photo.component';

@Component({
  selector: 'app-user-left-side-bar',
  templateUrl: './user-left-side-bar.component.html',
  styleUrls: ['./user-left-side-bar.component.css']
})
export class UserLeftSideBarComponent implements OnInit {

  @Input()
  user: any

  uploadDialogRef: MatDialogRef<UploadUserProfilePhotoComponent>;
  contentServer: string = environment.CONTENT_SERVER

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  onUserProfileImage() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = false;
    dialogConfig.width = '350px';
    dialogConfig.data = this.user
    this.uploadDialogRef = this.dialog.open(UploadUserProfilePhotoComponent, dialogConfig);
  }

  checkImage(imageUrl: string) {
    if (imageUrl != null && imageUrl.startsWith("https://")) {
      return false
    }
    return true
  }
}
