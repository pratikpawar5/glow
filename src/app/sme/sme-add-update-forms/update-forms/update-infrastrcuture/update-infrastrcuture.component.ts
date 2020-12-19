import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SMEImage } from '@models/sme-image';
import { TokenService } from '@services/token/token.service';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { ConstantService } from '@services/common/constant-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageTitleService } from '@services/page-title/page-title.service';
import { CustomHttpResponse } from '@models/custom.response';
import { SMEInfrastrcture } from '@models/infrastructure';
import { SnackBarService } from '@services/common/snack-bar.service';
import { SelectedCreditType, CreditErrorCode, CreditType } from '@models/pricing';
import { LazySmeModuleService } from 'app/sme/http-service/lazy-sme-module.service';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { MatDialog } from '@angular/material';
import { NoCreditsLeftComponent } from 'app/shared/components/no-credits-left/no-credits-left.component';
import { BuyCreditsComponent } from 'app/shared/components/buy-credits/buy-credits.component';
declare var ga: Function;
@Component({
  selector: 'app-update-infrastrcuture',
  templateUrl: './update-infrastrcuture.component.html',
  styleUrls: ['./update-infrastrcuture.component.css']
})
export class UpdateInfrastrcutureComponent implements OnInit {

  updateInfrastructureForm: FormGroup
  smeId: string
  draft: boolean = false
  publish: boolean = true
  showButton: boolean = true
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
  showForm: boolean
  showSpinner: boolean = true
  showError: boolean
  contentServer: string = environment.CONTENT_SERVER

  constructor(private formBuilder: FormBuilder, private http: HttpClient,
    private constants: ConstantService, private token: TokenService, 
    private dialog: DialogService, private router: Router, private route: ActivatedRoute, 
    private smeService: LazySmeModuleService, private snackBar: SnackBarService, 
    private title: PageTitleService,private matDialog:MatDialog) {
    this.imageTypes = constants.getImageFormats();
    this.allowedImageSize = constants.getMaxFileSize();
    ga('set', 'page', router.url);
    ga('send', 'pageview');
  }

  ngOnInit() {
    this.title.updateTitle('Update Infrastructure')
    this.updateInfrastructureForm = this.formBuilder.group({
      infraUuid: new FormControl(null),
      machineName: new FormControl(null, [Validators.required, Validators.maxLength(50), Validators.minLength(3)]),
      manufacturer: new FormControl(null, [Validators.maxLength(50), Validators.minLength(3)]),
      modelName: new FormControl(null, [Validators.maxLength(50), Validators.minLength(3)]),
      description: new FormControl(null, [Validators.required, Validators.maxLength(2000), Validators.minLength(3)]),
      capacity: new FormControl(null, [Validators.maxLength(10), Validators.minLength(1)]),
      quantity: new FormControl(null, [Validators.pattern('[0-9]+'), Validators.maxLength(10), Validators.min(1)]),
      businessPost: new FormControl(false)
    })
    this.route.queryParams.subscribe(

      i => {
        let infraUuid = i['i']
        if (infraUuid != undefined) {
          this.getInfrastructureData(infraUuid)
        }
      }
    )
  }
  getInfrastructureData(infraUuid) {
    this.smeService.getInfrastructure(infraUuid).subscribe(
      res => {
        if (!res.error && res.code == 200) {
          this.updateInfrastructureForm.patchValue(
            {
              infraUuid: res.data.infraUuid,
              machineName: res.data.machineName,
              manufacturer: res.data.manufacturer,
              modelName: res.data.modelName,
              description: res.data.description,
              quantity: res.data.quantity,
              capacity: res.data.capacity,
            }
          )
          for (let i = 0; i < res.data.images.length; i++) {
            this.uploadedImages[this.indexCount] = res.data.images[i];
            this.selectedImages.push(res.data.images[i]);
            ++this.indexCount;
          }
        }
      },
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
  deleteImageInfra(index: number, image: SMEImage) {
    this.selectedImages.splice(index, 1);
    this.uploadedImages.splice(index, 1)
    this.newAddedImages.splice(this.newAddedImages.indexOf(image), 1)
    this.uploadedImages.push(undefined)
    --this.indexCount
  }
  onUpdateInfrastructure(status: boolean) {

    if (this.updateInfrastructureForm.valid && this.selectedImages.length > 0) {
      this.showButton = false
      this.smeId = this.token.getSmeId()
      let updaetInfrastructure: SMEInfrastrcture = this.updateInfrastructureForm.value;
      updaetInfrastructure.active = status
      let images = new Array<SMEImage>()
      Array.from(this.uploadedImages).filter(f => f != undefined).forEach(
        file => images.push(file)
      )
      updaetInfrastructure.images = images

      if (updaetInfrastructure.description != null && updaetInfrastructure.description.length <= 0) {
        updaetInfrastructure.description = null
      }
      if (updaetInfrastructure.modelName != null && updaetInfrastructure.modelName.length <= 0) {
        updaetInfrastructure.modelName = null
      }
      if (updaetInfrastructure.capacity != null && updaetInfrastructure.capacity.length <= 0) {
        updaetInfrastructure.capacity = null
      }
      if (updaetInfrastructure.quantity != null && updaetInfrastructure.quantity.length <= 0) {
        updaetInfrastructure.quantity = null
      }

      if (updaetInfrastructure.machineName != null && updaetInfrastructure.machineName.length <= 0) {
        updaetInfrastructure.machineName = null
      }

      if (updaetInfrastructure.manufacturer != null && updaetInfrastructure.manufacturer.length <= 0) {
        updaetInfrastructure.manufacturer = null
      }
      let suUid = this.token.getSmeId();
      this.smeService.updateInfrastructure(updaetInfrastructure).subscribe(
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
                          this.onUpdateInfrastructure(status);
                        }
                      }
                    )
                  }
                }
              )
            }
          }
          else {
            this.snackBar.open('Infrastructure Update Successfully !!')
            this.router.navigateByUrl('/my-sme/'+this.smeId+'/infrastrcutures');

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

}
