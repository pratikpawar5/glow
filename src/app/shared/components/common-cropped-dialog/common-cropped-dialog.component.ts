import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-common-cropped-dialog',
  templateUrl: './common-cropped-dialog.component.html',
  styleUrls: ['./common-cropped-dialog.component.css']
})
export class CommonCroppedDialogComponent implements OnInit {

  imageChangedEvent: any = '';
  croppedImage: any = '';
  showCropper = false;
  @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;
  file: any
  showButton: boolean = false
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private commonCroppedImageDialog: MatDialogRef<CommonCroppedDialogComponent>) { }

  ngOnInit() {
    this.imageChangedEvent = this.data.imageChangedEvent
  }

  imageCropped(event: ImageCroppedEvent) {
    this.file = new File([event.file], this.imageChangedEvent.target.files[0].name, {
      type: this.imageChangedEvent.target.files[0].type
    });
    if (this.file) {
      let reader = new FileReader();
      reader.onloadend = (e) => {
        this.croppedImage = reader.result;
      }
      reader.readAsDataURL(this.file);
    }
  }

  imageLoaded() {
    this.showCropper = true;
  }
  cropperReady() {
  }
  loadImageFailed() {
  }
  rotateLeft() {
    this.imageCropper.rotateLeft();
  }

  rotateRight() {
    this.imageCropper.rotateRight();
  }
  flipHorizontal() {
    this.imageCropper.flipHorizontal();
  }
  flipVertical() {
    this.imageCropper.flipVertical();
  }

  UploadToServer() {
    this.commonCroppedImageDialog.close(this.file);
  }
  onClickClose() {
    this.commonCroppedImageDialog.close();
  }

}
