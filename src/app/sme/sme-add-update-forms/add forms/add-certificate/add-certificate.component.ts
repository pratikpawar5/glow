import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SMEImage } from '@models/sme-image';
import { environment } from 'environments/environment';
import { PageTitleService } from '@services/page-title/page-title.service';
import { Router } from '@angular/router';
import { CustomHttpResponse } from '@models/custom.response';
import { HttpEventType, HttpResponse, HttpClient } from '@angular/common/http';
import { SMECertificate } from '@models/certificate';
import { TokenService } from '@services/token/token.service';
import { SnackBarService } from '@services/common/snack-bar.service';
import { SelectedCreditType, CreditErrorCode, CreditType } from '@models/pricing';
import { LazySmeModuleService } from 'app/sme/http-service/lazy-sme-module.service';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { MatDialog } from '@angular/material';
import { NoCreditsLeftComponent } from 'app/shared/components/no-credits-left/no-credits-left.component';
import { BuyCreditsComponent } from 'app/shared/components/buy-credits/buy-credits.component';
import { ConstantService } from '@services/common/constant-service.service';
declare var ga: Function;
@Component({
  selector: 'app-add-certificate',
  templateUrl: './add-certificate.component.html',
  styleUrls: ['./add-certificate.component.css']
})
export class AddCertificateComponent implements OnInit {


  certificateForm: FormGroup;
  draft: boolean = false
  publish: boolean = true
  imageRequired: boolean
  imageUploadFail: boolean
  showUploadProgress: boolean
  progressPercent: number
  uploadedImages = new Array<SMEImage>(5)
  allowedImageSize: number
  selectedImages = new Array<File>()
  indexCount: number = 0
  imageTypes: Array<string>
  imageSizeError: boolean
  imageTypeError: boolean
  showButton: boolean = true
  contentServer: string = environment.CONTENT_SERVER
  suUid: string
  
  constructor(private pageTitleService: PageTitleService,
    private dialog: DialogService, private token: TokenService, private matDialog: MatDialog,
    private router: Router, private smeService: LazySmeModuleService,
    private snackBar: SnackBarService, private constantsService: ConstantService,
    private formBuilder: FormBuilder, private http: HttpClient) {
    this.imageTypes = constantsService.getImageFormats();
    this.allowedImageSize = constantsService.getMaxFileSize();
    ga('set', 'page', router.url);
    ga('send', 'pageview');
  }

  ngOnInit() {
    this.suUid = this.token.getSmeId();
    this.pageTitleService.updateTitle('Add Certificate')

    this.certificateForm = this.formBuilder.group({
      crtiUuid: new FormControl(null),
      certificateType: new FormControl(null, [Validators.required, Validators.maxLength(50), Validators.minLength(3)]),
      certificateDesc: new FormControl(null, [Validators.maxLength(500), Validators.minLength(20)])
    });

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
    this.imageSizeError = false
    this.imageTypeError = false

    let formData = new FormData()

    Array.from(images).forEach(file => {
      formData.append('images', file)
    })
    this.http.post<CustomHttpResponse<any>>(environment.SME_INFORMATION_URL + 'images', formData, {
      reportProgress: true, observe: 'events', params: { entityType: "certificates" }
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
      },
      )
  }
  onSubmit(status: boolean) {
    if (this.certificateForm.valid && this.selectedImages.length > 0) {
      this.showButton = false

      let uploadCertificate: SMECertificate = this.certificateForm.value;

      let images = new Array<SMEImage>()

      this.uploadedImages.filter(img => img != null || img != undefined).forEach(img => {
        images.push(img);
      })

      if (uploadCertificate.certificateType != null && uploadCertificate.certificateType.length <= 0) {
        uploadCertificate.certificateType = null
      }

      if (uploadCertificate.certificateDesc != null && uploadCertificate.certificateDesc.length <= 0) {
        uploadCertificate.certificateDesc = null
      }

      uploadCertificate.images = images;
      uploadCertificate.active = status

      this.smeService.addCertificates(uploadCertificate).subscribe(
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
            this.snackBar.open('Certificate Added Successfully !!')
            this.router.navigateByUrl('/my-sme/' + this.suUid + '/certificates');
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
  onKeydown(event) {
    if (event.keyCode === 32) {
      return false;
    }
  }
  onCancel() {
    this.router.navigateByUrl('/my-sme/' + this.suUid + '/certificates');
  }
}
