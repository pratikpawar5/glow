import { Component, OnInit, Input } from '@angular/core';
import { SMEInformationDto, TurnOver } from '@models/sme';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SnackBarService } from '@services/common/snack-bar.service';
import { Router } from '@angular/router';
import { LazySmeModuleService } from 'app/sme/http-service/lazy-sme-module.service';
import { TokenService } from '@services/token/token.service';
import { DatePipe } from '@angular/common';

export interface TurnOverUnits {
  value: any;
  viewValue: string;
}
export interface RegisteredAS {
  value: any;
  viewValue: string;
}

@Component({
  selector: 'app-sme-basic-details',
  templateUrl: './sme-basic-details.component.html',
  styleUrls: ['./sme-basic-details.component.css']
})
export class SmeBasicDetailsComponent implements OnInit {
  @Input()
  smes: SMEInformationDto
  infoEdit = true
  saveButton = false
  sUuid: string
  smeProfileForm: FormGroup
  emailPattern = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
    + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";

  registeredType: RegisteredAS[] = [
    { value: 'PRIVATE', viewValue: 'Private' },
    { value: 'PUBLIC', viewValue: 'Public' },
    { value: 'PROPRIETORSHIP', viewValue: 'Proprietorship' },
    { value: 'PARTNERSHIP', viewValue: 'Partnership' },
    { value: 'OTHER', viewValue: 'Other' },
  ];

  turnOverUnit: TurnOverUnits[] = [
    { value: 'CRORES', viewValue: 'Crore' },
    { value: 'LAKHS', viewValue: 'Lakhs' }
  ];
  constructor(private formBuilder: FormBuilder, public datepipe: DatePipe, private token: TokenService, private smeService: LazySmeModuleService, private router: Router, private snackBar: SnackBarService) { }

  ngOnInit() {

    this.sUuid = this.token.getSmeId();

    let latest_date = this.datepipe.transform(this.smes.yearOfEstablishment, 'dd-MM-yyyy');

    this.smeProfileForm = this.formBuilder.group(
      {
        sUuid: new FormControl(null),
        uuid: new FormControl(null),
        smeName: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
        oneLineStatement: new FormControl(null, [Validators.maxLength(50), Validators.minLength(2)]),
        companyDescription: new FormControl(null, [Validators.maxLength(1000), Validators.minLength(10)]),
        contactPerson: new FormControl(null, [Validators.pattern('^[a-zA-Z. ]*$'), Validators.maxLength(30)]),
        contactPhone: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+$')]),
        contactEmail: new FormControl(null, [Validators.required, Validators.email]),
        smeType: new FormControl(null),
        yearOfEstablishment: new FormControl(latest_date),
        numberOfEmployees: new FormControl(null, [Validators.pattern('[0-9]+')]),
        turnOver: new FormControl(null, Validators.pattern('[0-9.]+')),
        registeredType: new FormControl(this.registeredType[0].value),
        turnOverUnit: new FormControl(this.turnOverUnit[0].value),
        gstin: new FormControl(null, [Validators.maxLength(15), Validators.pattern('^[a-zA-Z0-9.? ]+$'), Validators.pattern('[0-9]{2}[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9A-Za-z]{1}[Z]{1}[0-9a-zA-Z]{1}')]),
        logoImage: new FormControl(this.smes.logoImage),
        latitude: new FormControl(null, Validators.pattern('[0-9.]+')),
        longitude: new FormControl(null, Validators.pattern('[0-9.]+')),
      }
    )

    this.smeProfileForm.patchValue(
      {
        sUuid: this.smes.sUuid,
        uuid: this.smes.uuid,
        smeName: this.smes.smeName,
        oneLineStatement: this.smes.oneLineStatement,
        companyDescription: this.smes.companyDescription,
        contactPerson: this.smes.contactPerson,
        contactPhone: this.smes.contactPhone,
        contactEmail: this.smes.contactEmail,
        smeType: this.smes.smeType,
        numberOfEmployees: this.smes.numberOfEmployees,
        gstin: this.smes.gstin,
        logoImage: this.smes.logoImage,
        latitude: this.smes.latitude,
        longitude: this.smes.longitude
      }
    )
    if (this.smes.turnOver != null && this.smes.turnOver != undefined) {
      this.smeProfileForm.patchValue(
        {
          turnOver: this.smes.turnOver.totalTurnOver,
          turnOverUnit: this.smes.turnOver.turnOverUnit,
        }
      )
    }
    if (this.smes.registeredType != null && this.smes.registeredType != undefined) {
      this.smeProfileForm.patchValue(
        {
          registeredType: this.smes.registeredType,
        }
      )
    }

    this.smeProfileForm.disable();

  }

  onEditInfo() {
    this.infoEdit = false;
    this.saveButton = true;
    this.smeProfileForm.enable();
    this.smeProfileForm.controls['gstin'].disable();
    this.smeProfileForm.controls['yearOfEstablishment'].disable();
    this.smeProfileForm.controls['smeName'].disable();
  }

  onCancelInfo() {
    this.infoEdit = true;
    this.saveButton = false;
    this.smeProfileForm.disable();
    this.smeProfileForm.controls['']
    this.ngOnInit();
  }

  onKeydown(event) {
    if (event.keyCode === 69 || event.keyCode === 32) {
      return false;
    }
  }

  onUpdateInformation() {
    if (this.smeProfileForm.valid) {
      const contactPerson: string = this.smeProfileForm.controls['contactPerson'].value;
      if (contactPerson[0] == " ") {
        this.smeProfileForm.controls['contactPerson'].setErrors({
          "inValidContact": true
        })
        return;
      }
      let companyBasicInfo: SMEInformationDto;
      companyBasicInfo = this.smeProfileForm.value
      companyBasicInfo.oneLineStatement = this.smeProfileForm.controls['oneLineStatement'].value
      companyBasicInfo.companyDescription = this.smeProfileForm.controls['companyDescription'].value

      if (companyBasicInfo.oneLineStatement != null && companyBasicInfo.oneLineStatement.length <= 0) {
        companyBasicInfo.oneLineStatement = null
      }

      if (companyBasicInfo.companyDescription[0] == " ") {
        this.smeProfileForm.controls['companyDescription'].setErrors({
          "inValid": true
        })
        return;
      }

      let turnOver = new TurnOver();

      turnOver.totalTurnOver = this.smeProfileForm.controls['turnOver'].value

      turnOver.turnOverUnit = this.smeProfileForm.controls['turnOverUnit'].value

      companyBasicInfo.turnOver = turnOver

      companyBasicInfo.yearOfEstablishment = this.smes.yearOfEstablishment

      companyBasicInfo.smeName = this.smes.smeName

      companyBasicInfo.gstin = this.smeProfileForm.controls['gstin'].value

      this.smeService.updateBasicInfo(companyBasicInfo).subscribe(
        res => {
          if (!res.error) {
            this.snackBar.open('Account Details Updated ');

            this.router.navigateByUrl('', { skipLocationChange: true }).then(() =>
              this.router.navigate(['my-sme', this.sUuid, 'profile']));
          }
        },
        err => {
          this.saveButton = true
        })
    }
  }

}
