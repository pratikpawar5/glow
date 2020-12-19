import { Component, OnInit, Inject } from '@angular/core';
import { ExperienceDetail, IndustrialJobRoleDto, IndustrialAreaDto } from '@models/jobs';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JobSeekerService } from 'app/job-seeker/job-seekers-services/job-seeker.service';
import { SnackBarService } from '@services/common/snack-bar.service';
import { TokenService } from '@services/token/token.service';

@Component({
  selector: 'app-update-experience-details-dialog',
  templateUrl: './update-experience-details-dialog.component.html',
  styleUrls: ['./update-experience-details-dialog.component.css']
})
export class UpdateExperienceDetailsDialogComponent implements OnInit {
  experienceUpdateForm: FormGroup
  industrialAreaDto: IndustrialAreaDto
  industrialJobRoleDto: IndustrialJobRoleDto
  noticePeriodShow: boolean = true
  endDateShow: boolean = true
  currentWorking: string
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
  showButton: boolean = true
  startDateRequired: boolean = false
  endDateRequired: boolean = false
  uuid:string
  constructor(private formBuilder: FormBuilder,private token:TokenService, private router: Router, private snackBar: SnackBarService, @Inject(MAT_DIALOG_DATA) public data: any, private jobPostingService: JobSeekerService, private experienceUpdateDialog: MatDialogRef<UpdateExperienceDetailsDialogComponent>) {
  }
  ngOnInit() {
    this.startJobDate.getDate();
    this.minStartDate = new Date(1970, 0, 0)
    this.uuid=this.token.getUserId();


    this.currentWorking = this.data.currentlyWorking

    if (this.data.startDate) {
      this.startDateRequired = false
    }
    this.experienceUpdateForm = this.formBuilder.group({

      experienceDetailUuid: new FormControl(this.data.experienceDetailUuid),

      companyName: new FormControl(this.data.companyName, [Validators.required, Validators.maxLength(200)]),

      description: new FormControl(this.data.description, Validators.maxLength(500)),

      startDate: new FormControl(new Date(this.data.startDate), Validators.required),

      endDate: new FormControl(new Date(this.data.endDate)),

      currentlyWorking: new FormControl(this.data.currentlyWorking),

      noticePeriod: new FormControl(this.data.noticePeriod),

      functionalAreaUuid: new FormControl(this.data.jobRole.industrialArea.areaUuid, Validators.required),

      functionalJobRoleUuid: new FormControl(this.data.jobRole.jobRoleUuid, Validators.required)
    })
    this.experienceUpdateForm.controls['startDate'].disable()
    this.experienceUpdateForm.controls['endDate'].disable()

    this.selectedStartDate = new Date(this.data.startDate)

    this.experienceUpdateForm.controls['startDate'].valueChanges.subscribe(
      res => {
        this.startDateRequired = false
        this.experienceUpdateForm.controls['endDate'].setValue(null)
        this.selectedStartDate = res
      }
    )
    this.experienceUpdateForm.controls['endDate'].valueChanges.subscribe(
      res => {
        this.endDateRequired = false
        this.startDateRequired = false

      }
    )
    if (this.data.currentlyWorking) {
      this.noticePeriodShow = true
      this.endDateShow = false
      this.experienceUpdateForm.controls['endDate'].setValue(null)
    }
    else {
      this.noticePeriodShow = false
      this.endDateShow = true
    }
    this.onGetFunctionalArea();
    this.onGetIndustrialJobRoles(this.data.jobRole.industrialArea.areaUuid)

    this.experienceUpdateForm.controls['functionalAreaUuid'].valueChanges.subscribe(
      areaUuid => {
        if (areaUuid != undefined) {
          this.onGetIndustrialJobRoles(areaUuid)
        }
        this.industrialJobRoleDto = undefined;
        this.experienceUpdateForm.controls['functionalJobRoleUuid'].setValue(null)
      }
    )
  }
  onClickClose() {
    this.experienceUpdateDialog.close();
  }
  noRadioButton() {
    this.noticePeriodShow = false
    this.endDateShow = true
    this.experienceUpdateForm.controls['noticePeriod'].setValue(null)
    this.experienceUpdateForm.get('noticePeriod').clearValidators();
    this.experienceUpdateForm.get('noticePeriod').updateValueAndValidity();

  }
  yesRadioButton() {
    this.noticePeriodShow = true
    this.endDateShow = false
    this.experienceUpdateForm.controls['endDate'].setValue(null)

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
    this.jobPostingService.getIndustrialAreas().subscribe(
      res => {
        if (!res.error && res.code == 200) {
          this.industrialAreaDto = res.data

        }
      }
    )
  }
  onGetIndustrialJobRoles(industrialAreaId) {
    this.jobPostingService.getIndustrialJobRoles(industrialAreaId).subscribe(
      res => {
        if (!res.error && res.code == 200) {
          this.industrialJobRoleDto = res.data
        }
      }
    )
  }
  onSave() {
    if (this.currentWorking) {
      let startDate = this.experienceUpdateForm.controls['startDate'].value

      if (this.experienceUpdateForm.valid && startDate != null) {
        this.showButton = false
        this.startDateRequired = false
        let experienceDetail = new ExperienceDetail()
        experienceDetail = this.experienceUpdateForm.value

        experienceDetail.startDate = this.experienceUpdateForm.controls['startDate'].value
        experienceDetail.endDate = this.experienceUpdateForm.controls['endDate'].value

        let industrialJobRole = new IndustrialJobRoleDto();

        industrialJobRole.jobRoleUuid = this.experienceUpdateForm.controls["functionalJobRoleUuid"].value

        experienceDetail.jobRole = industrialJobRole

        this.jobPostingService.updateExperienceDetail(experienceDetail).subscribe(
          res => {
            this.experienceUpdateDialog.close();
            this.snackBar.open('Experience Details Updated');

            this.router.navigateByUrl('', { skipLocationChange: true }).then(() =>
            this.router.navigate(['job-seeker', this.uuid, 'job-seeker-display']));
          },
          err => {
            if (err.error.errorCode == 400) {
              this.experienceUpdateForm.controls['companyName'].setErrors({
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
      else {
      }
    }

    else {

      let endDate = this.experienceUpdateForm.controls['endDate'].value
      let startDate = this.experienceUpdateForm.controls['startDate'].value

      if (this.experienceUpdateForm.valid && endDate != null && startDate != null) {
        this.showButton = false
        this.startDateRequired = false
        this.endDateRequired = false
        let experienceDetail = new ExperienceDetail()
        experienceDetail = this.experienceUpdateForm.value

        experienceDetail.startDate = this.experienceUpdateForm.controls['startDate'].value
        experienceDetail.endDate = this.experienceUpdateForm.controls['endDate'].value

        let industrialJobRole = new IndustrialJobRoleDto();

        industrialJobRole.jobRoleUuid = this.experienceUpdateForm.controls["functionalJobRoleUuid"].value

        experienceDetail.jobRole = industrialJobRole

        this.jobPostingService.updateExperienceDetail(experienceDetail).subscribe(
          res => {
            this.experienceUpdateDialog.close();
            this.snackBar.open('Experience Details Updated');
            this.router.navigateByUrl('', { skipLocationChange: true }).then(() =>
            this.router.navigate(['job-seeker', this.uuid, 'job-seeker-display']));


          },
          err => {
            if (err.error.errorCode == 400) {
              this.experienceUpdateForm.controls['companyName'].setErrors({
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
      else {
        this.endDateRequired = true
      }
    }


  }

}
