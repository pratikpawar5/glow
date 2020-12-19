import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackBarService } from '@services/common/snack-bar.service';
import { environment } from 'environments/environment';
import { CustomHttpResponse } from '@models/custom.response';

   //Add Product Price Units from gloqr-admin

@Component({
  selector: 'app-add-product-price-units',
  templateUrl: './add-product-price-units.component.html',
  styleUrls: ['./add-product-price-units.component.css']
})
export class AddProductPriceUnitsComponent implements OnInit {

  unitForm: FormGroup

  showButton: boolean = true
  error: boolean

  private headers: HttpHeaders = new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('s_Token')
  });

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient, private snackBar: SnackBarService) { }

  ngOnInit() {
    this.unitForm = this.formBuilder.group({
      unitsArray: this.formBuilder.array([
        this.formBuilder.group({
          name: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(100)])
        })
      ])
    })
  }

  onSubmit() {

    if (this.unitForm.valid) {
      this.http.post<CustomHttpResponse<any>>(environment.PRODUCT_URL + "admin/price-units", this.unitForm.controls['unitsArray'].value,
        { headers: this.headers }).subscribe(response => {
          this.showButton = true
          if (response.error) {
            this.error = true
          } else {
            this.unitForm.reset()
            window.scrollTo(0, 0)
            this.snackBar.open("Successfully Added!!")
          }
        },
          err => {
            this.showButton = true
            this.error = true
          })
    }
  }

  addControl() {
    let arrayControl = <FormArray>this.unitForm.controls['unitsArray']

    let newGroup = this.formBuilder.group({
      name: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
    });

    arrayControl.push(newGroup);
  }

  deleteControl(index: number) {
    const arrayControl = <FormArray>this.unitForm.controls['unitsArray']
    arrayControl.removeAt(index)
  }

  getControls() {
    const arrayControl = <FormArray>this.unitForm.controls['unitsArray']
    return arrayControl.controls
  }

}
