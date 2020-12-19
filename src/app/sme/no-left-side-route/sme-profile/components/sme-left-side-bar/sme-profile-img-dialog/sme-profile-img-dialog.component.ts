import { Component, OnInit, Inject } from '@angular/core';
import { environment } from 'environments/environment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBarService } from '@services/common/snack-bar.service';
import { Router } from '@angular/router';
import { TokenService } from '@services/token/token.service';
import { LazySmeModuleService } from 'app/sme/http-service/lazy-sme-module.service';
import { ConstantService } from '@services/common/constant-service.service';

@Component({
  selector: 'app-sme-profile-img-dialog',
  templateUrl: './sme-profile-img-dialog.component.html',
  styleUrls: ['./sme-profile-img-dialog.component.css']
})
export class SmeProfileImgDialogComponent implements OnInit {

  myFiles: string[] = [];
  contentServer: string = environment.CONTENT_SERVER
  file: any
  smefaceImage: boolean = true
  selectedImages: boolean
  urls = new Array<string>();
  imageRequired: boolean
  imageTypes: Array<string>
  imageUploadFail: boolean
  imageSizeError: boolean
  imageTypeError: boolean
  sUuid: string
  allowedImageSize: number
  showUploadProgress: boolean

  constructor(private dialogRef: MatDialogRef<SmeProfileImgDialogComponent>,
    private smeService: LazySmeModuleService, private token: TokenService, private snackBar: SnackBarService, private router: Router, @Inject(MAT_DIALOG_DATA) public data: any, private constantService: ConstantService) {
    this.imageTypes = constantService.getImageFormats();
    this.allowedImageSize = constantService.getMaxFileSize();
  }

  ngOnInit() {
    this.sUuid = this.token.getSmeId();
  }

  onFileChanged(e: any) {
    this.imageSizeError = false
    this.imageTypeError = false
    this.file = e.target.files[0]
    if (this.file != null || this.file != undefined) {
      this.selectedImages = true
    }

    if (this.imageTypes.indexOf(this.file.type) === -1) {
      this.imageTypeError = true
      this.selectedImages = false

      return false
    } else if (this.file.size > this.allowedImageSize) {
      this.imageSizeError = true
      this.selectedImages = false

      return false
    }
    if (this.file) {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.urls.push(e.target.result);
      }
      reader.readAsDataURL(this.file);
    }
  }

  getFormData() {

    this.showUploadProgress = true
    this.imageUploadFail = false
    let formData: FormData = new FormData()

    for (let i = 0; i < this.myFiles.length; i++) {
      formData.append("files", this.myFiles[i]);
    }
    return formData
  }

  onUploadImage() {
    if (!this.imageSizeError && !this.imageTypeError && this.selectedImages) {
      let formData = new FormData()
      formData.append('logoImage', this.file)
      this.smeService.changeSmeProfileImage(formData).subscribe(
        res => {
          if (res.error) {

          }
          else {
            this.snackBar.open('LOGO Upload Successfully ');
            this.router.navigateByUrl('', { skipLocationChange: true }).then(() =>
              this.router.navigate(['my-sme', this.sUuid, 'profile']));
            this.dialogRef.close()
          }
        }
      )
    }
  }

  onDeleteImage(index) {
    this.myFiles.splice(index, 1)
    this.urls.splice(index, 1)
    this.selectedImages = false
  }

  onClickCancle() {
    this.dialogRef.close()
  }

}
