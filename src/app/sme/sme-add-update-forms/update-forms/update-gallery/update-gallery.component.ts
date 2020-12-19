import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { SMEImage } from '@models/sme-image';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TokenService } from '@services/token/token.service';
import { PageTitleService } from '@services/page-title/page-title.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { ConstantService } from '@services/common/constant-service.service';
import { CustomHttpResponse } from '@models/custom.response';
import { SMEGallery } from '@models/gallery';
import { SnackBarService } from '@services/common/snack-bar.service';
import { SelectedCreditType, CreditErrorCode, CreditType } from '@models/pricing';
import { LazySmeModuleService } from 'app/sme/http-service/lazy-sme-module.service';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { MatDialog } from '@angular/material';
import { NoCreditsLeftComponent } from 'app/shared/components/no-credits-left/no-credits-left.component';
import { BuyCreditsComponent } from 'app/shared/components/buy-credits/buy-credits.component';
declare var ga: Function;
@Component({
  selector: 'app-update-gallery',
  templateUrl: './update-gallery.component.html',
  styleUrls: ['./update-gallery.component.css']
})
export class UpdateGalleryComponent implements OnInit {


  updateGalleryForm: FormGroup
  smeId: string
  draft: boolean = false
  publish: boolean = true
  showButton: boolean = true
  uploadedImages = new Array<SMEImage>(20);
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
  showForm: boolean
  showSpinner: boolean = true
  showError: boolean
  imageUpdatable: boolean = false;
  contentServer: string = environment.CONTENT_SERVER
  sUuid: string
  constructor(private formBuilder: FormBuilder, private constants: ConstantService,
    private http: HttpClient, private token: TokenService, private router: Router,
    private route: ActivatedRoute, private smeService: LazySmeModuleService, private snackBar: SnackBarService,
    private dialog: DialogService,private matDialog:MatDialog,
    private title: PageTitleService) {
    this.imageTypes = constants.getImageFormats();
    this.allowedImageSize = constants.getMaxFileSize();
    ga('set', 'page', router.url);
    ga('send', 'pageview');
  }

  ngOnInit() {
    this.title.updateTitle('Update Gallery')
    this.sUuid = this.token.getSmeId();
    this.updateGalleryForm = this.formBuilder.group({
      galleryUuid: new FormControl(null),
      galleryTitle: new FormControl(null, [Validators.required, Validators.maxLength(50), Validators.minLength(3)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(20), Validators.maxLength(500)]),
    })
    this.route.queryParams.subscribe(

      g => {
        let galleryUuid = g['g']
        if (galleryUuid != undefined) {
          this.getGalleryData(galleryUuid)

        }
      }
    )
  }

  getGalleryData(galleryUuid) {
    this.smeService.getGallery(galleryUuid).subscribe(
      res => {
        if (!res.error && res.code == 200) {
          this.updateGalleryForm.patchValue(
            {
              galleryTitle: res.data.galleryTitle,
              description: res.data.description,
              galleryUuid: res.data.galleryUuid,

            }
          )
          for (let i = 0; i < res.data.images.length; i++) {
            this.uploadedImages[this.indexCount] = res.data.images[i];
            this.selectedImages.push(res.data.images[i]);
            ++this.indexCount;
          }
        }
      },
      err => {
      }
    )
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
    this.imageSizeError = false
    this.imageTypeError = false

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
  deleteImageGallery(index: number, image: SMEImage) {
    this.selectedImages.splice(index, 1);
    this.uploadedImages.splice(index, 1)
    this.newAddedImages.splice(this.newAddedImages.indexOf(image), 1)
    this.uploadedImages.push(undefined)
    --this.indexCount
  }
  onUpdateGallery(status: boolean) {

    if (this.updateGalleryForm.valid && this.selectedImages.length > 0) {

      this.showButton = false

      this.smeId = this.token.getSmeId()

      let updateGallery: SMEGallery = this.updateGalleryForm.value;
      updateGallery.active = status

      let images = new Array<SMEImage>()

      Array.from(this.uploadedImages).filter(f => f != undefined).forEach(
        file => images.push(file)
      )
      if (updateGallery.galleryTitle != null && updateGallery.galleryTitle.length <= 0) {
        updateGallery.galleryTitle = null
      }

      if (updateGallery.description != null && updateGallery.description.length <= 0) {
        updateGallery.description = null
      }

      updateGallery.images = images



      this.smeService.updateGallery(updateGallery).subscribe(
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

              let ref = this.matDialog.open(NoCreditsLeftComponent,this.dialog.getNoCreditsDialogConfig(selectedCreditType))
              ref.afterClosed().subscribe(
                res => {
                  if (res) {
                    let ref = this.matDialog.open(BuyCreditsComponent,this.dialog.getBuyCreditsDialogConfig(selectedCreditType))
                    ref.afterClosed().subscribe(
                      res => {
                        if (res) {
                          this.onUpdateGallery(status);
                        }
                      }
                    )
                  }
                }
              )
            }
          }
          else {
            this.snackBar.open('Gallery Update Successfully !!')
            this.router.navigateByUrl('/my-sme/'+this.smeId+'/galleries');
          }

        },

      );
    }
    else {
      if (this.selectedImages.length <= 0) {
        this.imageRequired = true
      }
      window.scrollTo(0,0)

    }
  }
  onCancel() {
    this.router.navigateByUrl('/my-sme/'+this.smeId+'/galleries');

  }

}
