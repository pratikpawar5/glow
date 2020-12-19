import { Component, OnInit, Inject } from '@angular/core';
import { FormArray, FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IndustrialJobRoleDto, EmploymentSalary, CareerProfile, IndustrialAreaDto } from '@models/jobs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JobSeekerService } from 'app/job-seeker/job-seekers-services/job-seeker.service';
import { SnackBarService } from '@services/common/snack-bar.service';
import { State } from '@models/sme';
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
  selector: 'app-update-career-desired-dialog',
  templateUrl: './update-career-desired-dialog.component.html',
  styleUrls: ['./update-career-desired-dialog.component.css']
})
export class UpdateCareerDesiredDialogComponent implements OnInit {
  editCareerDesiredProfileForm: FormGroup

  prefferedShift: string

  industrialAreaDto: IndustrialAreaDto

  industrialJobRoleDto: IndustrialJobRoleDto

  labelPosition = 'Indian';

  indianRupees = "INR"

  jType: Array<string>

  salaryName: Salary[] = [
    { value: 'YEAR', viewValue: 'Annually' },
    { value: 'MONTH', viewValue: 'Monthly ' },
    { value: 'DAY', viewValue: 'Daily' },
  ];

  jobTypes = ["Permanent", "Contractual", "Temporary", "Volunteer", "Walk In"]

  employmentTypes = ["Full Time", "Part Time", "Internship"]

  apiResponseEmploymentTypes: Array<string>

  apiResponseJobTypes: Array<string>

  showButton: boolean = true

  states: Array<State>

  uuid: string
  constructor(private formBuilder: FormBuilder, private token: TokenService, private addressService: AddressService, private router: Router, private snackBar: SnackBarService, @Inject(MAT_DIALOG_DATA) public data: any, private jobSeekerService: JobSeekerService, private editCareerDesiredProfile: MatDialogRef<UpdateCareerDesiredDialogComponent>) {
  }
  ngOnInit() {
    this.getStates();
    this.uuid = this.token.getUserId();
    this.editCareerDesiredProfileForm = this.formBuilder.group({

      careerProfileDetailUuid: new FormControl(this.data.careerProfileDetailUuid),

      jobTypes: this.formBuilder.array([]),

      employmentTypes: this.formBuilder.array([]),

      preferredShift: new FormControl(this.data.preferredShift),

      currency: new FormControl(this.data.currency),

      prefferedJobLocations: new FormControl(this.data.prefferedJobLocations),

      salary: new FormControl(this.data.expectedSalary.salary, [Validators.pattern('[0-9]+'), Validators.maxLength(10)]),

      salaryType: new FormControl(this.salaryName[0].value),

      functionalAreaUuid: new FormControl(this.data.jobRole.industrialArea.areaUuid, Validators.required),

      functionalJobRoleUuid: new FormControl(this.data.jobRole.jobRoleUuid, Validators.required)
    });

    this.prefferedShift = this.data.preferredShift

    this.states = this.data.prefferedJobLocations

    this.apiResponseEmploymentTypes = this.data.employmentTypes

    this.apiResponseJobTypes = this.data.jobTypes

    this.addApiEmploymentTypes();

    this.addApiJobTypes();

    this.onGetFunctionalArea();

    this.onGetIndustrialJobRoles(this.data.jobRole.industrialArea.areaUuid)

    this.editCareerDesiredProfileForm.controls['functionalAreaUuid'].valueChanges.subscribe(
      areaUuid => {
        if (areaUuid != undefined) {
          this.onGetIndustrialJobRoles(areaUuid)
        }
        this.industrialJobRoleDto = undefined;
        this.editCareerDesiredProfileForm.controls['functionalJobRoleUuid'].setValue(null)
      }
    )

    this.editCareerDesiredProfileForm.patchValue(
      {
        salaryType: this.data.expectedSalary.salaryType,
      }
    )

  }

  getStates() {
    this.addressService.getStatesForJobs().subscribe(
      res => {
        this.states = res.data
      }
    )
  }

  onClickSalaryType() {
    this.editCareerDesiredProfileForm.controls['salary'].setValue(null)
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
        }
      }
    )
  }
  addApiEmploymentTypes() {
    this.employmentTypes.forEach(o => {
      const control = new FormControl(this.apiResponseEmploymentTypes.indexOf(o) >= 0);
      (this.editCareerDesiredProfileForm.controls.employmentTypes as FormArray).push(control);
    })
  }

  addApiJobTypes() {
    this.jobTypes.forEach(o => {
      const control = new FormControl(this.apiResponseJobTypes.indexOf(o) >= 0);
      (this.editCareerDesiredProfileForm.controls.jobTypes as FormArray).push(control);
    })
  }


  onClickClose() {
    this.editCareerDesiredProfile.close();
  }
  onClickSave() {
    if (this.editCareerDesiredProfileForm.valid) {
      this.showButton = false
      const selectedEmpTypes = this.editCareerDesiredProfileForm.value.employmentTypes
        .map((v, i) => v ? this.employmentTypes[i] : null)
        .filter(v => v !== null);
      const selectedJobTypes = this.editCareerDesiredProfileForm.value.jobTypes
        .map((v, i) => v ? this.jobTypes[i] : null)
        .filter(v => v !== null);

      let careerInfo: CareerProfile = this.editCareerDesiredProfileForm.value

      let empSalary = new EmploymentSalary()

      empSalary.salary = this.editCareerDesiredProfileForm.controls['salary'].value

      empSalary.salaryType = this.editCareerDesiredProfileForm.controls['salaryType'].value

      empSalary.currency = this.editCareerDesiredProfileForm.controls['currency'].value

      let industrialJobRole = new IndustrialJobRoleDto();

      industrialJobRole.jobRoleUuid = this.editCareerDesiredProfileForm.controls["functionalJobRoleUuid"].value

      careerInfo.jobRole = industrialJobRole

      careerInfo.employmentTypes = selectedEmpTypes

      careerInfo.jobTypes = selectedJobTypes

      careerInfo.expectedSalary = empSalary

      this.jobSeekerService.updateCareerDesiredProfile(careerInfo).subscribe(
        res => {
          this.editCareerDesiredProfile.close();
          this.snackBar.open('Career Profile Details Updated');

          this.router.navigateByUrl('', { skipLocationChange: true }).then(() =>
            this.router.navigate(['job-seeker', this.uuid, 'job-seeker-display']));
        }, err => {
          this.showButton = false

        }
      )
    }
  }

  get jobType() {

    return <FormArray>this.editCareerDesiredProfileForm.get('jobTypes');
  }

  get employmentType() {
    return <FormArray>this.editCareerDesiredProfileForm.get('employmentTypes');
  }

}