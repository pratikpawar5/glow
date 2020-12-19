import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { IndustrialAreaDto, IndustrialJobRoleDto, EmploymentSalary, CareerProfile } from '@models/jobs';
import { JobSeekerService } from 'app/job-seeker/job-seekers-services/job-seeker.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { SnackBarService } from '@services/common/snack-bar.service';
import { State } from '@models/sme';
import { AddressService } from '@services/common/address.service';
import { TokenService } from '@services/token/token.service';

export interface Salary {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-create-career-desired-dialog',
  templateUrl: './create-career-desired-dialog.component.html',
  styleUrls: ['./create-career-desired-dialog.component.css']
})
export class CreateCareerDesiredDialogComponent implements OnInit {

  
  createCareerDesiredProfileForm: FormGroup
  salaryName: Salary[] = [
    { value: 'YEAR', viewValue: 'Annually' },
    { value: 'MONTH', viewValue: 'Monthly ' },
    { value: 'DAY', viewValue: 'Day' },
  ];
  industrialAreaDto: IndustrialAreaDto
  industrialJobRoleDto: IndustrialJobRoleDto
  jobTypesFormArray: any
  jType: Array<string>
  indianRupees = "INR"

  prefferedShiftRadioButton = 'DAY'

  jobType = [{ type: "Permanent" }, { type: "Contractual" },{type:'Temporary'},{type:'Volunteer'},{type:'Walk In'}]

  employmentType = [{ empType: "Full Time" }, { empType: "Part Time" }, { empType: "Internship" }]


  states: Array<State>

  showButton: boolean = true
  uuid:string
  constructor(private formBuilder: FormBuilder, private snackBar: SnackBarService, private jobSeekerService: JobSeekerService, private router: Router,
    private createCareerDesiredProfile: MatDialogRef<CreateCareerDesiredDialogComponent>,private token:TokenService, private addressService: AddressService) { }

  ngOnInit() {
    this.getStates();
    this.uuid=this.token.getUserId();
    this.createCareerDesiredProfileForm = this.formBuilder.group({
      jobTypes: this.formBuilder.array([]),

      employmentTypes: this.formBuilder.array([]),

      preferredShift: new FormControl(null),

      currency: new FormControl(null),

      prefferedJobLocations: new FormControl(null, Validators.required),

      salary: new FormControl(null, [Validators.pattern('[0-9]+'), Validators.maxLength(10)]),

      salaryType: new FormControl(this.salaryName[0].value),

      functionalAreaUuid: new FormControl(null, Validators.required),

      functionalJobRoleUuid: new FormControl(null, Validators.required)
    })
    this.onGetFunctionalArea();

    this.createCareerDesiredProfileForm.controls['functionalAreaUuid'].valueChanges.subscribe(
      areaUuid => {
        if (areaUuid != undefined) {
          this.onGetIndustrialJobRoles(areaUuid)
        }
        this.industrialJobRoleDto = undefined;
        this.createCareerDesiredProfileForm.controls['functionalJobRoleUuid'].setValue(null)
      }
    )
    this.createCareerDesiredProfileForm.controls['functionalJobRoleUuid'].disable()

  }
  getStates() {
    this.addressService.getStatesForJobs().subscribe(
      res => {
        this.states = res.data
      }
    )
  }

  onGetFunctionalArea() {
    this.jobSeekerService.getIndustrialAreas().subscribe(
      res => {
        if (!res.error && res.code == 200) {
          this.industrialAreaDto = res.data
        }
      }
    )
  }

  onGetIndustrialJobRoles(industrialAreaId) {
    this.jobSeekerService.getIndustrialJobRoles(industrialAreaId).subscribe(
      res => {
        if (!res.error && res.code == 200) {
          this.industrialJobRoleDto = res.data
          this.createCareerDesiredProfileForm.controls['functionalJobRoleUuid'].enable()

        }
      }
    )
  }
  onChangeJobType(type: string, matCheckboxChange: MatCheckboxChange) {
    this.jobTypesFormArray = <FormArray>this.createCareerDesiredProfileForm.controls.jobTypes;
    if (matCheckboxChange.checked) {
      this.jobTypesFormArray.push(new FormControl(type));

    } else {
      let index = this.jobTypesFormArray.controls.findIndex(x => x.value == type)
      this.jobTypesFormArray.removeAt(index);
    }
  }
  onChangeEmpType(empType: string, matCheckboxChange: MatCheckboxChange) {
    const empTypesFormArray = <FormArray>this.createCareerDesiredProfileForm.controls.employmentTypes;

    if (matCheckboxChange.checked) {
      empTypesFormArray.push(new FormControl(empType));
    } else {
      let index = empTypesFormArray.controls.findIndex(x => x.value == empType)
      empTypesFormArray.removeAt(index);
    }
  }
  onClickSalaryType() {
    this.createCareerDesiredProfileForm.controls['salary'].setValue(null)
  }
  onCareerDetailsSave() {
    if (this.createCareerDesiredProfileForm.valid) {
      this.showButton = false

      let careerInfo: CareerProfile = this.createCareerDesiredProfileForm.value

      let empSalary = new EmploymentSalary()

      empSalary.salary = this.createCareerDesiredProfileForm.controls['salary'].value

      empSalary.salaryType = this.createCareerDesiredProfileForm.controls['salaryType'].value

      empSalary.currency = this.createCareerDesiredProfileForm.controls['currency'].value

      let industrialJobRole = new IndustrialJobRoleDto();

      industrialJobRole.jobRoleUuid = this.createCareerDesiredProfileForm.controls["functionalJobRoleUuid"].value

      careerInfo.jobRole = industrialJobRole

      const finalJobTypes = this.createCareerDesiredProfileForm.value.jobTypes.map((v, i) => v != undefined ? v : null
      ).filter(v => v !== null);

      const finalEmploymentTypes = this.createCareerDesiredProfileForm.value.employmentTypes.map((v, i) => v != undefined ? v : null
      ).filter(v => v !== null);

      careerInfo.jobTypes = finalJobTypes;

      careerInfo.employmentTypes = finalEmploymentTypes

      careerInfo.expectedSalary = empSalary

      this.jobSeekerService.postCareerDesiredProfile(careerInfo).subscribe(
        res => {
          this.createCareerDesiredProfile.close();
          this.snackBar.open('Career Profile Details Updated');
        

            this.router.navigateByUrl('', { skipLocationChange: true }).then(() =>
            this.router.navigate(['job-seeker', this.uuid, 'job-seeker-display']));
        }, err => {
          this.showButton = true
        }
      )
    }

  }
  onClickClose() {
    this.createCareerDesiredProfile.close();
  }


}
