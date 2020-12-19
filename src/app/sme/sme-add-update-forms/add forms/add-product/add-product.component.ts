import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { ConstantService } from '@services/common/constant-service.service';
import { QuotationFormat, GST, Image } from '@models/common';
import { LazySmeModuleService } from 'app/sme/http-service/lazy-sme-module.service';
import { ProductCategory, ProductSubCategory, Product, ProductDTO, OtherCategory } from '@models/product';
import { environment } from 'environments/environment';
import { HttpEventType, HttpResponse, HttpClient } from '@angular/common/http';
import { PricingService } from '@services/pricing/pricing.service';
import { CreditType, SelectedCreditType, CreditErrorCode } from '@models/pricing';
import { Router } from '@angular/router';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { NoCreditsLeftComponent } from 'app/shared/components/no-credits-left/no-credits-left.component';
import { BuyCreditsComponent } from 'app/shared/components/buy-credits/buy-credits.component';
import { PageTitleService } from '@services/page-title/page-title.service';
import { TokenService } from '@services/token/token.service';
declare var ga: Function;
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm: FormGroup;
  contentServer: string = environment.CONTENT_SERVER

  categories: Array<ProductCategory>
  subCategories: Array<ProductSubCategory>
  specifications: Array<string> = new Array<string>()
  priceUnits: Set<string>

  quotationFormats: Array<QuotationFormat>
  gstSlabs: Array<GST>
  imageTypes: Array<string>
  allowedImageSize: number

  uploadedImages = new Array<Image>(5)
  selectedImages = new Array<File>()
  progressPercent: number
  imageUploadFail: boolean
  showUploadProgress: boolean
  imageRequired: boolean
  imageSizeError: boolean
  imageTypeError: boolean
  showButton: boolean = true
  i: number = 0
  indexCount: number = 0

  customCategory: string = "custom";
  newCategory: boolean
  newSubCategory: boolean

  maxSpec: number = 50

  sUuid: string
  constructor(constants: ConstantService, private lazyService: LazySmeModuleService,
    private formBuilder: FormBuilder, private http: HttpClient, private pricing: PricingService,
    private dialog: DialogService, private router: Router, private matDialog: MatDialog,
    private title: PageTitleService, private token: TokenService) {
    this.quotationFormats = constants.getQuotationFormats()
    this.gstSlabs = constants.getGSTSlabs()
    this.imageTypes = constants.getImageFormats()
    this.allowedImageSize = constants.getMaxFileSize()
    this.getCategories()
    ga('set', 'page', router.url);
    ga('send', 'pageview');
  }

  ngOnInit() {
    this.title.updateTitle('Add Product')
    this.sUuid = this.token.getSmeId();
    this.productForm = this.formBuilder.group({
      category: new FormControl(null, [Validators.required]),
      subCategory: new FormControl(null, [Validators.required]),
      productName: new FormControl(null, [Validators.required, Validators.maxLength(100), Validators.minLength(3)]),
      description: new FormControl(null, [Validators.required, Validators.maxLength(1500), Validators.minLength(30)]),
      price: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(10)]),
      priceUnit: new FormControl(null),
      discount: new FormControl(null, [Validators.pattern('^[0-9]*$'), Validators.maxLength(2)]),
      stock: new FormControl(null, [Validators.pattern('^[0-9]*$'), Validators.maxLength(10)]),
      minOrderQty: new FormControl(1, [Validators.required, Validators.min(1), Validators.pattern('^[0-9]*$'), Validators.maxLength(10)]),
      location: new FormControl(null, [Validators.maxLength(200), Validators.pattern('^[a-zA-Z, ]*$')]),
      specifications: this.formBuilder.array([]),
      specifications1: this.formBuilder.array([
        this.formBuilder.group({
          ['key' + this.i]: new FormControl(null, [Validators.maxLength(50)]),
          ['value' + this.i]: new FormControl(null, [Validators.maxLength(100)])
        })
      ]),
      termsAndCondition: new FormControl(null, [Validators.maxLength(2000)]),
      gst: new FormControl(null, [Validators.required]),
      quotationFormat: new FormControl(this.quotationFormats[0]),
      businessPost: new FormControl(false),
      autoQuotation: new FormControl(false),
      customCategory: new FormControl(null, [Validators.maxLength(100)]),
      customSubCategory: new FormControl(null, [Validators.maxLength(100)])
    })

    this.productForm.controls['category'].valueChanges.subscribe(
      res => {
        if (res && res !== this.customCategory) {
          this.getSubCategories(res.categoryUuid)
          this.productForm.controls['subCategory'].setValue(null)
          this.productForm.controls['customCategory'].setValue(null)
          this.productForm.controls['customSubCategory'].setValue(null)
          this.newCategory = false
          this.newSubCategory = false
        } else {
          this.productForm.controls['subCategory'].setValue(null)
          this.productForm.controls['subCategory'].disable()
          this.newSubCategory = false
          this.newCategory = true
        }
      }
    )

    this.productForm.controls['subCategory'].valueChanges.subscribe(
      res => {
        if (res && res !== this.customCategory) {
          this.getSpecifications(res.subCategoryUuid)
          this.newCategory = false
          this.newSubCategory = false
        }
        if (res === this.customCategory) {
          this.productForm.controls['customCategory'].setValue(null)
          this.newSubCategory = true
        }

      }
    )

  }

  onSubmit(active: boolean) {

    if (this.productForm.valid && this.selectedImages.length > 0) {
      this.showButton = false
      let product: ProductDTO = new ProductDTO()
      product.active = active
      product.specifications = this.createSpecificationObj()
      let images = new Array<Image>()
      Array.from(this.uploadedImages).filter(f => f != undefined).forEach(
        file => images.push(file)
      )
      product.images = images
      product.images[0].mainImage = true

      product.discount = this.productForm.controls['discount'].value
      product.location = this.productForm.controls['location'].value
      product.priceUnit = this.productForm.controls['priceUnit'].value
      product.minOrderQty = this.productForm.controls['minOrderQty'].value
      product.stock = this.productForm.controls['stock'].value
      product.gst = this.productForm.controls['gst'].value
      product.termsAndCondition = this.productForm.controls['termsAndCondition'].value
      product.quotationFormat = this.productForm.controls['quotationFormat'].value.value
      product.price = this.productForm.controls['price'].value
      product.description = this.productForm.controls['description'].value
      product.productName = this.productForm.controls['productName'].value
      product.businessPost = this.productForm.controls['businessPost'].value
      product.autoQuotation = this.productForm.controls['autoQuotation'].value

      if (this.newCategory || this.newSubCategory) {
        let otherCategory: OtherCategory = new OtherCategory()
        otherCategory.customCategory = this.productForm.controls['customCategory'].value
        otherCategory.customSubCategory = this.productForm.controls['customSubCategory'].value
        if (this.newSubCategory) {
          otherCategory.categoryUuid = this.productForm.controls['category'].value.categoryUuid
        }
        product.otherCategory = otherCategory
      } else {
        product.subCategoryUuid = this.productForm.controls['subCategory'].value.subCategoryUuid;
      }

      this.lazyService.saveProduct(product).subscribe(
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
            this.router.navigateByUrl('/my-sme/' + this.sUuid + '/products');
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
      formData.append('files', file)
    })

    this.http.post(environment.PRODUCT_URL + 'files', formData, {
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

  deleteImage(index: number) {
    this.imageUploadFail = false
    this.selectedImages.splice(index, 1)
    this.uploadedImages.splice(index, 1)
    this.uploadedImages.push(undefined)
    --this.indexCount
  }

  onKeydownSpaceQuotation(event) {
    if (event.keyCode === 32) {
      return true;
    }
  }

  onKeydownSpace(event) {
    if (event.keyCode === 32) {
      this.onCheckbox();
    }
  }

  onCheckbox() {
    if (!this.productForm.controls['businessPost'].value) {
      this.pricing.checkCredits(CreditType.BUSINESS_POST).subscribe(

        res => {
          if (res.error) {
            if (res.errorResponse && res.code === 402) {
              let selectedCreditType: SelectedCreditType = {
                creditType: CreditType.BUSINESS_POST,
                displayName: res.errorResponse.typeDisplayName
              }
              let ref = this.matDialog.open(NoCreditsLeftComponent, this.dialog.getNoCreditsDialogConfig(selectedCreditType))
              ref.afterClosed().subscribe(
                res => {
                  if (res) {
                    let ref = this.matDialog.open(BuyCreditsComponent, this.dialog.getBuyCreditsDialogConfig(selectedCreditType))
                    ref.afterClosed().subscribe(
                      res => {
                        if (res) {
                          this.productForm.controls['businessPost'].setValue(true)
                        } else {
                          this.productForm.controls['businessPost'].setValue(false)
                        }
                      }
                    )
                  } else {
                    this.productForm.controls['businessPost'].setValue(false)
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


  getControls(form: any) {
    return form.get('specifications').controls
  }

  getControls1(form: any) {
    return form.get('specifications1').controls
  }

  getCategories() {
    this.lazyService.productsCategories().subscribe(
      res => {
        if (!res.error) {
          this.categories = res.data.categories
          this.priceUnits = res.data.priceUnits
          this.productForm.controls['subCategory'].disable()
        }
      }
    )
  }

  getSubCategories(categoryUuid: string) {
    this.lazyService.productsSubCategories(categoryUuid).subscribe(
      res => {
        if (!res.error) {
          this.subCategories = res.data
          this.subCategories = this.subCategories.sort((s1, s2) => {
            if (s1.subCategoryName > s2.subCategoryName) {
              return 1;
            }
            if (s1.subCategoryName < s2.subCategoryName) {
              return -1;
            }
            return 0;
          })
          this.productForm.controls['subCategory'].enable()
        }
      }
    )
  }

  getSpecifications(subCategoryUuid: string) {

    this.lazyService.productsSpecifications(subCategoryUuid).subscribe(
      res => {
        if (!res.error) {
          if (this.specifications.length > 0) {
            for (let i = 0; i < this.specifications.length; i++) {
              const arrayControl = <FormArray>this.productForm.controls['specifications']
              arrayControl.removeAt(0)
            }
          }
          this.specifications = res.data
          for (let i = 0; i < this.specifications.length; i++) {
            this.addInputField(this.specifications[i])
          }
        }
      }
    )
  }

  addInputField(key: string) {
    const arrayControl = <FormArray>this.productForm.controls['specifications']

    let newGroup = this.formBuilder.group({
      [key]: new FormControl(null, [Validators.maxLength(100)])
    });
    arrayControl.push(newGroup);

  }

  addSpecification() {
    const spec = <FormArray>this.productForm.controls['specifications1']
    this.i = this.i + 1
    let newGroup = this.formBuilder.group({
      ['key' + this.i]: new FormControl(null, [Validators.maxLength(50)]),
      ['value' + this.i]: new FormControl(null, [Validators.maxLength(100)])
    })
    spec.push(newGroup)
  }

  removeSpecification(index: number) {
    const arrayControl = <FormArray>this.productForm.controls['specifications1']
    arrayControl.removeAt(index)
    this.i = this.i - 1
  }

  createSpecificationObj() {
    let array1: Array<any> = this.productForm.controls['specifications'].value
    let array2: Array<any> = this.productForm.controls['specifications1'].value

    let map: Map<string, string> = new Map<string, string>()

    array1.map(o => {
      var k = Object.keys(o)[0];
      map.set(k, o[k])
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
