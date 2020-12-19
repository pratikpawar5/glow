import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { City, SMECategoryDto, Country, State, SMEAddress, SMEOtherCategory, SMEInformationDto } from '@models/sme';
import { TokenService } from '@services/token/token.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { SmeService } from '@services/sme/sme.service';
import { ConstantService } from '@services/common/constant-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { AddressService } from '@services/common/address.service';
import { Router } from '@angular/router';
import { LoginService } from 'app/auth/auth-services/login.service';
import { SmeRegTermsConditionComponent } from './sme-reg-terms-condition/sme-reg-terms-condition.component';
import { PageTitleService } from '@services/page-title/page-title.service';
declare var ga: Function;
@Component({
  selector: 'app-first-step-reg',
  templateUrl: './first-step-reg.component.html',
  styleUrls: ['./first-step-reg.component.css']
})
export class FirstStepRegComponent implements OnInit {
  /*FIRST STEP FORM START*/
  companyInformationForm: FormGroup
  gstInNumber: boolean
  citysearchResultArray = new Array<City>();
  smeCategories: Array<SMECategoryDto>
  termsAndCondition: MatDialogRef<SmeRegTermsConditionComponent>
  categoryUuid: string
  disableFlag = false
  showButton: boolean = true
  countries: Array<Country>
  states: Array<State>
  cities: Array<City>
  emailPattern = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
    + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
  uuid: string
  isSelected: boolean = false
  labelPosition = 'MANUFACTURE';
  maxDate = new Date();
  acceptedTermsConditionTrue: boolean = true

  /*Custom Category*/
  customCategory: string = "custom";
  newCategory: boolean
  constructor(private formBuilder: FormBuilder, private matDialog: MatDialog, private smeService: SmeService, private constant: ConstantService,
    private snackBar: MatSnackBar, private http: HttpClient, private addressService: AddressService, private router: Router,
    private token: TokenService, private loginService: LoginService, private pageTitleService: PageTitleService) {
    ga('set', 'page', router.url);
    ga('send', 'pageview');
  }

  ngOnInit() {
    this.pageTitleService.updateTitle('SME Registration')

    window.scrollTo(0, 0)
    this.maxDate.getDate();
    if (this.token.isLoggedIn()) {
      this.uuid = this.token.getUserId();
    }
    this.companyInformationForm = this.formBuilder.group({
      //Category fields
      categoryUuid: new FormControl(null),
      categoryUrl: new FormControl(null),
      categoryName: new FormControl(null, [Validators.required]),
      //SMEInformation fields
      uuid: new FormControl(null),
      sUuid: new FormControl(null),
      userId: new FormControl(null),
      smeName: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      oneLineStatement: new FormControl(null, [Validators.maxLength(50)]),
      // uniqueGstNumberValidator(this.smeInfoService)
      gstin: new FormControl(null, [Validators.required, Validators.maxLength(15), Validators.pattern('^[a-zA-Z0-9.? ]+$'), Validators.pattern('[0-9]{2}[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9A-Za-z]{1}[Z]{1}[0-9a-zA-Z]{1}')]),
      contactPhone: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+$')]),
      contactEmail: new FormControl(null, [Validators.required, Validators.pattern(this.emailPattern)]),
      contactPerson: new FormControl(null, [Validators.pattern('^[a-zA-Z ]*$'), Validators.required, Validators.maxLength(30)]),
      smeType: new FormControl(true, Validators.required),
      yearOfEstablishment: new FormControl(null, Validators.required),
      acceptedTermsCondition: new FormControl(true, Validators.requiredTrue),
      //SMEAddress fields
      address_uuid: new FormControl(null),
      street: new FormControl(null, [Validators.maxLength(255)]),
      city: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      country: new FormControl(null, [Validators.required]),
      pincode: new FormControl(null, [Validators.required, Validators.maxLength(6), Validators.pattern('[0-9]+')]),
      locality: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z? ]+$'), Validators.maxLength(30)]),
      customCategory: new FormControl(null, [Validators.maxLength(100)]),
    })

    this.getCategories();
    this.onCountries();

    this.companyInformationForm.controls['categoryName'].valueChanges.subscribe(
      res => {
        if (res && res !== this.customCategory) {
          this.companyInformationForm.controls['customCategory'].setValue(null)
          this.newCategory = false
        } else {
          this.newCategory = true
        }
      }
    )

    this.companyInformationForm.controls['country'].valueChanges.subscribe(
      res => {
        if (res != undefined) {
          this.onStates(res.countryCode);
          this.companyInformationForm.controls['state'].setValue(null)
        }
      }
    )
    this.companyInformationForm.controls['state'].valueChanges.subscribe(
      res => {
        if (res != undefined) {
          this.onCities(res.stateCode);
          this.companyInformationForm.controls['city'].setValue(null);
          this.cities = null;
        }
      }
    )

