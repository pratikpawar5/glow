import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SMEImage } from '@models/sme-image';
import { PageTitleService } from '@services/page-title/page-title.service';
import { Router } from '@angular/router';
import { ConstantService } from '@services/common/constant-service.service';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { environment } from 'environments/environment.prod';
import { CustomHttpResponse } from '@models/custom.response';
import { CreditType, SelectedCreditType, CreditErrorCode } from '@models/pricing';
import { SMEInfrastrcture } from '@models/infrastructure';
import { TokenService } from '@services/token/token.service';
import { SnackBarService } from '@services/common/snack-bar.service';
import { PricingService } from '@services/pricing/pricing.service';
import { LazySmeModuleService } from 'app/sme/http-service/lazy-sme-module.service';
import { MatDialog } from '@angular/material';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { NoCreditsLeftComponent } from 'app/shared/components/no-credits-left/no-credits-left.component';
import { BuyCreditsComponent } from 'app/shared/components/buy-credits/buy-credits.component';
declare var ga: Function;
@Component({
  selector: 'app-add-infrastrcuture',
  templateUrl: './add-infrastrcuture.component.html',
  styleUrls: ['./add-infrastrcuture.component.css']
})
export class AddInfrastrcutureComponent implements OnInit {

  infrastructureForm: FormGroup;
  draft: boolean = false
  publish: boolean = true
  disabled: boolean = false
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
  suUid: string
  contentServer: string = environment.CONTENT_SERVER
  constructor(private pageTitleService: PageTitleService,private matDialog:MatDialog, 
    private dialog: DialogService, private token: TokenService, 
    private pricing: PricingService, private router: Router, private smeService:LazySmeModuleService, 
    private snackBar: SnackBarService, private constantsService: ConstantService, 
    private formBuilder: FormBuilder, private http: HttpClient) {
    this.imageTypes = constantsService.getImageFormats();
    this.allowedImageSize = constantsService.getMaxFileSize();
    ga('set', 'page', router.url);
    ga('send', 'pageview');
  }

  ngOnInit() {
    this.pageTitleService.updateTitle('Add Infrastructure')
    this.suUid = this.token.getSmeId();

    this.infrastructureForm = this.formBuilder.group({
      infraUuid: new FormControl(null),
      machineName: new FormControl(null, [Validators.required, Validators.maxLength(50), Validators.minLength(3)]),
      manufacturer: new FormControl(null, [Validators.maxLength(50), Validators.minLength(3)]),
      modelName: new FormControl(null, [Validators.maxLength(50), Validators.minLength(3)]),
      description: new FormControl(null, [Validators.required,Validators.maxLength(2000), Validators.minLength(3)]),
      capacity: new FormControl(null, [Validators.maxLength(10), Validators.minLength(1)]),
      quantity: new FormControl(null, [Validators.pattern('[0-9]+'), Validators.maxLength(10), Validators.min(1)]),
      businessPost: new FormControl(false)
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
      formData.append('images', file)
    })

    this.http.post<CustomHttpResponse<any>>(environment.SME_INFORMATION_URL + 'images', formData, {
      reportProgress: true, observe: 'events', params: { entityType: "infrastructures" }
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
        err => {
        })
  }
  onKeydownSpace(event) {
    if (event.keyCode === 32) {
      this.onCheckbox();
    }
  }

  onCheckbox() {
    if (!this.infrastructureForm.controls['businessPost'].value) {
      this.pricing.checkCredits(CreditType.BUSINESS_POST).subscribe(

        res => {

          if (res.error) {
            if (res.errorResponse && res.code === 402) {
              let selectedCreditType: SelectedCreditType = {
                creditType: CreditType.BUSINESS_POST,
                displayName: res.errorResponse.typeDisplayName
              }
              let ref = this.matDialog.open(NoCreditsLeftComponent,this.dialog.getNoCreditsDialogConfig(selectedCreditType))
              ref.afterClosed().subscribe(
                res => {
                  if (res) {
                    let ref = this.matDialog.open(BuyCreditsComponent,this.dialog.getBuyCreditsDialogConfig(selectedCreditType))
                    ref.afterClosed().subscribe(
                      res => {
                        if (res) {
                          this.infrastructureForm.controls['businessPost'].setValue(true)
                        } else {
                          this.infrastructureForm.controls['businessPost'].setValue(false)
                        }
                      }
                    )
                  } else {
                    this.infrastructureForm.controls['businessPost'].setValue(false)
                  }
                }
              )

            }
          } else {
           return true;
          }
        }
      )
    }
  }

  onSubmit(status: boolean) {
    if (this.infrastructureForm.valid && this.selectedImages.length > 0) {
      this.showButton = false
      let uploadInfrastructure: SMEInfrastrcture = this.infrastructureForm.value;

      let images = new Array<SMEImage>()

      this.uploadedImages.filter(img => img != null || img != undefined).forEach(img => {
        images.push(img);
      })
      uploadInfrastructure.images = images;
      uploadInfrastructure.active = status;

      if (uploadInfrastructure.description != null && uploadInfrastructure.description.length <= 0) {
        uploadInfrastructure.description = null
      }

      if (uploadInfrastructure.modelName != null && uploadInfrastructure.modelName.length <= 0) {
        uploadInfrastructure.modelName = null
      }

      if (uploadInfrastructure.capacity != null && uploadInfrastructure.capacity.length <= 0) {
        uploadInfrastructure.capacity = null
      }

      if (uploadInfrastructure.quantity != null && uploadInfrastructure.quantity.length <= 0) {
        uploadInfrastructure.quantity = null
      }

      if (uploadInfrastructure.machineName != null && uploadInfrastructure.machineName.length <= 0) {
        uploadInfrastructure.machineName = null
      }

      if (uploadInfrastructure.manufacturer != null && uploadInfrastructure.manufacturer.length <= 0) {
        uploadInfrastructure.manufacturer = null
      }



      this.smeService.addInfrastrctures(uploadInfrastructure).subscribe(
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
                          this.onSubmit(status);
                        }
                      }
                    )
                  }
                }
              )
            }
          } else {
            this.snackBar.open('Infrastructure Added Successfully !!')
            this.router.navigateByUrl('/my-sme/'+this.suUid+'/infrastrcutures');
          }
        }
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
    this.router.navigateByUrl('/my-sme/'+this.suUid+'/infrastrcutures');
  }

}
