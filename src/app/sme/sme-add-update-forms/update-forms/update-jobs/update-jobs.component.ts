import { Component, OnInit } from '@angular/core';
import { JobPost, CourseDto, PreferredShift, VacancyDetail } from '@models/jobs';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PageTitleService } from '@services/page-title/page-title.service';
import { JobPostService } from '@services/job-post/job-post.service';
import { MatChipInputEvent, MatDialog } from '@angular/material';
import { TokenService } from '@services/token/token.service';
import { LoginService } from 'app/auth/auth-services/login.service';
import { AddressService } from '@services/common/address.service';
import { State } from '@models/sme';
import { LazySmeModuleService } from 'app/sme/http-service/lazy-sme-module.service';
import { SelectedCreditType, CreditErrorCode, CreditType } from '@models/pricing';
import { NoCreditsLeftComponent } from 'app/shared/components/no-credits-left/no-credits-left.component';
import { BuyCreditsComponent } from 'app/shared/components/buy-credits/buy-credits.component';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { SnackBarService } from '@services/common/snack-bar.service';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
export interface Salary {
  value: string;
  viewValue: string;
}
declare var ga: Function;
@Component({
  selector: 'app-update-jobs',
  templateUrl: './update-jobs.component.html',
  styleUrls: ['./update-jobs.component.css']
})
export class UpdateJobsComponent implements OnInit {

  job: JobPost

  updateJobPostForm: FormGroup

  sUuid: string

  vacancyUuid: string

  salaryName: Salary[] = [
    { value: 'MONTHLY', viewValue: 'Monthly' },
  ];

  emailPattern = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
    + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";

  industrialAreaName: string

  jobRoleName: string

  apiResponseEmploymentTypes: Array<string>

  apiResponseJobTypes: Array<string>

  apiResponseCourseTypes: Array<CourseDto>

  apiSkillSets: Array<string>

  prefferedShift: PreferredShift

  currentDate = new Date();

  minDate = new Date();

  jobTypes = ["Permanent", "Contractual", "Temporary", "Volunteer", "Walk-In"]

  employmentTypes = ["Full Time", "Part Time", "Internship"]

  disableFlag = false

  isSelected: boolean = false

  states: Array<State>

  showButton: boolean = true

  /*New Salary*/

  minSalary: number

  maxSalary: number

  salaryError: boolean

  /*New Experience  */
  minExp: number

  maxExp: number

