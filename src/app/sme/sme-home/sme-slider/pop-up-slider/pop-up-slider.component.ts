import { Component, OnInit, Inject } from '@angular/core';
import { SMEImage } from '@models/sme-image';
import { environment } from 'environments/environment';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TokenService } from '@services/token/token.service';
import { ConstantService } from '@services/common/constant-service.service';
import { CustomHttpResponse } from '@models/custom.response';
import { SnackBarService } from '@services/common/snack-bar.service';
import { LazySmeModuleService } from 'app/sme/http-service/lazy-sme-module.service';

@Component({
  selector: 'app-pop-up-slider',
  templateUrl: './pop-up-slider.component.html',
  styleUrls: ['./pop-up-slider.component.css']
})
export class PopUpSliderComponent implements OnInit {
  uploadedImages = new Array<SMEImage>();
  selectedImages = new Array<SMEImage>();
  newAddedImages = new Array<SMEImage>();
  imageTypes: Array<string>
  allowedImageSize: number
  indexCount: number = 0
  progressPercent: number
  imageUploadFail: boolean
  showUploadProgress: boolean
  imageRequired: boolean
  imageSizeError: boolean
  imageTypeError: boolean
  showSpinner: boolean = true
  imageUpdatable: boolean = false;
  contentServer: string = environment.CONTENT_SERVER
  sUuid: string
  constructor(private http: HttpClient, private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: Array<SMEImage>, private smeService: LazySmeModuleService,
    private token: TokenService, private dialogRef: MatDialogRef<PopUpSliderComponent>,
    private snackBar: SnackBarService, private constants: ConstantService) {
    this.imageTypes = constants.getImageFormats();
    this.allowedImageSize = constants.getMaxFileSize()
  }
  ngOnInit() {
    this.sUuid = this.token.getSmeId();
    if (this.data != null && this.data != undefined) {
      this.data.filter(img => img != null || img != undefined).forEach(img => {
        this.uploadedImages[this.indexCount] = img
        this.selectedImages.push(img);
        ++this.indexCount
      })
    }
  }
  onFileChanged(files: Array<any>) {
    let images = new Array<File>()
    this.imageSizeError = false
    this.imageTypeError = false
    for (let i = 0; i < files.length; i++) {
      if (this.imageTypes.indexOf(files[i].type) === -1) {
        this.imageTypeError = true
        return false
      } else if (files[i].size > this.allowedImageSize) {
        this.imageSizeError = true
        return false
      }
    }
    for (let i = 0; i < files.length; i++) {
      if (this.selectedImages.length < 5) {
        this.selectedImages.push(files[i])
        images.push(files[i])
      } else {
        break
      }
    }
    if (images.length > 0) {
      this.uploadImagesToServer(images)
    }
  }
  uploadImagesToServer(images: Array<File>) {
    this.showUploadProgress = true
    this.imageUploadFail = false
    this.imageSizeError = false
    this.imageTypeError = false
    let formData = new FormData()
    Array.from(images).forEach(file => {
      formData.append('images', file)
    })
    this.http.post<CustomHttpResponse<any>>(environment.SME_INFORMATION_URL + 'images', formData, {
      reportProgress: true, observe: 'events', params: { entityType: "sliderImages" }
    }).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressPercent = Math.round(100 * event.loaded / event.total);
        }
        else if (event instanceof HttpResponse) {
          for (let i = 0; i < this.selectedImages.length; i++) {
            if (event.body.data[i] != null || event.body.data[i] != undefined) {
              this.uploadedImages[this.indexCount] = event.body.data[i]
              this.newAddedImages.push(event.body.data[i])
              ++this.indexCount
            }
          }
          this.showUploadProgress = false
          this.imageRequired = false
        }
      },
      err => {
        this.imageUploadFail = true
        this.showUploadProgress = false
        Array.from(images).forEach(file => {
          this.selectedImages.pop()
        })
      },
    )
  }
  deleteBannerImage(index: number, image: SMEImage) {
    if (this.newAddedImages.indexOf(image) !== -1) {
      this.newAddedImages.splice(this.newAddedImages.indexOf(image), 1)
    }
    this.selectedImages.splice(index, 1)
    this.uploadedImages.splice(index, 1)
    --this.indexCount
  }
  close() {
    this.dialogRef.close();
  }
  onSubmit() {
    if (this.selectedImages.length > 0) {
      this.smeService.uploadSliderImage(this.uploadedImages).subscribe(
        res => {
          this.snackBar.open('Images Added Successfully !!')
          this.router.navigateByUrl('', { skipLocationChange: true }).then(() =>
            this.router.navigate(['my-sme', this.sUuid, 'home']));
          this.dialogRef.close();
        }
      )
    }
    else {
      if (this.selectedImages.length <= 0) {
        this.imageRequired = true
      }
    }
  }
}
