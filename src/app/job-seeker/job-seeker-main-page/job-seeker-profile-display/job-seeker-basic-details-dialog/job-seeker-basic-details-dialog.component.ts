import { Component, OnInit, Inject } from '@angular/core';
import { JobSeeker, Experience, EmploymentSalary, JobSeekerAddress } from '@models/jobs';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { JobSeekerService } from 'app/job-seeker/job-seekers-services/job-seeker.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Country, State, City} from '@models/sme';
import { SmeAddressService } from '@services/sme-address/sme-address.service';
import { SnackBarService } from '@services/common/snack-bar.service';
import { DatePipe } from '@angular/common';
import { AddressService } from '@services/common/address.service';
import { TokenService } from '@services/token/token.service';

export interface Salary {
  value: string;
  viewValue: string;
}
export interface ExperinceInYear {
  value: any;
  viewValue: string;
}
@Component({
  selector: 'app-job-seeker-basic-details-dialog',
  templateUrl: './job-seeker-basic-details-dialog.component.html',
  styleUrls: ['./job-seeker-basic-details-dialog.component.css']
})
export class JobSeekerBasicDetailsDialogComponent implements OnInit {

  jobSeekerBasicDetailsForm: FormGroup
  gender: string
  expInMonth: boolean = false
  indianRupees = "INR"
  countries: Array<Country>
  states: Array<State>
  cities: Array<City>
  jobSeekerAddress: JobSeekerAddress
  currentDate = new Date();
  birthDate = new Date();
  dobNotAllowed: boolean
  maxDate = new Date();
  minDate = new Date();
  emailPattern = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@" + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
  salaryName: Salary[] = [
    { value: 'YEAR', viewValue: 'Annually' },
    { value: 'MONTH', viewValue: 'Monthly ' },
    { value: 'DAY', viewValue: 'Day' },
  ];
  experienceInYear: ExperinceInYear[] = [
    { value: 'Fresher', viewValue: 'Fresher' },
    { value: '0', viewValue: '0 Year' },
    { value: '1', viewValue: '1 Year' },
    { value: '2', viewValue: '2 Years ' },
    { value: '3', viewValue: '3 Years' },
    { value: '4', viewValue: '4 Years ' },
    { value: '5', viewValue: '5 Years' },
    { value: '6', viewValue: '6 Years ' },
    { value: '7', viewValue: '7 Years' },
    { value: '8', viewValue: '8 Years ' },
    { value: '9', viewValue: '9 Years' },
    { value: '10', viewValue: '10 Years ' },
    { value: '11', viewValue: '11 Years' },
    { value: '12', viewValue: '12 Years' },
    { value: '13', viewValue: '13 Years' },
    { value: '14', viewValue: '14 Years' },
    { value: '15', viewValue: '15 Years' },
    { value: '16', viewValue: '16 Years ' },
    { value: '17', viewValue: '17 Years' },
    { value: '18', viewValue: '18 Years ' },
    { value: '19', viewValue: '19 Years' },
    { value: '20', viewValue: '20 Years ' },
    { value: '21', viewValue: '21 Years' },
    { value: '22', viewValue: '22 Years ' },
    { value: '23', viewValue: '23 Years' },
    { value: '24', viewValue: '24 Years ' },
    { value: '25', viewValue: '25 Years' },
    { value: '26', viewValue: '26 Years' },
    { value: '27', viewValue: '27 Years' },
    { value: '28', viewValue: '28 Years' },
    { value: '29', viewValue: '29 Years' },
    { value: '30', viewValue: '30+ Years' },
  ]
  experienceInMonth: ExperinceInYear[] = [
    { value: 0, viewValue: 'less than month' },
    { value: 1, viewValue: '1 Month' },
    { value: 2, viewValue: '2 Months ' },
    { value: 3, viewValue: '3 Months' },
    { value: 4, viewValue: '4 Months ' },
    { value: 5, viewValue: '5 Months' },
    { value: 6, viewValue: '6 Months' },
    { value: 7, viewValue: '7 Months' },
    { value: 8, viewValue: '8 Months' },
    { value: 9, viewValue: '9 Months' },
    { value: 10, viewValue: '10 Months' },
    { value: 11, viewValue: '11 Months' },
  ];
  showButton: boolean = true
  isDob: boolean = false
  uuid: string
  constructor(private formBuilder: FormBuilder, private token: TokenService, private addressService: AddressService, public datepipe: DatePipe, private smeAddressService: SmeAddressService, private router: Router, private snackBar: SnackBarService, private route: ActivatedRoute, private jobSeekerService: JobSeekerService, @Inject(MAT_DIALOG_DATA) public data: JobSeeker, private dialogRef: MatDialogRef<JobSeekerBasicDetailsDialogComponent>) {
  }
  ngOnInit() {
    this.gender = this.data.gender
    this.uuid = this.token.getUserId();
    if (this.data.jobSeekerAddress) {
      this.jobSeekerAddress = this.data.jobSeekerAddress;
    }
    this.minDate = new Date(1930, 0, 1);
    this.maxDate = new Date(2001, 12, 31);
    this.jobSeekerBasicDetailsForm = this.formBuilder.group({
      jobSeekerProfileUuid: new FormControl(null),

      fullName: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]*$'), Validators.maxLength(100)]),

      emailId: new FormControl(null, [Validators.pattern(this.emailPattern)]),

      mobileNumber: new FormControl(null, [Validators.pattern('[0-9]+'), Validators.minLength(10), Validators.required]),

      gender: new FormControl(this.gender),

      dob: new FormControl(new Date(this.data.dob), Validators.required),

      totalExpsYear: new FormControl(this.experienceInYear[0].value),

      totalExpsMonth: new FormControl(this.experienceInMonth[0].value),

      salary: new FormControl(null, [Validators.maxLength(10), Validators.pattern('[0-9]+'), Validators.min(0), Validators.max(9999999999)]),

      INR: new FormControl(null),

      salaryType: new FormControl(this.salaryName[0].value),

      currentCountry: new FormControl(null, [Validators.pattern('^[a-zA-Z? ]+$'), Validators.required]),

      currentState: new FormControl(null, [Validators.pattern('^[a-zA-Z? ]+$'), Validators.required]),

      currentCity: new FormControl(null, [Validators.pattern('^[a-zA-Z? ]+$'), Validators.required]),


    })

