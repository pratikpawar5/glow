import { Component, OnInit, Inject } from '@angular/core';
import { SmeEntity, ItemState } from '@models/sme';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'environments/environment';
import { ProductSubCategory, ProductCategory } from '@models/product';
import { GloqrAdminService } from 'app/gloqr-admin/gloqr-admin-services/gloqr-admin.service';
import { ConstantService } from '@services/common/constant-service.service';


@Component({
  selector: 'app-product-detail-dialog',
  templateUrl: './product-detail-dialog.component.html',
  styleUrls: ['./product-detail-dialog.component.css']
})

export class ProductDetailDialogComponent implements OnInit {

  public itemStatus: ItemState;
  feedbackMessage = new FormControl();
  specifications: Map<string, string>
  contentServer: string = environment.CONTENT_SERVER
  categories: Array<ProductCategory>
  subCategories: Array<ProductSubCategory>
  productAdminForm: FormGroup
  userSelectedCategory: boolean
  smeEntity: SmeEntity;
  file: File
  imageTypes: Array<string>
  imageLocationOneSize: number = 102400
  imageLocationTwoSize: number = 51200
  imageSizeErrorLocationOne: boolean;
  imageSizeErrorLocationTwo: boolean;
  imageTypeError: boolean;
  saveImages: boolean
  selectedImages = new Array<File>()
  imageLocationOne = 'LocationOne'
  imageLocationTwo = 'LocationTwo'
  constructor(private dialogRef: MatDialogRef<ProductDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private constantService: ConstantService, private formBuilder: FormBuilder, private gloqrAdminService: GloqrAdminService) {
    this.imageTypes = constantService.getImageFormats();
  }

  ngOnInit() {
    this.getProductCategories();
    this.productAdminForm = this.formBuilder.group({
      category: new FormControl(null, [Validators.required]),
      subCategory: new FormControl(null, [Validators.required])
    })
    this.productAdminForm.controls['subCategory'].disable()
    if (this.data.subCategory) {
      this.setCategory()
    } else {
      this.userSelectedCategory = true;
    }

    this.productAdminForm.controls['category'].valueChanges.subscribe(
      res => {
        if (res) {
          this.getSubCategories(res)
          this.productAdminForm.controls['subCategory'].setValue(null)
        }
      }
    )

    if (this.data.specifications != null) {
      this.specifications = this.data.specifications
    }

  }

  setCategory() {
    this.productAdminForm.controls['category'].setValue(this.data.subCategory.productCategory.categoryUuid)
    this.getSubCategories(this.data.subCategory.productCategory.categoryUuid)
  }

  getProductCategories() {
    this.gloqrAdminService.productsCategories().subscribe(
      res => {
        if (!res.error) {
          this.categories = res.data.categories
          if (!this.data.subCategory && this.data.otherCategory.categoryUuid) {
            this.productAdminForm.controls['category'].setValue(this.data.otherCategory.categoryUuid)
          }
        }
      }
    )
  }

  getSubCategories(categoryUuid: string) {
    this.gloqrAdminService.productsSubCategories(categoryUuid).subscribe(
      res => {
        if (!res.error) {
          this.subCategories = res.data
          this.productAdminForm.controls['subCategory'].enable()
          if (this.data.subCategory) {
            this.productAdminForm.controls['subCategory'].setValue(this.data.subCategory.subCategoryUuid)
          }
        }
      }
    )
  }

  getMapValue(map) {
    return Array.from(Object.entries(map))
  }

  checkForApproval() {
    if (this.productAdminForm.valid) {
      this.onApprove()
    }
  }

  checkForRejection() {
    this.onReject()
  }

  onFileChangedOne(event, index: number, location: string) {
    if (event.target.files) {
      this.file = event.target.files[0];

      if (this.imageTypes.indexOf(this.file.type) === -1) {
        this.imageTypeError = true
        window.alert("Supported file formats are: .png .jpeg .jpg")
      }
      else if (location === this.imageLocationOne && this.file.size > this.imageLocationOneSize) {
        this.imageSizeErrorLocationOne = true
        window.alert("Image file size should be less than 100kb")
      }
      else if (location === this.imageLocationTwo && this.file.size > this.imageLocationTwoSize) {
        this.imageSizeErrorLocationTwo = true
        window.alert("Image file size should be less than 50kb")

      }
      else {
        if (this.file) {
          let reader = new FileReader();
          reader.readAsDataURL(this.file);
          this.uploadImagesToServer(index, location)
        }
      }
    }
  }

  uploadImagesToServer(index: number, location: string) {
    let formData = new FormData()
    formData.append('files', this.file)
    let sUuid = this.data.sUuid
    this.gloqrAdminService.postProductImage(formData, sUuid).subscribe(
      event => {
        if (event.error) {

        }
        else {
          this.selectedImages = event.data
          if (location === this.imageLocationOne) {
            this.saveImages = false
            this.data.images[index].fileLocationOne = event.data[0].fileLocation
          }
          else if (location === this.imageLocationTwo) {
            this.saveImages = false
            this.data.images[index].fileLocationTwo = event.data[0].fileLocation
          }
        }
      },
    )
  }

  deleteImage(index: number, location: string) {
    if (location === this.imageLocationOne) {
      this.data.images[index].fileLocationOne = undefined
      this.saveImages = false
    }
    else if (location === this.imageLocationTwo) {
      this.data.images[index].fileLocationTwo = undefined
      this.saveImages = false

    }
  }
  onSaveImages() {
    this.smeEntity = new SmeEntity();
    this.smeEntity.editedImages = this.data.images
    this.smeEntity.id = this.data.productUuid
    this.gloqrAdminService.updateProductImages(this.smeEntity).subscribe(
      res => {
        if (res.error) {

        }
        else {
          this.saveImages = true

        }
      }
    )
  }
  onApprove() {
    this.smeEntity = new SmeEntity();
    this.smeEntity.id = this.data.productUuid
    this.smeEntity.feedbackMessage = this.feedbackMessage.value
    this.smeEntity.state = ItemState.APPROVED;
    this.smeEntity.subCategoryUuid = this.productAdminForm.controls['subCategory'].value
    this.dialogRef.close(this.smeEntity)
  }
  onReject() {
    this.smeEntity = new SmeEntity();
    this.smeEntity.id = this.data.productUuid
    this.smeEntity.feedbackMessage = this.feedbackMessage.value
    this.smeEntity.state = ItemState.REJECTED;
    this.smeEntity.subCategoryUuid = this.productAdminForm.controls['subCategory'].value
    this.dialogRef.close(this.smeEntity)
  }
  close() {
    this.dialogRef.close(this.smeEntity)
  }

}