    this.companyInformationForm.controls['gstin'].valueChanges.subscribe(
      res => {
        if (res.length >= 15) {
          let gstIn = this.companyInformationForm.controls['gstin'].value
          this.smeService.gstNumberValidate(gstIn).subscribe(
            res => {
              if (res.error) {
                if (res.code == 400) {
                  this.companyInformationForm.controls['gstin'].setErrors({
                    'alreadyPresent': true
                  })
                }
              }
              else {
                this.gstInNumber = false
              }
            }
          )

        }
      }
    )
  }

  /*FIRST STEP FORM*/
  onKeydown(event) {
    if (event.keyCode === 69 || event.keyCode === 32) {
      return false;
    }
  }

  checkCheckbox(c: AbstractControl) {
    if (c.get('acceptedTermsCondition').value == false) {
      return false;
    } else return true;
  }

  onKeydownSpace(event) {
    if (event.keyCode === 32) {
      this.getExistingMobileAndEmail();
      return true;
    }
  }

  onOpenDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = false;
    dialogConfig.width = '500px';
    this.termsAndCondition = this.matDialog.open(SmeRegTermsConditionComponent, dialogConfig);
    this.termsAndCondition.afterClosed().subscribe(
      res => {
        if (res == true) {

        }
      }
    )
  }

  getCategories() {
    this.smeService.smeCategories().subscribe(
      res => {
        if (!res.error) {
          this.smeCategories = res.data
        }
      }
    )
  }

  getExistingMobileAndEmail() {
    this.loginService.getUserVo(this.uuid).subscribe(
      res => {
        this.companyInformationForm.patchValue({
          contactPerson: res.data.userFullName,
        });

        if (res.data.userMobile != null) {
          this.companyInformationForm.patchValue({
            contactPhone: res.data.userMobile,
          });
        }
        if (res.data.userEmail != null) {
          this.companyInformationForm.patchValue({
            contactEmail: res.data.userEmail,
          });
        }
        this.disableFlag = true
        this.isSelected = true
      }
    )
  }

  onCategory(categoryUuid) {
    this.categoryUuid = categoryUuid
  }

  onCountries() {
    this.addressService.getCountries().subscribe(
      res => {
        if (!res.error && res.code == 200) {
          this.countries = res.data
          this.states = [];
          this.companyInformationForm.controls['state'].disable()
          this.companyInformationForm.controls['city'].disable()

        }
      }
    )
  }

  onStates(countryCode: string) {
    this.addressService.getStates(countryCode).subscribe(
      res => {
        if (!res.error && res.code == 200) {
          this.states = res.data
          this.cities = [];
          this.companyInformationForm.controls['city'].disable()
          this.companyInformationForm.controls['state'].enable()
        }
      }
    )
  }

  onCities(stateCode: string) {
    this.addressService.getCities(stateCode).subscribe(
      res => {
        if (!res.error && res.code == 200) {
          this.cities = res.data
          this.companyInformationForm.controls['city'].enable()
        }
      }
    )
  }

  onSubmitFirstStep() {

    if (this.companyInformationForm.valid) {
      this.showButton = false
      let companyBasicInfo: SMEInformationDto;
      let companyAddressInfo = new SMEAddress();
      let categorySmeInfo = new SMECategoryDto();

      companyBasicInfo = this.companyInformationForm.value
      companyBasicInfo.uuid = this.token.getUserId();
      companyBasicInfo.yearOfEstablishment = this.companyInformationForm.controls['yearOfEstablishment'].value

      companyAddressInfo.locality = this.companyInformationForm.controls['locality'].value
      companyAddressInfo.pincode = this.companyInformationForm.controls['pincode'].value
      companyAddressInfo.street = this.companyInformationForm.controls['street'].value
      companyAddressInfo.city = this.companyInformationForm.controls['city'].value.cityName
      companyAddressInfo.state = this.companyInformationForm.controls['state'].value.stateName
      companyAddressInfo.country = this.companyInformationForm.controls['country'].value.countryName
      companyBasicInfo.smeAddress = companyAddressInfo

      if (this.newCategory) {

        let otherCategory: SMEOtherCategory = new SMEOtherCategory()

        otherCategory.otherCategoryName = this.companyInformationForm.controls['customCategory'].value

        companyBasicInfo.otherCategory = otherCategory

        this.companyInformationForm.controls['categoryUuid'].setValue(null)
      }
      else {
        categorySmeInfo.categoryUuid = this.categoryUuid
      }

      let companyList = new Array<SMEInformationDto>();
      companyList.push(companyBasicInfo);
      categorySmeInfo.smes = companyList
      this.smeService.addCompanyInfo(categorySmeInfo).subscribe(
        res => {
          if (res.error) {
            this.showButton = true
          }
          else {
            this.token.setToken(res.data.token);
            this.router.navigateByUrl('/list-on-gloqr/second-step');
          }
        }
      )
    }
    else {
      window.scrollTo(0, 0)
    }
  }

}