    this.jobSeekerBasicDetailsForm.controls['dob'].disable()

    this.jobSeekerBasicDetailsForm.controls['dob'].valueChanges.subscribe(
      res => {
        this.birthDate = res

        let age = this.currentDate.getFullYear() - this.birthDate.getFullYear()

        if (age < 18 || age > 70) {
          this.dobNotAllowed = true
        }
        else {
          this.dobNotAllowed = false;
          this.isDob = false;
        }
      },
    )

    this.jobSeekerBasicDetailsForm.patchValue(
      {
        jobSeekerProfileUuid: this.data.jobSeekerProfileUuid,
        fullName: this.data.fullName,
        emailId: this.data.emailId,
        mobileNumber: this.data.mobileNumber,
        gender: this.data.gender,
      }
    )
    if (this.jobSeekerAddress) {
      this.jobSeekerBasicDetailsForm.controls['currentCountry'].setValue(this.jobSeekerAddress.currentCountry)
      this.jobSeekerBasicDetailsForm.controls['currentState'].setValue(this.jobSeekerAddress.currentState)
      this.jobSeekerBasicDetailsForm.controls['currentCity'].setValue(this.jobSeekerAddress.currentCity)
    }
    this.getAddressDataFromBackend(this.jobSeekerAddress);
    if (!this.data.totalExperience) {
      this.expInMonth = false
    }
    else if (this.data.totalExperience && this.data.totalExperience.year == "Fresher") {
      this.expInMonth = false
    }
    else {
      this.expInMonth = true
    }

    if (this.data.totalExperience) {
      this.jobSeekerBasicDetailsForm.controls['totalExpsMonth'].setValue(this.data.totalExperience.month);
      this.jobSeekerBasicDetailsForm.controls['totalExpsYear'].setValue(this.data.totalExperience.year);
    }

    if (this.data.currentSalary) {
      this.jobSeekerBasicDetailsForm.controls['salary'].setValue(this.data.currentSalary.salary);
      this.jobSeekerBasicDetailsForm.controls['salaryType'].setValue(this.data.currentSalary.salaryType);
    }

