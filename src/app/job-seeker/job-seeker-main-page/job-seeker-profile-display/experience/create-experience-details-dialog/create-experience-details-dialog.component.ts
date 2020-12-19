import { Component, OnInit } from '@angular/core';
import { IndustrialJobRoleDto, ExperienceDetail, IndustrialAreaDto } from '@models/jobs';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { JobSeekerService } from 'app/job-seeker/job-seekers-services/job-seeker.service';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackBarService } from '@services/common/snack-bar.service';
import { TokenService } from '@services/token/token.service';

@Component({
  selector: 'app-create-experience-details-dialog',
  templateUrl: './create-experience-details-dialog.component.html',
  styleUrls: ['./create-experience-details-dialog.component.css']
})
export class CreateExperienceDetailsDialogComponent implements OnInit {

  experienceCreateForm: FormGroup

  industrialAreaDto: IndustrialAreaDto
  industrialJobRoleDto: IndustrialJobRoleDto
  noticePeriodShow: boolean = true
  endDateShow: boolean = true
  currentlyWorking: boolean = true
  noticePeriod: Array<string> = [
    "within 15 Days",
    "within 1 Month",
    "within 2 Month",
    "within 3 Month",
  ]
  startJobDate = new Date();
  selectedStartDate = new Date();
  maxEndDate = new Date();
  minStartDate = new Date();
  noticePeriodMessage: boolean
  showButton: boolean = true

  startDateRequired: boolean = false
  endDateRequired: boolean = false
  uuid: string
  constructor(private formBuilder: FormBuilder, private token: TokenService, private router: Router, private snackBar: SnackBarService, private jobSeekerService: JobSeekerService, private experienceCreateDialog: MatDialogRef<CreateExperienceDetailsDialogComponent>) {
  }

  ngOnInit() {
    this.uuid = this.token.getUserId();

    this.minStartDate = new Date(1970, 0, 0)

    this.startJobDate.getDate();

    this.endDateShow = false
    this.experienceCreateForm = this.formBuilder.group({

      companyName: new FormControl(null, [Validators.required, Validators.maxLength(200)]),

      description: new FormControl(null, Validators.maxLength(500)),

      startDate: new FormControl(null),

      endDate: new FormControl(null),

      currentlyWorking: new FormControl(null),

      noticePeriod: new FormControl(null, Validators.required),

      functionalAreaUuid: new FormControl(null, Validators.required),

      functionalJobRoleUuid: new FormControl(null, Validators.required)
    })


    this.experienceCreateForm.controls['startDate'].disable();
    this.experienceCreateForm.controls['endDate'].disable()

    this.experienceCreateForm.controls['endDate'].setValue(null)

    this.experienceCreateForm.controls['startDate'].valueChanges.subscribe(
      res => {
        this.startDateRequired = false
        this.experienceCreateForm.controls['endDate'].setValue(null)
        this.selectedStartDate = res
      }
    )
    this.experienceCreateForm.controls['endDate'].valueChanges.subscribe(
      res => {
        this.endDateRequired = false
      }
    )
    this.onGetFunctionalArea();

    this.experienceCreateForm.controls['functionalAreaUuid'].valueChanges.subscribe(
      areaUuid => {
        if (areaUuid != undefined) {
          this.onGetIndustrialJobRoles(areaUuid)
          this.industrialJobRoleDto = undefined;
          this.experienceCreateForm.controls['functionalJobRoleUuid'].setValue(null)
        }
      }
    )
    this.experienceCreateForm.controls['functionalJobRoleUuid'].disable()

  }

  onClickClose() {
    this.experienceCreateDialog.close();
  }

  noRadioButton() {
    this.noticePeriodShow = false
    this.endDateShow = true
    this.experienceCreateForm.controls['noticePeriod'].setValue(null)
    this.experienceCreateForm.get('noticePeriod').clearValidators();
    this.experienceCreateForm.get('noticePeriod').updateValueAndValidity();
  }

  yesRadioButton() {
    this.noticePeriodShow = true
    this.endDateShow = false
    this.experienceCreateForm.controls['endDate'].setValue(null)
  }

  onClickYes(event) {
    if (event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40) {
      this.noRadioButton();
      return true;
    }
  }

  onClickNo(event) {
    if (event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40) {
      this.yesRadioButton();
      return true;
    }
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
          this.experienceCreateForm.controls['functionalJobRoleUuid'].enable()

        }
      }
    )
  }
  onSave() {

    if (this.currentlyWorking == true) {
      let startDate = this.experienceCreateForm.controls['startDate'].value
      if (this.experienceCreateForm.valid) {
        if(startDate != null)
        {
          this.showButton = false
          this.startDateRequired = false
          let exceperienceDetail = new ExperienceDetail()
          exceperienceDetail = this.experienceCreateForm.value
          exceperienceDetail.startDate = this.experienceCreateForm.controls['startDate'].value
  
          exceperienceDetail.endDate = this.experienceCreateForm.controls['endDate'].value
  
          let industrialJobRole = new IndustrialJobRoleDto();
  
          industrialJobRole.jobRoleUuid = this.experienceCreateForm.controls["functionalJobRoleUuid"].value
  
          exceperienceDetail.jobRole = industrialJobRole
  
          this.jobSeekerService.postExperienceDetail(exceperienceDetail).subscribe(
            res => {
              this.experienceCreateDialog.close();
              this.snackBar.open('Experience Details Created');
  
              this.router.navigateByUrl('', { skipLocationChange: true }).then(() =>
                this.router.navigate(['job-seeker', this.uuid, 'job-seeker-display']));
            },
            err => {
              if (err.error.errorCode == 400) {
                this.experienceCreateForm.controls['companyName'].setErrors({
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
          this.startDateRequired = true
        }
      }
      else {
        window.scroll(0,0)
      }
    }

    else {
      let endDate = this.experienceCreateForm.controls['endDate'].value
      let startDate = this.experienceCreateForm.controls['startDate'].value

      if (!this.experienceCreateForm.valid) {

      }
      else if (startDate == null && endDate == null) {
        this.startDateRequired = true
        this.endDateRequired = true
      }
      else if (startDate == null) {
        this.startDateRequired = true
      }
      else if (endDate == null) {
        this.endDateRequired = true
      }

      else {
        this.showButton = false
        this.startDateRequired = false
        this.endDateRequired = false
        let exceperienceDetail = new ExperienceDetail()
        exceperienceDetail = this.experienceCreateForm.value
        exceperienceDetail.startDate = this.experienceCreateForm.controls['startDate'].value

        exceperienceDetail.endDate = this.experienceCreateForm.controls['endDate'].value

        let industrialJobRole = new IndustrialJobRoleDto();

        industrialJobRole.jobRoleUuid = this.experienceCreateForm.controls["functionalJobRoleUuid"].value

        exceperienceDetail.jobRole = industrialJobRole

        this.jobSeekerService.postExperienceDetail(exceperienceDetail).subscribe(
          res => {
            this.experienceCreateDialog.close();
            this.snackBar.open('Experience Details Updated');
            this.router.navigateByUrl('', { skipLocationChange: true }).then(() =>
              this.router.navigate(['job-seeker', this.uuid, 'job-seeker-display']));
          },
          err => {
            if (err.error.errorCode == 400) {
              this.experienceCreateForm.controls['companyName'].setErrors({
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

    }

  }

}
