import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { SMEImage } from '@models/sme-image';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { TokenService } from '@services/token/token.service';
import { ConstantService } from '@services/common/constant-service.service';
import { PageTitleService } from '@services/page-title/page-title.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomHttpResponse } from '@models/custom.response';
import { SMECertificate } from '@models/certificate';
import { SnackBarService } from '@services/common/snack-bar.service';
import { CreditType, CreditErrorCode, SelectedCreditType } from '@models/pricing';
import { LazySmeModuleService } from 'app/sme/http-service/lazy-sme-module.service';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { MatDialog } from '@angular/material';
import { NoCreditsLeftComponent } from 'app/shared/components/no-credits-left/no-credits-left.component';
import { BuyCreditsComponent } from 'app/shared/components/buy-credits/buy-credits.component';
declare var ga: Function;
@Component({
  selector: 'app-update-certificate',
  templateUrl: './update-certificate.component.html',
  styleUrls: ['./update-certificate.component.css']
})
export class UpdateCertificateComponent implements OnInit {

  updateCertificateForm: FormGroup
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

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private token: TokenService, private router: Router, private route: ActivatedRoute,
    private smeService: LazySmeModuleService, private snackBar: SnackBarService,
    private dialog: DialogService,private constants: ConstantService,
    private title: PageTitleService,private matDialog:MatDialog) {
    this.imageTypes = constants.getImageFormats();
    this.allowedImageSize = constants.getMaxFileSize()
    ga('set', 'page', router.url);
    ga('send', 'pageview');
  }


  ngOnInit() {
    this.title.updateTitle('Update Certificate')

    this.updateCertificateForm = this.formBuilder.group({
      crtiUuid: new FormControl(null),
      certificateType: new FormControl(null, [Validators.required, Validators.maxLength(50), Validators.minLength(3)]),
      certificateDesc: new FormControl(null, [Validators.maxLength(500), Validators.minLength(20)])
    });
    this.route.queryParams.subscribe(
      c => {
        let crtiUuid = c['c']
        if (crtiUuid != undefined) {
          this.getCertificateData(crtiUuid)
        }
      }
    )
    
  }

  getCertificateData(crtiUuid) {
    this.smeService.getCertificate(crtiUuid).subscribe(
      res => {
        if (!res.error && res.code == 200) {
          this.updateCertificateForm.patchValue(
            {
              crtiUuid: res.data.crtiUuid,
              certificateType: res.data.certificateType,
              certificateDesc: res.data.certificateDesc

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
        this.showError = true;
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

  deleteImageCertificate(index: number, image: SMEImage) {
    this.selectedImages.splice(index, 1);
    this.uploadedImages.splice(index, 1)
    this.newAddedImages.splice(this.newAddedImages.indexOf(image), 1)
    this.uploadedImages.push(undefined)
    --this.indexCount
  }

  onUpdateCertificate(status) {
    if (this.updateCertificateForm.valid && this.selectedImages.length > 0) {
      this.smeId = this.token.getSmeId()
      this.showButton = false
      let updateCertificate: SMECertificate = this.updateCertificateForm.value;

      if (updateCertificate.certificateType != null && updateCertificate.certificateType.length <= 0) {
        updateCertificate.certificateType = null
      }

      if (updateCertificate.certificateDesc != null && updateCertificate.certificateDesc.length <= 0) {
        updateCertificate.certificateDesc = null
      }

      updateCertificate.active = status
      let images = new Array<SMEImage>()
      Array.from(this.uploadedImages).filter(f => f != undefined).forEach(
        file => images.push(file)
      )
      updateCertificate.images = images
      let suUid = this.token.getSmeId();

      this.smeService.updateCertificates(updateCertificate).subscribe(
        res => {
          if(res.error)
          {
            if(res.code === 402){
              this.showButton = true

              let selectedCreditType: SelectedCreditType

              if(res.errorResponse.errorCode === CreditErrorCode.IMAGE_STORAGE){
                selectedCreditType = {
                  creditType: CreditType.IMAGE_STORAGE,
                  displayName: res.errorResponse.typeDisplayName
                }
              }

              let ref = this.matDialog.open(NoCreditsLeftComponent,this.dialog.getNoCreditsDialogConfig(selectedCreditType))
              ref.afterClosed().subscribe(
                res => {
                  if(res){
                    let ref = this.matDialog.open(BuyCreditsComponent,this.dialog.getBuyCreditsDialogConfig(selectedCreditType))
                    ref.afterClosed().subscribe(
                      res =>{
                        if(res){
                          this.onUpdateCertificate(status);
                        }
                      }
                    )
                  }
                }
              )
            }
          }
          else{
            this.snackBar.open('Certificate Update Successfully !!')
            this.router.navigateByUrl('/my-sme/'+this.smeId+'/certificates');
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
    this.router.navigateByUrl('/my-sme/'+this.smeId+'/certificates');
  }

}
