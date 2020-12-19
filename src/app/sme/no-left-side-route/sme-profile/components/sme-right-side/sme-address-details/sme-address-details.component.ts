import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Country, State, City, SMEAddress, SMEInformationDto } from '@models/sme';
import { SnackBarService } from '@services/common/snack-bar.service';
import { Router } from '@angular/router';
import { LazySmeModuleService } from 'app/sme/http-service/lazy-sme-module.service';
import { AddressService } from '@services/common/address.service';
import { TokenService } from '@services/token/token.service';

@Component({
  selector: 'app-sme-address-details',
  templateUrl: './sme-address-details.component.html',
  styleUrls: ['./sme-address-details.component.css']
})
export class SmeAddressDetailsComponent implements OnInit {
  @Input()
  smes: SMEInformationDto
  /*Address*/
  smeAddressForm: FormGroup
  countries: Array<Country>
  states: Array<State>
  cities: Array<City>
  infoAddressEdit = true
  saveButtonAddress = false
  saveAddress = true
  address: SMEAddress
  sUuid: string
  constructor(private formBuilder: FormBuilder, private token: TokenService, private addressService: AddressService, private smeService: LazySmeModuleService, private router: Router, private snackBar: SnackBarService) { }

  ngOnInit() {
    this.sUuid = this.token.getSmeId();

    this.address = this.smes.smeAddress;

    this.smeAddressForm = this.formBuilder.group({
      addrsUuid: new FormControl(null),
      pincode: new FormControl(null, [Validators.required, Validators.maxLength(6), Validators.pattern('[0-9]+')]),
      locality: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z? ]+$'), Validators.maxLength(30)]),
      street: new FormControl(null, [Validators.maxLength(255), Validators.required]),
      city: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
    })

    this.smeAddressForm.patchValue(
      {
        addrsUuid: this.address.addrsUuid,
        pincode: this.address.pincode,
        locality: this.address.locality,
        street: this.address.street,
        city: this.address.city,
        state: this.address.state,
        country: this.address.country,
      }
    )
    this.getAddressDataFromBackend(this.address);
    this.smeAddressForm.disable();
  }
  onKeydown(event) {
    if (event.keyCode === 69 || event.keyCode === 32) {
      return false;
    }
  }
  /*Address*/

  onEditAddress() {
    this.infoAddressEdit = false;
    this.saveButtonAddress = true;
    this.smeAddressForm.enable();

  }

  onCancelAddress() {
    this.infoAddressEdit = true;
    this.saveButtonAddress = false;
    this.smeAddressForm.disable();
    this.ngOnInit();

  }

  getAddressDataFromBackend(address: SMEAddress) {
    this.addressService.getCountries().subscribe(
      res => {
        if (!res.error && res.code == 200) {
          this.countries = res.data
          let country: Country = this.countries.filter(c => c.countryName === address.country)[0];
          this.addressService.getStates(country.countryCode).subscribe(
            res => {
              if (!res.error && res.code == 200) {
                this.states = res.data
                let state: State = this.states.filter(s => s.stateName === address.state)[0];
                this.addressService.getCities(state.stateCode).subscribe(
                  res => {
                    if (!res.error && res.code == 200) {
                      this.cities = res.data
                    }
                  }
                )
              }
            }
          )
        }
      }
    )
  }

  onStates(country: Country) {
    this.addressService.getStates(country.countryCode).subscribe(
      res => {
        if (!res.error && res.code == 200) {
          this.states = res.data
          this.smeAddressForm.controls['city'].enable()
          this.cities = [];

        }
      }
    )
  }


  onCities(state: State) {
    this.addressService.getCities(state.stateCode).subscribe(
      res => {
        if (!res.error && res.code == 200) {
          this.smeAddressForm.controls['city'].setValue(null)
          this.cities = res.data
        }
      }
    )
  }

  onClickUpdateAddress() {
    if (this.smeAddressForm.valid) {
      const street: string = this.smeAddressForm.controls['street'].value;
      const locality: string = this.smeAddressForm.controls['locality'].value;

      if (street[0] == " ") {
        this.smeAddressForm.controls['street'].setErrors({
          "inValid": true
        })
        return;
      }
      if (locality[0] == " ") {
        this.smeAddressForm.controls['locality'].setErrors({
          "inValid": true
        })
        return;
      }
      this.smeService.updateAddressInfo(this.smeAddressForm.value).subscribe(
        res => {
          if (res.error) {
            this.saveButtonAddress = true
          }
          else {
            this.snackBar.open('Address Details Updated ');
            this.router.navigateByUrl('', { skipLocationChange: true }).then(() =>
              this.router.navigate(['my-sme', this.sUuid, 'profile']));
          }
        },
        err => {
          this.saveButtonAddress = true
        }
      )
    }

  }
}
