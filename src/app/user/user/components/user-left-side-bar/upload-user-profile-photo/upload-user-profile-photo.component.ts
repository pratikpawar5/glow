import { Component, OnInit, Inject } from '@angular/core';
import { environment } from 'environments/environment';
import { TokenService } from '@services/token/token.service';
import { UserService } from '@services/user/user.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackBarService } from '@services/common/snack-bar.service';
import { ObjectType, DeleteObject } from '@models/common-delete';
import { User } from '@models/user';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { DeleteObjectsComponent } from 'app/shared/components/delete-objects/delete-objects.component';
import { ImageCropperComponent } from 'ngx-image-cropper';
import { CommonCroppedDialogComponent } from 'app/shared/components/common-cropped-dialog/common-cropped-dialog.component';
import { ConstantService } from '@services/common/constant-service.service';

@Component({
  selector: 'app-upload-user-profile-photo',
  templateUrl: './upload-user-profile-photo.component.html',
  styleUrls: ['./upload-user-profile-photo.component.css']
})
export class UploadUserProfilePhotoComponent implements OnInit {

  contentServer: string = environment.CONTENT_SERVER
  smefaceImage: boolean = true
  urls = new Array<string>();
  selectedImages: boolean
  imageRequired: boolean
  imageTypes: Array<string>
  imageUploadFail: boolean
  imageSizeError: boolean
  imageTypeError: boolean
  allowedImageSize: number
  showUploadProgress: boolean
  showButton: boolean = true
  uuid: string
  /*New*/
  imageChangedEvent: any = '';
  croppedImage: any = '';
  showCropper = false;
  imageCropper: ImageCropperComponent;
  file: any
  croppedImageDialog: MatDialogRef<CommonCroppedDialogComponent>;


  constructor(private token: TokenService, private matDialog: MatDialog,
    private dialog: DialogService, private snackBar: SnackBarService,
    private dialogRef: MatDialogRef<UploadUserProfilePhotoComponent>,
    private userService: UserService, private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any, private constantService: ConstantService) {
    this.imageTypes = constantService.getImageFormats();
    this.allowedImageSize = constantService.getMaxFileSize();
  }

  ngOnInit() {
    this.uuid = this.token.getUserId();
  }
  checkImage(imageUrl: string) {

    if (imageUrl != null && imageUrl.startsWith("https://")) {
      this.smefaceImage = false
    }

    return this.smefaceImage
  }
  onDeleteImage(data: User) {
    this.dialogRef.close()
    let deleteObj: DeleteObject<any> = {
      type: ObjectType.REMOVE_USER_PROFILE_IMAGE,
      uuid: this.token.getUserId(),
      cirlceObjects: data

    }
    this.matDialog.open(DeleteObjectsComponent, this.dialog.getDeleteDialogConfig(deleteObj))
  }
  onClickCancle() {
    this.dialogRef.close()
  }

  // onFileChanged(e: any) {

  //   this.imageSizeError = false
  //   this.imageTypeError = false
  //   this.file = e.target.files[0]
  //   if (this.file != null || this.file != undefined) {
  //     this.selectedImages = true
  //   }

  //   if (this.imageTypes.indexOf(this.file.type) === -1) {
  //     this.imageTypeError = true
  //     this.selectedImages = false
  //     return false
  //   } else if (this.file.size > this.allowedImageSize) {
  //     this.imageSizeError = true
  //     this.selectedImages = false

  //     return false
  //   }

  //   if (this.file) {
  //     let reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       this.urls.push(e.target.result);
  //     }
  //     reader.readAsDataURL(this.file);
  //   }
  // }

  onFileChanged(e: any) {
    this.imageSizeError = false
    this.imageTypeError = false
    this.imageChangedEvent = e
    if (this.imageChangedEvent.target.files[0] != null || this.imageChangedEvent.target.files[0] != undefined) {
      this.selectedImages = true
    }

    if (this.imageTypes.indexOf(this.imageChangedEvent.target.files[0].type) === -1) {
      this.imageTypeError = true
      this.selectedImages = false
      return false
    } else if (this.imageChangedEvent.target.files[0].size > this.allowedImageSize) {
      this.imageSizeError = true
      this.selectedImages = false

      return false
    }
    else {
      this.openCroppedImageDialog();
    }
  }

  openCroppedImageDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = false;
    dialogConfig.width = '800px';
    dialogConfig.height = '550px';
    dialogConfig.data = { imageChangedEvent: this.imageChangedEvent, user: 'User Profile' }
    let ref = this.croppedImageDialog = this.matDialog.open(CommonCroppedDialogComponent, dialogConfig);
    ref.afterClosed().subscribe(
      res => {
        if (res) {
          this.file = res
          this.onUploadImage();
        }
        else {
          this.selectedImages = false
        }
      }
    )
  }

  onRemoveImage(index) {
    this.urls.splice(index, 1)
    this.selectedImages = false
    this.file = null
  }

  onUploadImage() {
    let formData = new FormData()
    formData.append('profileImage', this.file)

    this.userService.uploadProfileImage(formData).subscribe(
      res => {
        if (res.error) {

        }
        else {
          this.snackBar.open('Image Upload Successfully ');
          this.token.updateToken(res.data.token)
          this.router.navigateByUrl('', { skipLocationChange: true }).then(() =>
            this.router.navigate(['account', this.uuid]));
          this.dialogRef.close();
        }
      }
    )
  }

  close() {
    this.dialogRef.close();
  }
}
