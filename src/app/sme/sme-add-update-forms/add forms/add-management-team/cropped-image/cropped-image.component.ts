import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-cropped-image',
  templateUrl: './cropped-image.component.html',
  styleUrls: ['./cropped-image.component.css']
})
export class CroppedImageComponent implements OnInit {

  imageChangedEvent: any = '';
  croppedImage: any = '';
  showCropper = false;
  @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;
  file: any
  showButton: boolean = false
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private croppedImageDialog: MatDialogRef<CroppedImageComponent>) { }

  ngOnInit() {
    this.imageChangedEvent = this.data
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
    this.croppedImageDialog.close(this.file);
  }
  onClickClose() {
    this.croppedImageDialog.close();
  }
}
