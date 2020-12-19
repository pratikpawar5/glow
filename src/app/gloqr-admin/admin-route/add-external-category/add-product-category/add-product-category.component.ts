import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { environment } from 'environments/environment';
import { HttpClient, HttpEventType, HttpResponse, HttpHeaders } from '@angular/common/http';
import { ConstantService } from '@services/common/constant-service.service';
import { CustomHttpResponse } from '@models/custom.response';
import { SnackBarService } from '@services/common/snack-bar.service';
import { ProductCategory } from '@models/product';


    //Add Product Category Area from gloqr-admin
@Component({
  selector: 'app-add-product-category',
  templateUrl: './add-product-category.component.html',
  styleUrls: ['./add-product-category.component.css']
})
export class AddProductCategoryComponent implements OnInit {

  categoryForm: FormGroup;
  contentServer: string = environment.CONTENT_SERVER
  productCategories: Array<ProductCategory>

  newCategory: boolean
  error: boolean

  imageTypes: Array<string>
  allowedImageSize: number = 20480

  showButton: boolean = true

  private headers: HttpHeaders = new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('s_Token')
  });

  constructor(private formBuilder: FormBuilder, constants: ConstantService,
    private http: HttpClient, private snackBar: SnackBarService) {
    this.imageTypes = constants.getImageFormats()
  }

  ngOnInit() {
    this.getCategories();
    this.categoryForm = this.formBuilder.group({
      categoryUuid: new FormControl(null),
      categoryName: new FormControl(null, [Validators.maxLength(100)]),
      fileLocation: new FormControl(null),
      subCategories: this.formBuilder.array([
        this.formBuilder.group({
          subCategoryName: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
          fileLocation: new FormControl(null, [Validators.required]),
        })
      ])
    })

    this.categoryForm.controls['categoryUuid'].valueChanges.subscribe(
      res => {
        if (res === 'NewCategory') {
          this.newCategory = true
        } else {
          this.newCategory = false
        }
      }
    )
  }

  onSubmit() {
    this.error = false
    if (this.categoryForm.valid) {
      if (this.newCategory) {
        this.showButton = false
        let name: string = this.categoryForm.controls['categoryName'].value
        let valid: boolean = false;
        if (name == null) {
          this.categoryForm.controls['categoryName'].setErrors({
            "required": true
          })
          valid = false
        } else {
          valid = true
        }

        let location: string = this.categoryForm.controls['fileLocation'].value

        if (location == null) {
          this.categoryForm.controls['fileLocation'].setErrors({
            "required": true
          })
          valid = false
        } else {
          valid = true
        }

        if (valid) {
          this.http.post<CustomHttpResponse<any>>(environment.PRODUCT_URL + 'admin/categories', this.categoryForm.value, {
            headers: this.headers
          }).subscribe(
            res => {
              this.handleResponse(res)
            },
            err => {
              this.showButton = true
              this.error = true
            }
          )
        }
      } else {
        this.showButton = false
        this.http.post<CustomHttpResponse<any>>(environment.PRODUCT_URL + 'admin/categories/'
          + this.categoryForm.controls['categoryUuid'].value + '/subcategories',
          this.categoryForm.controls['subCategories'].value, {
            headers: this.headers
          }).subscribe(
            res => {
              this.handleResponse(res)
            },
            err => {
              this.showButton = true
              this.error = true
            }
          )
      }
    }
  }

  handleResponse(response: any) {
    this.showButton = true
    if (response.error) {
      this.error = true
    } else {
      this.categoryForm.reset()
      window.scrollTo(0, 0)
      this.snackBar.open("Successfully Added!!")
      this.getCategories()
    }
  }

  addSubCategory() {
    const arrayControl = <FormArray>this.categoryForm.controls['subCategories']

    let newGroup = this.formBuilder.group({
      subCategoryName: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
      fileLocation: new FormControl(null, [Validators.required]),
    });
    arrayControl.push(newGroup);
  }

  removeSubCategory(index: number) {
    const arrayControl = <FormArray>this.categoryForm.controls['subCategories']
    arrayControl.removeAt(index)
  }

  onFileChanged(files: Array<File>, index: number, type: string) {

    if (this.imageTypes.indexOf(files[0].type) === -1) {
      window.alert("Supported formats are: .jpeg .jpg .png")
      return false
    } else if (files[0].size > this.allowedImageSize) {
      window.alert("Image file size should be less than 20kb.")
      return false
    }


    this.uploadImagesToServer(files[0], index, type)
  }


  uploadImagesToServer(file: File, index: number, type: string) {

    let formData = new FormData()
    formData.append('file', file)

    this.http.post<CustomHttpResponse<any>>(environment.PRODUCT_URL + 'file', formData, {
      headers: this.headers
    }).subscribe(
      res => {
        if (!res.error) {
          if (type == "Category") {
            this.categoryForm.controls['fileLocation'].setValue(res.data.fileLocation)
          } else {
            const arrayControl = <FormArray>this.categoryForm.controls['subCategories']
            arrayControl.controls[index].get('fileLocation').setValue(res.data.fileLocation)
          }
        }
      }
    )

  }

  getCategories() {
    this.http.get<CustomHttpResponse<any>>(environment.PRODUCT_URL + 'categories', {
      headers: this.headers
    }).subscribe(res => {
      if (!res.error) {
        this.productCategories = res.data.categories
      }
    })
  }

  getImage(index: number) {
    const arrayControl = <FormArray>this.categoryForm.controls['subCategories']
    return arrayControl.controls[index].get('fileLocation').value;
  }

  deleteImage(index: number) {
    const arrayControl = <FormArray>this.categoryForm.controls['subCategories']
    return arrayControl.controls[index].get('fileLocation').setValue(null);
  }

  deleteCategoryImage() {
    this.categoryForm.controls['fileLocation'].setValue(null)
  }

  getControls() {
    const arrayControl = <FormArray>this.categoryForm.controls['subCategories']
    return arrayControl.controls
  }

}