    this.jobSeekerBasicDetailsForm.controls['totalExpsYear'].valueChanges.subscribe(
      totalExpsYear => {
        if (totalExpsYear == "Fresher") {
          this.expInMonth = false
        }
        else {
          this.expInMonth = true
        }
      }
    )

  }


  onClickSalaryType() {
    this.jobSeekerBasicDetailsForm.controls['salary'].setValue(null)
  }

  onKeydown(event) {
    if (event.keyCode === 32) {
      return false;
    }
  }
  getAddressDataFromBackend(jobSeekerAddress: JobSeekerAddress) {
    this.addressService.getCountries().subscribe(
      res => {
        if (!res.error && res.code == 200) {
          this.countries = res.data
          if (this.data.jobSeekerAddress) {
            let country: Country = this.countries.filter(c => c.countryName === jobSeekerAddress.currentCountry)[0];
            this.addressService.getStates(country.countryCode).subscribe(
              res => {
                if (!res.error && res.code == 200) {
                  this.states = res.data
                  let state: State = this.states.filter(s => s.stateName === jobSeekerAddress.currentState)[0];
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
      }
    )
  }

  onStates(country: Country) {
    this.jobSeekerBasicDetailsForm.controls['currentCity'].setValue(null)
    this.addressService.getStates(country.countryCode).subscribe(
      res => {
        if (!res.error && res.code == 200) {
          this.states = res.data
          this.jobSeekerBasicDetailsForm.controls['currentCity'].enable()
          this.cities = [];

        }
      }
    )
  }

  onCities(state: State) {
    this.addressService.getCities(state.stateCode).subscribe(
      res => {
        if (!res.error && res.code == 200) {
          this.cities = res.data
        }
      }
    )
  }

  onClickClose() {
    this.dialogRef.close();
  }

  onSave() {
    let dob: string = this.jobSeekerBasicDetailsForm.controls['dob'].value
    if (this.jobSeekerBasicDetailsForm.valid) {
      if(dob != 'Invalid Date')
      {
        this.showButton = false
        this.isDob = false
        let empSalary = new EmploymentSalary();
        empSalary.currency = this.jobSeekerBasicDetailsForm.controls['INR'].value
        empSalary.salary = this.jobSeekerBasicDetailsForm.controls['salary'].value
        empSalary.salaryType = this.jobSeekerBasicDetailsForm.controls['salaryType'].value
  
        let experince = new Experience();
        experince.month = this.jobSeekerBasicDetailsForm.controls['totalExpsMonth'].value
        experince.year = this.jobSeekerBasicDetailsForm.controls['totalExpsYear'].value
  
        let jobSeekerAddress = new JobSeekerAddress();
        jobSeekerAddress.currentCountry = this.jobSeekerBasicDetailsForm.controls['currentCountry'].value
        jobSeekerAddress.currentState = this.jobSeekerBasicDetailsForm.controls['currentState'].value
        jobSeekerAddress.currentCity = this.jobSeekerBasicDetailsForm.controls['currentCity'].value
  
        let jobSeeker: JobSeeker = this.jobSeekerBasicDetailsForm.value
        jobSeeker.dob = this.jobSeekerBasicDetailsForm.controls['dob'].value
        jobSeeker.totalExperience = experince
        jobSeeker.currentSalary = empSalary
        jobSeeker.jobSeekerAddress = jobSeekerAddress
        this.jobSeekerService.updateBasicProfileInfo(jobSeeker).subscribe(
          res => {
            this.dialogRef.close();
            this.snackBar.open('Basic Profile Details Updated');
  
            this.router.navigateByUrl('', { skipLocationChange: true }).then(() =>
              this.router.navigate(['job-seeker', this.uuid, 'job-seeker-display']));
          },
          err => {
            if (err.error.errorCode == 400) {
              this.jobSeekerBasicDetailsForm.controls['fullName'].setErrors({
                'cannotbeblank': true
              })
              this.showButton = true
  
            }
            else {
              this.showButton = true
            }
  
  
          }
        )
      }
      else{
        this.isDob = true
      }
      
    }
    else {  
    }
  }
}
