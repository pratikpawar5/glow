import { Component, OnInit } from '@angular/core';
import { TurnOverUnit, RegisteredType, TurnOver, SMEInformationDto } from '@models/sme';
import { environment } from 'environments/environment';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ConstantService } from '@services/common/constant-service.service';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenService } from '@services/token/token.service';
import { LoginService } from 'app/auth/auth-services/login.service';
import { SmeService } from '@services/sme/sme.service';
import { PageTitleService } from '@services/page-title/page-title.service';

export interface Unit {
  value: TurnOverUnit;
  viewValue: string;
}

export interface RegisteredAS {
  value: RegisteredType;
  viewValue: string;
}
declare var ga: Function;
@Component({
  selector: 'app-second-step-reg',
  templateUrl: './second-step-reg.component.html',
  styleUrls: ['./second-step-reg.component.css']
})
export class SecondStepRegComponent implements OnInit {

  /*SECOND STEP FORM START*/
  companyBasicInformation: FormGroup
  minDate = new Date();
  maxDate = new Date();
  currentDate = new Date();

  registeredAs: RegisteredAS[] = [
    { value: RegisteredType.PRIVATE, viewValue: 'Private' },
    { value: RegisteredType.PUBLIC, viewValue: 'Public' },
    { value: RegisteredType.PROPRIETORSHIP, viewValue: 'Proprietorship' },
    { value: RegisteredType.PARTNERSHIP, viewValue: 'Partnership' },
    { value: RegisteredType.OTHER, viewValue: 'Other' },
  ];

  turnOverUnits: Unit[] = [
    { value: TurnOverUnit.CRORES, viewValue: 'Crore' },
    { value: TurnOverUnit.LAKHS, viewValue: 'Lakh' },
  ];

  imageRequired: boolean
  imageUploadFail: boolean
  showUploadProgress: boolean
  progressPercent: number
  uploadedImages = new Array<string>(1)
  allowedImageSize: number
  selectedImages = new Array<File>()
  indexCount: number = 0
  imageTypes: Array<string>
  imageSizeError: boolean
  imageTypeError: boolean
  showButtonSecondStep: boolean = true
  showButton: boolean = true
  showGoto: boolean = true
  contentServer: string = environment.CONTENT_SERVER
  images = new Array<File>()
  sUuid: string
  /*SECOND STEP FORM END*/

  constructor(private formBuilder: FormBuilder, private pageTitleService: PageTitleService, private constant: ConstantService, private http: HttpClient, private router: Router, private token: TokenService, private loginService: LoginService, private smeService: SmeService) {
    this.imageTypes = constant.getImageFormats();
    this.allowedImageSize = constant.getMaxFileSize();
    ga('set', 'page', router.url);
    ga('send', 'pageview');
  }

  ngOnInit() {
    this.pageTitleService.updateTitle('SME Registration')

    /*SECOND STEP*/
    this.sUuid = this.token.getSmeId();
    this.maxDate.getDate();
    this.companyBasicInformation = this.formBuilder.group({
      companyDescription: new FormControl(null, [Validators.required, Validators.maxLength(1000),Validators.minLength(10)]),
      numberOfEmployees: new FormControl(null, [Validators.pattern('[0-9]+')]),
      turnOver: new FormControl(null, Validators.pattern('[0-9.]+')),
      turnOverUnit: new FormControl(this.turnOverUnits[0].value),
      registeredAS: new FormControl(null),
      latitude: new FormControl(null, Validators.pattern('[0-9.]+')),
      longitude: new FormControl(null, Validators.pattern('[0-9.]+'))
    })

  }

  onKeydownSpaceSecondStep(event) {
    if (event.keyCode === 32) {
      return false;
    }
  }
  onKeydownSpace(event) {
    if (event.keyCode === 32) {
      return true;
    }
  }
  onSkip() {
    this.showButton = false
    this.router.navigateByUrl('/my-sme/' + this.sUuid + '/home')
  }

  onGotoYourWebsite() {
    this.showGoto = false
  }

  onFileChanged(files: Array<File>) {

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
        this.images.push(files[i])

      } else {
        break
      }
    }

    if (this.images.length > 0) {
      this.uploadImagesToServer(this.images)
    }
  }

  uploadImagesToServer(images: Array<File>) {
    this.showUploadProgress = true
    this.imageUploadFail = false
    let formData = new FormData()

    Array.from(images).forEach(file => {
      formData.append('images', file)
    })
    this.http.post<any>(environment.SME_INFORMATION_URL + 'images', formData, {
      reportProgress: true, observe: 'events', params: { entityType: "logoImage" }
    }).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressPercent = Math.round(100 * event.loaded / event.total);
        }
        else if (event instanceof HttpResponse) {
          if (event.body != null || event.body != undefined) {
            this.uploadedImages[this.indexCount] = event.body.data
            ++this.indexCount
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

  deleteImageFromServer(index: number) {
    this.imageUploadFail = false
    this.selectedImages.splice(index, 1)
    this.uploadedImages.splice(index, 1)
    this.uploadedImages.push(undefined)
    this.images.splice(index, 1);

    --this.indexCount
  }

  onSubmitSecondStep() {
    if (this.companyBasicInformation.valid && this.images.length > 0) {

      this.showButtonSecondStep = false

      let companyBasicInfo: SMEInformationDto;

      companyBasicInfo = this.companyBasicInformation.value

      let sUUid = this.token.getSmeId()

      companyBasicInfo.sUuid = sUUid;

      this.uploadedImages.filter(img => img != null || img != undefined)

      companyBasicInfo.logoImage = this.uploadedImages[0]

      let turnOver = new TurnOver();

      turnOver.totalTurnOver = this.companyBasicInformation.controls['turnOver'].value

      turnOver.turnOverUnit = this.companyBasicInformation.controls['turnOverUnit'].value

      companyBasicInfo.turnOver = turnOver

      companyBasicInfo.registeredType = this.companyBasicInformation.controls['registeredAS'].value

      const companyDescription = this.companyBasicInformation.controls['companyDescription'].value

      if(companyDescription[0]== " ")
      {
        this.companyBasicInformation.controls['companyDescription'].setErrors({
          "inValid": true
        })
        this.showButtonSecondStep = true
        window.scrollTo(0, 0)

        return;
      }
      this.smeService.saveSMEDetails(companyBasicInfo).subscribe(
        res => {
          if (res.error) {
            this.showButtonSecondStep = true
          }
          else {
            this.router.navigateByUrl('/my-sme/' + this.sUuid + '/home')
          }
        }
      )
    }
    else {
      if (this.images.length <= 0) {
        this.imageRequired = true
      }
      this.showButtonSecondStep = true
      window.scrollTo(0, 0)

    }
  }
  /*SECOND STEP END*/


}