  experienceError: boolean
  /* Key skills*/

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder, private matDialog: MatDialog, private dialog: DialogService, private router: Router, private snackBar: SnackBarService, private lazyModuleService: LazySmeModuleService, private addressService: AddressService, private pageTitleService: PageTitleService, private token: TokenService, private loginService: LoginService, private jobPostService: JobPostService) {
    ga('set', 'page', router.url);
    ga('send', 'pageview');
  }

  ngOnInit() {
    this.sUuid = this.token.getSmeId();
    this.route.queryParams.subscribe(
      v => {
        let vacancyUuid = v['v']
        if (vacancyUuid != undefined) {
          this.getJobData(vacancyUuid)
        }
      }
    )
    let smeName = localStorage.getItem('smeName');
    if (smeName != null) {
      this.pageTitleService.updateTitle('Update Job | ' + smeName)
    } else {
      this.pageTitleService.updateTitle('Update Job')
    }

    this.updateJobPostForm = this.formBuilder.group({

      smeUuid: new FormControl(this.sUuid),

      vacancyUuid: new FormControl(this.vacancyUuid),

      skillSets: this.formBuilder.array([]),

      jobTypes: this.formBuilder.array([]),

      employmentTypes: this.formBuilder.array([]),

      preferredShift: new FormControl(null),

      vacancyTitle: new FormControl(null, [Validators.required, Validators.maxLength(100), Validators.minLength(3)]),

      noOfVacancy: new FormControl(null, [Validators.pattern('[0-9]+'), Validators.min(1), Validators.required]),

      minExp: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(30)]),

      maxExp: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(30)]),

      minSalary: new FormControl(null, [Validators.min(1000), Validators.max(400000)]),

      maxSalary: new FormControl(null, [Validators.min(1000), Validators.max(400000)]),

      salaryType: new FormControl(this.salaryName[0].value),

      contactEmail: new FormControl(null, [Validators.pattern(this.emailPattern)]),

      contactMobileNumber: new FormControl(null, [Validators.required, Validators.pattern('[0-9]+')]),

      lastApplyDate: new FormControl(null, Validators.required),

      businessPost: new FormControl(null),

      locations: new FormControl(null, Validators.required),

      longDescription: new FormControl(null, [Validators.maxLength(1000), Validators.minLength(20)]),

      shortDescription: new FormControl(null, [Validators.required, Validators.maxLength(200), Validators.minLength(20)]),
    })
    this.updateJobPostForm.controls['lastApplyDate'].disable()
    this.updateJobPostForm.controls['salaryType'].disable()
  }
  getJobData(vacancyUuid) {
    this.jobPostService.getJobByJobUuidforEditMode(vacancyUuid).subscribe(
      res => {
        this.job = res.data
        this.vacancyUuid = res.data.vacancyUuid
        if (res.data.jobRole != null && res.data.otherCategory == null) {
          this.industrialAreaName = res.data.jobRole.industrialArea.industrialAreaName
          this.jobRoleName = res.data.jobRole.jobRole
        }
        else if (res.data.otherCategory != null && res.data.jobRole == null) {
          this.industrialAreaName = res.data.otherCategory.customIndustrialArea
          this.jobRoleName = res.data.otherCategory.customJobRoleUuid
        }
        else {
          this.industrialAreaName = null;
          this.jobRoleName = null;
        }
        this.apiResponseEmploymentTypes = res.data.employmentTypes

        this.apiResponseJobTypes = res.data.jobTypes

        this.apiResponseCourseTypes = res.data.qualificationCourses

        this.apiSkillSets = res.data.skillSets

        this.addApiEmploymentTypes();

        this.addApiJobTypes();

        this.prefferedShift = res.data.preferredShift

        this.getStates();

        this.currentDate.getDate();

        this.minDate = this.currentDate;

        this.updateJobPostForm.patchValue(
          {
            vacancyUuid: res.data.vacancyUuid,

            preferredShift: res.data.preferredShift,

            vacancyTitle: res.data.vacancyTitle,

            noOfVacancy: res.data.noOfVacancy,

            minExp: res.data.minExp,

            maxExp: res.data.maxExp,

            minSalary: res.data.minSalary,

            maxSalary: res.data.maxSalary,

            contactEmail: res.data.vacancyDetail.contactEmail,

            contactMobileNumber: res.data.vacancyDetail.contactMobileNumber,

            // lastApplyDate: new Date(res.lastApplyDate),

            locations: res.data.locations,

            longDescription: res.data.vacancyDetail.longDescription,

            shortDescription: res.data.shortDescription,

          }
        )
        if (res.data.lastApplyDate) {
          this.updateJobPostForm.controls['lastApplyDate'].setValue(new Date(res.data.lastApplyDate))
        }
      }
    )
  }

  /*Min Experience*/
  onAnyMinExperience(event: Event) {
    this.updateJobPostForm.controls['minExp'].valueChanges.subscribe(
      res => {
        this.updateJobPostForm.controls['maxExp'].setValue(null)
        this.minExp = res
      }
    )
  }
  onAnyMouseMinKey(event) {
    this.onAnyMinExperience(event);
  }
  onKeyArrowMinPress(event) {
    if (event.keyCode === 38 || event.keyCode === 39) {
      this.onAnyMinExperience(event);
      return true
    }
  }
  /*Min Experience*/

  /*Max Experience*/
  onAnyMaxExperience(event) {
    this.updateJobPostForm.controls['maxExp'].valueChanges.subscribe(
      res => {
        this.maxExp = res
        if (this.minExp > this.maxExp) {
          this.experienceError = true
        }
        else {
          this.experienceError = false
        }
      }
    )
  }
  
  onAnyMouseMaxKey(event) {
    this.onAnyMaxExperience(event);
  }

  onKeyArrowMaxPress(event) {
    if (event.keyCode === 38 || event.keyCode === 39) {
      this.onAnyMaxExperience(event);
      return true
    }
  }
  /*Max Experience*/


  onAnyMinKeyDown(event) {
    this.updateJobPostForm.controls['minSalary'].valueChanges.subscribe(
      res => {
        this.updateJobPostForm.controls['maxSalary'].setValue(null)
        this.minSalary = res
      }
    )
  }

  onAnyMaxKeyDown(event) {
    this.updateJobPostForm.controls['maxSalary'].valueChanges.subscribe(
      res => {
        this.maxSalary = res
        if (this.minSalary > this.maxSalary) {
          this.salaryError = true
        }
        else {
          this.salaryError = false
        }
      }
    )
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.apiSkillSets.push(value);
    }
    if (input) {
      input.value = '';
    }
  }
  remove(skill): void {
    const index = this.apiSkillSets.indexOf(skill);
    if (index >= 0) {
      this.apiSkillSets.splice(index, 1);
    }
  }
  addApiEmploymentTypes() {
    this.employmentTypes.forEach(o => {
      const control = new FormControl(this.apiResponseEmploymentTypes.indexOf(o) >= 0);
      (this.updateJobPostForm.controls.employmentTypes as FormArray).push(control);
    })
  }

  addApiJobTypes() {
    this.jobTypes.forEach(o => {
      const control = new FormControl(this.apiResponseJobTypes.indexOf(o) >= 0);
      (this.updateJobPostForm.controls.jobTypes as FormArray).push(control);
    })
  }
  addSkillSets() {
    this.apiSkillSets.forEach(s => {
      const control = new FormControl(true);
      (this.updateJobPostForm.controls.skillSets as FormArray).push(control);
    })
  }
  get jobType() {
    return <FormArray>this.updateJobPostForm.get('jobTypes');
  }

  get employmentType() {
    return <FormArray>this.updateJobPostForm.get('employmentTypes');
  }

  getExistingMobileAndEmail() {
    let uuid = this.token.getUserId();
    this.loginService.getUserVo(uuid).subscribe(
      res => {

        if (res.data.userMobile != null) {
          this.updateJobPostForm.patchValue({
            contactMobileNumber: res.data.userMobile,
          });

        } else {
          this.updateJobPostForm.controls['contactMobileNumber'].setErrors({
            'mobileNotAvailable': true
          })
        }
        if (res.data.userEmail != null) {
          this.updateJobPostForm.patchValue({
            contactEmail: res.data.userEmail,
          });
        } else {
          this.updateJobPostForm.controls['contactEmail'].setErrors({
            'emailNotAvailable': true
          })
        }
        this.disableFlag = true
        this.isSelected = true

      }
    )
  }

  onKeydownSpace(event) {
    if (event.keyCode === 32) {
      this.getExistingMobileAndEmail();
      return true
    }
  }

  onKeydown(event) {
    return !(event.keyCode === 32)
  }

  getStates() {
    this.addressService.getStatesForJobs().subscribe(
      res => {
        this.states = res.data
      }
    )
  }
  onUpdate() {
    if (this.updateJobPostForm.valid) {
      this.showButton = false

      const selectedEmpTypes = this.updateJobPostForm.value.employmentTypes
        .map((v, i) => v ? this.employmentTypes[i] : null)
        .filter(v => v !== null);


      const selectedJobTypes = this.updateJobPostForm.value.jobTypes
        .map((v, i) => v ? this.jobTypes[i] : null)
        .filter(v => v !== null);

      let vacancyDetail = new VacancyDetail();
      vacancyDetail.longDescription = this.updateJobPostForm.controls['longDescription'].value
      vacancyDetail.contactMobileNumber = this.updateJobPostForm.controls['contactMobileNumber'].value
      vacancyDetail.contactEmail = this.updateJobPostForm.controls['contactEmail'].value

      let jobPost = new JobPost();

      jobPost = this.updateJobPostForm.value

      jobPost.vacancyDetail = vacancyDetail

      jobPost.jobTypes = selectedJobTypes

      jobPost.employmentTypes = selectedEmpTypes

      if (jobPost.shortDescription != null && jobPost.shortDescription.length <= 0) {
        jobPost.shortDescription = null
      }

      if (vacancyDetail.longDescription != null && vacancyDetail.longDescription.length <= 0) {
        vacancyDetail.longDescription = null
      }

      jobPost.lastApplyDate = this.updateJobPostForm.controls['lastApplyDate'].value

      jobPost.locations = this.updateJobPostForm.controls['locations'].value

      jobPost.skillSets = this.apiSkillSets

      this.lazyModuleService.updateJob(jobPost).subscribe(
        res => {
          if (res.error) {
            if (res.code === 402) {
              this.showButton = true
              let selectedCreditType: SelectedCreditType

              if (res.errorResponse.errorCode === CreditErrorCode.JOB_POSTING) {
                selectedCreditType = {
                  creditType: CreditType.JOB_POSTING,
                  displayName: res.errorResponse.typeDisplayName
                }
              }

              let ref = this.matDialog.open(NoCreditsLeftComponent, this.dialog.getNoCreditsDialogConfig(selectedCreditType))
              ref.afterClosed().subscribe(
                res => {
                  if (res) {
                    this.matDialog.open(BuyCreditsComponent, this.dialog.getBuyCreditsDialogConfig(selectedCreditType))
                  }
                }
              )
            }
          }
          else {
            this.snackBar.open('Vacancy Updated Successfully !!')
            this.router.navigateByUrl('/my-sme/' + this.sUuid + '/jobs');

          }
        },
        err=>
        {
          this.showButton = true;
        }
      )
    }
    else {
      window.scrollTo(0, 0)

    }


  }
}
