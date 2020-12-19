import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Privacy, BusinessPostImages, BusinessPost } from '@models/business-posts';
import { CountAndData } from '@models/business-circle';
import { MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SocialService } from 'app/social/social-service/social.service';
import { TokenService } from '@services/token/token.service';
import { HttpEventType, HttpResponse, HttpClient } from '@angular/common/http';
import { BusinessPostService } from '@services/business-post/business-post.service';
import { Router } from '@angular/router';
import { SelectedCreditType, CreditType, CreditErrorCode } from '@models/pricing';
import { environment } from 'environments/environment';
import { SnackBarService } from '@services/common/snack-bar.service';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { BuyCreditsComponent } from 'app/shared/components/buy-credits/buy-credits.component';
import { NoCreditsLeftComponent } from 'app/shared/components/no-credits-left/no-credits-left.component';
import { CustomHttpResponse } from '@models/custom.response';
import { PrivateConnectionDialogBoxComponent } from './private-connection-dialog-box/private-connection-dialog-box.component';
import { ConstantService } from '@services/common/constant-service.service';
export interface privacy {
  value: Privacy;
  viewValue: string;
}
@Component({
  selector: 'app-write-business-post',
  templateUrl: './write-business-post.component.html',
  styleUrls: ['./write-business-post.component.css']
})
export class WriteBusinessPostComponent implements OnInit {
  countAndData: CountAndData
  privateConnectionDialogView: MatDialogRef<PrivateConnectionDialogBoxComponent>
  businessPostForm: FormGroup
  privacyCategory = [
    'public', 'circle', 'private']
  connectionIds: string[] = []
  connectionIdLength: number = 0
  /*Images Uploaded*/
  indexCount: number = 0;
  uploadedImages = new Array<BusinessPostImages>(5)
  selectedImages = new Array<File>();
  imageTypes: Array<string>
  privacyBusinessPost: privacy[] = [
    {
      value: Privacy.CIRCLE, viewValue: 'circle',
    },
    {
      value: Privacy.PUBLIC, viewValue: 'public',
    },
    {
      value: Privacy.PRIVATE, viewValue: 'private'
    }
  ];

  allowedImageSize: number
  progressPercent: number
  imageSizeError: boolean
  imageTypeError: boolean /*Images Uploaded End*/
  imageRequired: boolean
  imageUploadFail: boolean
  showUploadProgress: boolean
  sUuid: string
  noConnection: boolean
  showButton: boolean = true;
  contentServer: string = environment.CONTENT_SERVER
  constructor(private socialService: SocialService, private router: Router,
    private dialog: DialogService, private snackBar: SnackBarService,
    private businessPostService: BusinessPostService, private http: HttpClient,
    private matDialog: MatDialog, private formBuilder: FormBuilder, private token: TokenService, private constantService: ConstantService) {
    this.imageTypes = constantService.getImageFormats();
    this.allowedImageSize = constantService.getMaxFileSize();
  }

  ngOnInit() {
    this.loadForm();
    this.sUuid = this.token.getSmeId();
    this.socialService.getMyCircleConnection().subscribe(
      res => {
        if (res.error) {

        }
        else {
          this.countAndData = res.data;
        }
      },
    );
  }
  loadForm() {
    this.businessPostForm = this.formBuilder.group({
      businessPostId: new FormControl(null),
      description: new FormControl(null, [Validators.maxLength(2000), Validators.minLength(20), Validators.required]),
      privacy: new FormControl(null)
    });
    this.businessPostForm.controls['privacy'].setValue(this.privacyBusinessPost[1].value)
  }

  onPrivateClick() {
    if (this.countAndData == null || this.countAndData == undefined) {
      this.noConnection = true;
    }
    else {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = false;
      dialogConfig.width = '850px';
      dialogConfig.height = '550px';
      if (this.connectionIds != null && this.connectionIds.length > 0) {
        dialogConfig.data = this.connectionIds
      }

      this.privateConnectionDialogView = this.matDialog.open(PrivateConnectionDialogBoxComponent, dialogConfig);

      this.privateConnectionDialogView.afterClosed().subscribe(
        res => {
          if (res != null && res.length > 0) {
            this.connectionIds = res;
            this.connectionIdLength = this.connectionIds.length
          }
          else {
            this.connectionIds = undefined
            this.businessPostForm.controls['privacy'].setValue(this.privacyBusinessPost[1].value)
          }
        }
      )
    }
  }

