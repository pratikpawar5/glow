import { Component, OnInit } from '@angular/core';
import { QuotationFormat, GST, Image } from '@models/common';
import { environment } from 'environments/environment';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { ConstantService } from '@services/common/constant-service.service';
import { LazySmeModuleService } from 'app/sme/http-service/lazy-sme-module.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectedCreditType, CreditErrorCode, CreditType } from '@models/pricing';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { SnackBarService } from '@services/common/snack-bar.service';
import { Subscription } from 'rxjs';
import { ServiceDTO } from '@models/service';
import { BuyCreditsComponent } from 'app/shared/components/buy-credits/buy-credits.component';
import { MatDialog } from '@angular/material';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { NoCreditsLeftComponent } from 'app/shared/components/no-credits-left/no-credits-left.component';
import { TokenService } from '@services/token/token.service';
declare var ga: Function;
@Component({
  selector: 'app-update-service',
  templateUrl: './update-service.component.html',
  styleUrls: ['./update-service.component.css']
})
export class UpdateServiceComponent implements OnInit {


  subscription: Subscription
  serviceForm: FormGroup;
  contentServer: string = environment.CONTENT_SERVER

  priceUnits: Set<string>

  quotationFormats: Array<QuotationFormat>
  gstSlabs: Array<GST>
  imageTypes: Array<string>
  allowedImageSize: number

  uploadedImages = new Array<Image>(5)
  selectedImages = new Array<Image>()
  deletedImages = new Array<Image>()
  newAddedImages = new Array<Image>()

  progressPercent: number
  imageUploadFail: boolean
  showUploadProgress: boolean
  imageRequired: boolean
  imageSizeError: boolean
  imageTypeError: boolean
  showButton: boolean = true
  i: number = 0
  indexCount: number = 0

  showForm: boolean
  showSpinner: boolean = true
  specMap: Map<string, string>
  maxSpec: number = 50
  sUuid:string
  constructor(private route: ActivatedRoute, constants: ConstantService, private lazyService: LazySmeModuleService,
    private formBuilder: FormBuilder, private http: HttpClient, private matDialog: MatDialog,
    private dialog: DialogService, private token:TokenService,private router: Router, private snackBar: SnackBarService, ) {
    this.subscription = route.queryParams.subscribe(
      s => {
        let serviceUuid = s['s']
        if (serviceUuid) {
          this.getService(serviceUuid)
          this.quotationFormats = constants.getQuotationFormats()
          this.gstSlabs = constants.getGSTSlabs()
          this.imageTypes = constants.getImageFormats()
          this.allowedImageSize = constants.getMaxFileSize()
        }
      })
      ga('set', 'page', router.url);
      ga('send', 'pageview');
  }

