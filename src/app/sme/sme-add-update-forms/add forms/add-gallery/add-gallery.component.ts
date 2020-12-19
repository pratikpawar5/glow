import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SMEImage } from '@models/sme-image';
import { environment } from 'environments/environment';
import { PageTitleService } from '@services/page-title/page-title.service';
import { Router } from '@angular/router';
import { ConstantService } from '@services/common/constant-service.service';
import { CustomHttpResponse } from '@models/custom.response';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { SMEGallery } from '@models/gallery';
import { TokenService } from '@services/token/token.service';
import { SnackBarService } from '@services/common/snack-bar.service';
import { CreditErrorCode, SelectedCreditType, CreditType } from '@models/pricing';
import { LazySmeModuleService } from 'app/sme/http-service/lazy-sme-module.service';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { MatDialog } from '@angular/material';
import { NoCreditsLeftComponent } from 'app/shared/components/no-credits-left/no-credits-left.component';
import { BuyCreditsComponent } from 'app/shared/components/buy-credits/buy-credits.component';
declare var ga: Function;
@Component({
  selector: 'app-add-gallery',
  templateUrl: './add-gallery.component.html',
  styleUrls: ['./add-gallery.component.css']
})
export class AddGalleryComponent implements OnInit {

  draft: boolean = false
  publish: boolean = true
  galleryForm: FormGroup;
  imageRequired: boolean
  imageUploadFail: boolean
  showUploadProgress: boolean
  progressPercent: number
  uploadedImages = new Array<SMEImage>(20)
  allowedImageSize: number
  selectedImages = new Array<File>()
  indexCount: number = 0
  imageTypes: Array<string>
  imageSizeError: boolean
  imageTypeError: boolean
  showButton: boolean = true
  contentServer: string = environment.CONTENT_SERVER
  sUuid: string
  constructor(private pageTitleService: PageTitleService, private matDialog: MatDialog,
    private dialog: DialogService, private token: TokenService,
    private router: Router, private smeService: LazySmeModuleService,
    private snackBar: SnackBarService, private constantsService: ConstantService,
    private formBuilder: FormBuilder, private http: HttpClient) {
    this.imageTypes = constantsService.getImageFormats();
    this.allowedImageSize = constantsService.getMaxFileSize();

    ga('set', 'page', router.url);
    ga('send', 'pageview');
  }

  ngOnInit() {
    this.sUuid = this.token.getSmeId();
    this.pageTitleService.updateTitle('Add Gallery')
    this.galleryForm = this.formBuilder.group({
      galleryUuid: new FormControl(null),
      galleryTitle: new FormControl(null, [Validators.required, Validators.maxLength(50), Validators.minLength(3)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(20), Validators.maxLength(500)]),
    })

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
      if (this.selectedImages.length < 20) {
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
      formData.append('images', file)
    })
    this.http.post<CustomHttpResponse<any>>(environment.SME_INFORMATION_URL + 'images', formData, {
      reportProgress: true, observe: 'events', params: { entityType: "galleries" }
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
      },
    )
  }
  deleteImageFromServer(index: number, fileLocation: string) {
    this.imageUploadFail = false
    this.http.delete(environment.CONTENT_SERVER_DELETE_API + fileLocation)
      .subscribe(res => {
        this.selectedImages.splice(index, 1)
        this.uploadedImages.splice(index, 1)
        this.uploadedImages.push(undefined)
        --this.indexCount
      })
  }
  onSubmit(status: boolean) {

    if (this.galleryForm.valid && this.selectedImages.length > 0) {
      this.showButton = false
      let uploadGallery: SMEGallery = this.galleryForm.value;

      let images = new Array<SMEImage>()

      this.uploadedImages.filter(img => img != null || img != undefined).forEach(img => {
        images.push(img);
      })

      if (uploadGallery.galleryTitle != null && uploadGallery.galleryTitle.length <= 0) {
        uploadGallery.galleryTitle = null
      }

      if (uploadGallery.description != null && uploadGallery.description.length <= 0) {
        uploadGallery.description = null
      }

      uploadGallery.images = images;
      uploadGallery.active = status
      this.smeService.addGallery(uploadGallery).subscribe(
        res => {
          if (res.error) {
            if (res.code === 402) {
              this.showButton = true
              let selectedCreditType: SelectedCreditType

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
                    let ref = this.matDialog.open(BuyCreditsComponent, this.dialog.getBuyCreditsDialogConfig(selectedCreditType))
                    ref.afterClosed().subscribe(
                      res => {
                        if (res) {
                          this.onSubmit(status);
                        }
                      }
                    )
                  }
                }
              )
            }
          }
          else {
            this.snackBar.open('Gallery Added Successfully !!')
            this.router.navigateByUrl('/my-sme/'+this.sUuid+'/galleries');
          }

        },

      );
    }
    else {
      if (this.selectedImages.length <= 0) {
        this.imageRequired = true
      }
      window.scrollTo(0, 0)

    }
  }

  onCancel() {
    this.router.navigateByUrl('/my-sme/'+this.sUuid+'/galleries');

  }
}