  onCircle() {
    if (this.countAndData == null || this.countAndData == undefined) {
      this.noConnection = true;
    }
    if (this.connectionIds != null && this.connectionIds.length > 0) {
      this.connectionIds = undefined
    }
  }
  onPublic() {
    if (this.connectionIds.length > 0) {
      this.connectionIds = undefined
    }
    this.noConnection = false
  }

  onFileChanged(files: Array<File>) {
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
    let formData = new FormData()

    Array.from(images).forEach(file => {
      formData.append('files', file)
    })
    this.http.post<CustomHttpResponse<any>>(environment.BUSINESS_POST + '/upload-files', formData, {
      reportProgress: true, observe: 'events',
    }).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressPercent = Math.round(100 * event.loaded / event.total);
        }
        else if (event instanceof HttpResponse) {
          for (let i = 0; i < this.selectedImages.length; i++) {
            if (event.body.data[i] != null || event.body.data[i] != undefined) {
              this.uploadedImages[this.indexCount] = event.body.data[i]
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
      }
    )
  }

  deleteImageFromServer(index: number, fileLocation: string) {
    this.imageUploadFail = false
    this.businessPostService.deleteImage(fileLocation).subscribe(
      res => {
        this.selectedImages.splice(index, 1)
        this.uploadedImages.splice(index, 1)
        this.uploadedImages.push(undefined)
        --this.indexCount
      },
      err => {
      })
  }

  onSubmit() {
    if (this.businessPostForm.valid) {
      this.showButton = false
      let uploadBusinessPost: BusinessPost = this.businessPostForm.value
      uploadBusinessPost.tags = this.connectionIds
      let images = new Array<BusinessPostImages>()

      this.uploadedImages.filter(img => img != null || img != undefined).forEach(img => {
        images.push(img);
      })

      if (this.selectedImages.length > 0) {
        uploadBusinessPost.files = images
      }
      this.businessPostService.businessPost(uploadBusinessPost).subscribe(
        res => {
          if (res.error) {
            if (res.code === 402) {
              this.showButton = true
              let selectedCreditType: SelectedCreditType


              if (res.errorResponse.errorCode === CreditErrorCode.BUSINESS_POST) {
                selectedCreditType = {
                  creditType: CreditType.BUSINESS_POST,
                  displayName: res.errorResponse.typeDisplayName
                }
              }

              if (res.errorResponse.errorCode === CreditErrorCode.IMAGE_STORAGE) {
                selectedCreditType = {
                  creditType: CreditType.IMAGE_STORAGE,
                  displayName: res.errorResponse.typeDisplayName
                }
              }

              let ref = this.matDialog.open(NoCreditsLeftComponent, this.dialog.getNoCreditsDialogConfig(selectedCreditType))
              ref.afterClosed().subscribe(
                res => {
                  if (res) {
                    this.matDialog.open(BuyCreditsComponent, this.dialog.getBuyCreditsDialogConfig(selectedCreditType))
                  }
                }
              )
            }
            else if (res.code == 500) {
              this.showButton = true
              this.snackBar.open('No Connections yet in Social..Please make the connctions !!')
              this.router.navigateByUrl('', { skipLocationChange: true }).then(() =>
                this.router.navigate(['social', this.sUuid]));
            }

          }
          else {
            this.uploadedImages = undefined;
            this.router.navigateByUrl('', { skipLocationChange: true }).then(() =>
              this.router.navigate(['social', this.sUuid]));
          }

        },
      )
    }
    else {
      if (this.selectedImages.length <= 0) {
        this.imageRequired = true
      }
    }
  }
}