  ngOnInit() {
    this.sUuid = this.token.getSmeId();
    this.serviceForm = this.formBuilder.group({
      serviceUuid: new FormControl(null),
      serviceName: new FormControl(null, [Validators.required, Validators.maxLength(100), Validators.minLength(3)]),
      description: new FormControl(null, [Validators.required, Validators.maxLength(1500), Validators.minLength(30)]),
      price: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(10)]),
      priceUnit: new FormControl(null),
      discount: new FormControl(null, [Validators.pattern('^[0-9]*$'), Validators.maxLength(2)]),
      location: new FormControl(null, [Validators.maxLength(200), Validators.pattern('^[a-zA-Z, ]*$')]),
      termsAndCondition: new FormControl(null, [Validators.maxLength(2000)]),
      gst: new FormControl(this.gstSlabs[0].value),
      quotationFormat: new FormControl(this.quotationFormats[0]),
      autoQuotation: new FormControl(false),
      specifications: this.formBuilder.array([
        this.formBuilder.group({
          ['key' + this.i]: new FormControl(null, [Validators.maxLength(50)]),
          ['value' + this.i]: new FormControl(null, [Validators.maxLength(100)])
        })
      ]),
      specifications1: this.formBuilder.array([])
    })
  }

  onSubmit(active: boolean) {

    if (this.serviceForm.valid && this.selectedImages.length > 0) {
      this.showButton = false

      let service: ServiceDTO = new ServiceDTO()
      service = this.serviceForm.value
      service.active = active
      let images = new Array<Image>()
      Array.from(this.newAddedImages).filter(f => f != undefined).forEach(
        file => images.push(file)
      )
      service.images = images
      service.mainImage = this.uploadedImages[0].fileLocation
      service.deletedImages = this.deletedImages
      service.termsAndCondition = this.serviceForm.controls['termsAndCondition'].value
      service.description = this.serviceForm.controls['description'].value
      service.serviceName = this.serviceForm.controls['serviceName'].value
      service.quotationFormat = this.serviceForm.controls['quotationFormat'].value.value
      service.specifications = this.createSpecificationObj()
      this.lazyService.updateService(service.serviceUuid, service).subscribe(
        res => {
          if (res.error) {
            this.showButton = true
            if (res.code === 402) {
              let selectedCreditType: SelectedCreditType
              if (res.errorResponse.errorCode === CreditErrorCode.PRODUCT_SERVICE_LISTING) {
                selectedCreditType = {
                  creditType: CreditType.PRODUCT_SERVICE_LISTING,
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
                    let ref = this.matDialog.open(BuyCreditsComponent, this.dialog.getBuyCreditsDialogConfig(selectedCreditType))
                    ref.afterClosed().subscribe(
                      res => {
                        if (res) {
                          this.onSubmit(active);
                        }
                      }
                    )
                  }
                }
              )
            }
          } else {
            this.snackBar.open('Service Updated Successfully')
            this.router.navigateByUrl('/my-sme/'+this.sUuid+'/services');
          }
        }
      )

    } else {
      if (this.selectedImages.length <= 0) {
        this.imageRequired = true
      }
      window.scrollTo(0, 0)
    }
  }

  getService(serviceUuid: string) {
    this.lazyService.getService(serviceUuid).subscribe(
      res => {
        if (!res.error) {
          this.showForm = true
          this.showSpinner = false
          this.getCategories()
          this.serviceForm.patchValue({
            serviceName: res.data.serviceName,
            description: res.data.description,
            price: res.data.price,
            priceUnit: res.data.priceUnit,
            discount: res.data.discount,
            serviceUuid: res.data.serviceUuid,
            location: res.data.location,
            gst: res.data.gst,
            termsAndCondition: res.data.termsAndCondition,
            autoQuotation: res.data.autoQuotation
          })

          this.quotationFormats.forEach(q =>{
            if(q.value === res.data.quotationFormat){
              this.serviceForm.controls['quotationFormat'].setValue(q)
            }
          })

          this.addInputField(res.data.specifications)
          for (let i = 0; i < res.data.images.length; i++) {
            this.uploadedImages[this.indexCount] = res.data.images[i]
            this.selectedImages.push(res.data.images[i])
            ++this.indexCount
          }
        } else {
          if (res.code === 406) {
            this.showSpinner = false
            this.router.navigateByUrl('/my-sme/'+this.sUuid+'/services');
          }
        }
      })
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
      formData.append('files', file)
    })

    this.http.post(environment.SERVICE_URL + 'files', formData, {
      reportProgress: true, observe: 'events'
    }).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressPercent = Math.round(100 * event.loaded / event.total);
        }
        else if (event instanceof HttpResponse) {
          for (let i = 0; i < this.selectedImages.length; i++) {
            let obj: any = event
            if (obj.body.data[i]) {
              this.uploadedImages[this.indexCount] = obj.body.data[i]
              this.newAddedImages.push(obj.body.data[i])
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

  deleteImage(index: number, image: Image) {
    this.deletedImages.push(image)

    if (this.newAddedImages.indexOf(image) !== -1) {
      this.newAddedImages.splice(this.newAddedImages.indexOf(image), 1)
    }

    this.selectedImages.splice(index, 1)
    this.uploadedImages.splice(index, 1)
    this.uploadedImages.push(undefined)
    --this.indexCount
  }
  onKeydownSpace(event) {
    if (event.keyCode === 32) {
      return true;
    }
  }
  getCategories() {
    this.lazyService.serviceCategories().subscribe(
      res => {
        if (!res.error) {
          this.priceUnits = res.data.priceUnits
        }
      }
    )
  }
  addInputField(specs: any) {
    let arr: any = Object.entries(specs);
    arr.sort((a:string,b:string) => {
      return a[0].localeCompare(b[0])
    })
    let map = new Map<string, string>(arr)
    const arrayControl = <FormArray>this.serviceForm.controls['specifications1']

    for (let m of map.entries()) {
      let newGroup = this.formBuilder.group({
        [m[1]]: new FormControl(m[1], [Validators.maxLength(100)]),
        [m[0]]: new FormControl(m[0], [Validators.maxLength(50)]),
      });
      arrayControl.push(newGroup);
    }
    this.specMap = map
  }
  addSpecification() {
    const spec = <FormArray>this.serviceForm.controls['specifications']
    this.i = this.i + 1
    let newGroup = this.formBuilder.group({
      ['key' + this.i]: new FormControl(null, [Validators.maxLength(50)]),
      ['value' + this.i]: new FormControl(null, [Validators.maxLength(100)])
    })
    spec.push(newGroup)
  }

  removeNewSpec(index: number) {
    const arrayControl = <FormArray>this.serviceForm.controls['specifications']
    arrayControl.removeAt(index)
    this.i = this.i - 1
  }

  removeOldSpec(index: number, key: string) {
    this.serviceForm.controls['specifications1']
    const arrayControl = <FormArray>this.serviceForm.controls['specifications1']
    arrayControl.removeAt(index)
    this.specMap.delete(key)
  }

  getControls(form: any) {
    return form.get('specifications').controls
  }

  createSpecificationObj() {
    let array1: Array<any> = this.serviceForm.controls['specifications1'].value
    let array2: Array<any> = this.serviceForm.controls['specifications'].value

    let map: Map<string, string> = new Map<string, string>()

    array1.map(o => {
      var k: Array<string> = Object.values(o)
      map.set(k[1], k[0])
    })

    array2.map(o => {
      var k: Array<string> = Object.values(o)
      map.set(k[0], k[1])
    })

    let obj = Object.create(null);
    for (let [k, v] of map) {
      if (v != null) {
        v = v.trim()
      }
      if (k != null) {
        k = k.trim()
      }
      if (v == null || v == '' || v == ' ' || k == null || k == '' || k == ' ') {
        continue
      }

      obj[k] = v;
    }
    return obj;
  }

}
