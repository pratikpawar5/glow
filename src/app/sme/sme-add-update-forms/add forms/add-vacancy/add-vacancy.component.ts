import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { SpecializationDto, IndustrialAreaDto, IndustrialJobRoleDto, CourseCategoryDto, CourseDto, VacancyDetail, JobPost, VacancyOtherCategory } from '@models/jobs';
import { State } from '@models/sme';
import { MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { FormControl, Validators, FormBuilder, FormGroup, FormArray, AbstractControl, ValidatorFn } from '@angular/forms';
import { PageTitleService } from '@services/page-title/page-title.service';
import { TokenService } from '@services/token/token.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { JobPostService } from '@services/job-post/job-post.service';
import { Router } from '@angular/router';
import { LoginService } from 'app/auth/auth-services/login.service';
import { SpecializationDialogComponent } from './specialization-dialog/specialization-dialog.component';
import { AddressService } from '@services/common/address.service';
import { CreditType, SelectedCreditType, CreditErrorCode } from '@models/pricing';
import { PricingService } from '@services/pricing/pricing.service';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { NoCreditsLeftComponent } from 'app/shared/components/no-credits-left/no-credits-left.component';
import { BuyCreditsComponent } from 'app/shared/components/buy-credits/buy-credits.component';
import { PreviewVacancyComponent } from './preview-vacancy/preview-vacancy.component';
import { LazySmeModuleService } from 'app/sme/http-service/lazy-sme-module.service';
import { SnackBarService } from '@services/common/snack-bar.service';
import { SelectItem } from 'primeng/components/common/selectitem';
declare var ga: Function;
export interface Salary {
  value: string;
  viewValue: string;
}
interface City {
  name: string,
  code: string
}
@Component({
  selector: 'app-add-vacancy',
  templateUrl: './add-vacancy.component.html',
  styleUrls: ['./add-vacancy.component.css']
})
export class AddVacancyComponent implements OnInit {

  cities1: SelectItem[];

  cities2: City[];

  selectedCities1: City[];

  selectedCities2: City[];

  errorTrue: boolean

  jobPostForm: FormGroup;

  smeId: string

  businessPost: boolean = false

  businessPostCredit: boolean = false

  disabled: boolean = false

  disableFlag = false

  isSelected: boolean = false

  isSelectedBIPost: boolean = false

  emailPattern = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
    + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";

  minDate = new Date();

  maxDate = new Date();

  currentDate = new Date();

  showButton: boolean = true

  /*NEW ADD*/
  jobType = [{ type: "Permanent" }, { type: "Contractual" }, { type: "Temporary" }, { type: "Volunteer" }, { type: "Walk-In" }]

  employmentType = [{ empType: "Full Time" }, { empType: "Part Time" }, { empType: "Internship" }]

  prefferedShiftRadioButton = 'DAY'

  industrialAreaDto: IndustrialAreaDto

  industrialJobRoleDto: IndustrialJobRoleDto

  suggestCourseCategoryDto: CourseCategoryDto

  suggestedCourse: CourseDto

  suggestSpecialization: SpecializationDto

  jobTypesFormArray: any

  states: Array<State>

  selectedCourse = new Array();

  specializationDialogDialogRef: MatDialogRef<SpecializationDialogComponent>;


  specializationMap = new Map<string, Array<SpecializationDto>>()

  salaryName: Salary[] = [
    { value: 'MONTHLY', viewValue: 'Monthly' },
  ];

  /* Key skills*/

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  skillSets = new Array<string>();

  /*Experience*/
  maxExpSelected: string

  requiredDocuments: Array<string> = ['Address Proof', 'Aadhar Card', 'Passport', 'Police Verification', 'Driver Licenece', 'Updated Resume'];

  vacancyPreview: MatDialogRef<PreviewVacancyComponent>;

  /*Cutom*/
  customCategory: string = "custom";
  newCategory: boolean
  newSubCategory: boolean

  /*New Salary*/

  minSalary: number

  maxSalary: number

  salaryError: boolean

  /*New Experience  */
  minExp: number

  maxExp: number

  experienceError: boolean

  businessPostKey = "businessPost";
  getUserDetail = "getUserDetail";

  searchCategory = new FormControl();

  constructor(private pageTitleService: PageTitleService, private pricing: PricingService,
    private dialog: DialogService, private addressService: AddressService,
    private jobsService: JobPostService, private loginService: LoginService, private token: TokenService,
    private matDialog: MatDialog, private formBuilder: FormBuilder, private snackbar: SnackBarService, private router: Router, private jobPostService: LazySmeModuleService) {
    ga('set', 'page', router.url);
    ga('send', 'pageview');
    this.cities1 = [
      { label: 'New Yor', value: 'sa' },
      { label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } },
      { label: 'London', value: { id: 3, name: 'London', code: 'LDN' } },
      { label: 'Istanbul', value: { id: 4, name: 'Istanbul', code: 'IST' } },
      { label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } }
    ];
  }

  ngOnInit() {

    this.searchCategory.valueChanges.subscribe(res => {
    })
    this.getStates();

    this.getCourses();

    this.pageTitleService.updateTitle('Add Job')

    this.currentDate.getDate();
    this.minDate = this.currentDate;
    this.maxDate.setDate(this.currentDate.getDate() + 180);
    this.smeId = this.token.getSmeId()
    this.jobPostForm = this.formBuilder.group({
      functionalAreaUuid: new FormControl(null, Validators.required),

      functionalJobRoleUuid: new FormControl(null, Validators.required),

      smeUuid: new FormControl(this.smeId),

      vacancyTitle: new FormControl(null, [Validators.required, Validators.maxLength(100), Validators.minLength(3)]),

      noOfVacancy: new FormControl(null, [Validators.pattern('[0-9]+'), Validators.min(1), Validators.required]),

      minExp: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(30)]),

      maxExp: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(30)]),

      minSalary: new FormControl(null, [Validators.min(1000), Validators.max(400000)]),

      maxSalary: new FormControl(null, [Validators.min(1000), Validators.max(400000)]),

      salaryType: new FormControl(this.salaryName[0].value),

      locations: new FormControl(null, Validators.required),

      jobRole: new FormControl(null, [Validators.maxLength(30), Validators.minLength(1)]),

      contactEmail: new FormControl(null, [Validators.pattern(this.emailPattern), Validators.required]),

      contactMobileNumber: new FormControl(null, [Validators.required, Validators.pattern('[0-9]+')]),

      longDescription: new FormControl(null, [Validators.maxLength(1000), Validators.minLength(20)]),

      shortDescription: new FormControl(null, [Validators.required, Validators.maxLength(200), Validators.minLength(20)]),

      lastApplyDate: new FormControl(null,Validators.required),

      businessPost: new FormControl(false),

      courseCategoryId: new FormControl(null, Validators.required),

      courseId: new FormControl(null),

      specializationId: new FormControl(null),

      jobTypes: this.formBuilder.array([]),

      employmentTypes: this.formBuilder.array([]),

      preferredShift: new FormControl(null),

      requiredDocuments: new FormControl(),

      customFunctionalAreaUuid: new FormControl(null, [Validators.maxLength(100)]),

      customFunctionalJobRoleUuid: new FormControl(null, [Validators.maxLength(100)]),

      myControl: new FormControl(null)
    })

    this.jobPostForm.controls['salaryType'].disable();
    this.onGetFunctionalArea();

    this.jobPostForm.controls['functionalAreaUuid'].valueChanges.subscribe(
      areaUuid => {
        if (areaUuid && areaUuid !== this.customCategory) {
          this.onGetIndustrialJobRoles(areaUuid)
          this.industrialJobRoleDto = undefined;
          this.jobPostForm.controls['functionalJobRoleUuid'].setValue(null)
          this.jobPostForm.controls['customFunctionalAreaUuid'].setValue(null)
          this.jobPostForm.controls['customFunctionalJobRoleUuid'].setValue(null)
          this.newCategory = false
          this.newSubCategory = false
        }
        else {
          this.jobPostForm.controls['functionalJobRoleUuid'].setValue(null)
          this.jobPostForm.controls['functionalJobRoleUuid'].disable()
          this.newSubCategory = false
          this.newCategory = true
        }
      }
    )

    this.jobPostForm.controls['functionalJobRoleUuid'].valueChanges.subscribe(
      jobRoleUuid => {
        if (jobRoleUuid === this.customCategory) {
          this.jobPostForm.controls['customFunctionalAreaUuid'].setValue(null)
          this.newSubCategory = true
        }
        else {
          this.newSubCategory = false
          this.newCategory = false
        }
      }
    )

    this.jobPostForm.controls['courseCategoryId'].valueChanges.subscribe(
      res => {
        this.selectedCourse = [];
        this.selectedCourse.push(...res);
      }
    )
    this.jobPostForm.controls['functionalJobRoleUuid'].disable()

  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.skillSets.push(value);
    }
    if (input) {
      input.value = '';
    }
  }

  remove(skill): void {
    const index = this.skillSets.indexOf(skill);
    if (index >= 0) {
      this.skillSets.splice(index, 1);
    }
  }

  onClickRemoveCourse(courseId: string, index) {
    this.selectedCourse.splice(index, 1)
    this.specializationMap.delete(courseId)
    let courses: Array<CourseDto> = this.jobPostForm.controls['courseCategoryId'].value
    courses = courses.filter(c => c.courseId != courseId)
    this.jobPostForm.controls['courseCategoryId'].setValue(courses)
  }

  onClickRemoveSpec(key: string, index) {
    const specsDto: Array<SpecializationDto> = this.specializationMap.get(key);
    specsDto.splice(index, 1)
  }

  onClickChooseSpecialization(selectCourse: CourseDto) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = false;
    dialogConfig.width = '600px';
    dialogConfig.height = '500px';

    let specs: Array<SpecializationDto> = this.specializationMap.get(selectCourse.courseId);

    dialogConfig.data = { selectC: selectCourse, spec: specs };

    this.specializationDialogDialogRef = this.matDialog.open(SpecializationDialogComponent, dialogConfig);

    this.specializationDialogDialogRef.afterClosed().subscribe(
      res => {
        if (res != null && res.size > 0) {
          res.forEach((v, k) => {
            this.specializationMap.set(k, v);
          });
        }
        else {
          this.specializationMap = undefined
        }
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

  getCities() {
    this.addressService.getCitiesInVacancy().subscribe(
      res => {
      }
    )
  }

  getCourses() {
    this.jobsService.getcourse2().subscribe(
      res => {
        this.suggestCourseCategoryDto = res.data
      }
    )
  }

  onGetFunctionalArea() {
    this.jobsService.getIndustrialAreas().subscribe(
      res => {
        if (!res.error && res.code == 200) {
          this.industrialAreaDto = res.data
        }
      }
    )
  }

  onGetIndustrialJobRoles(industrialAreaId) {
    this.jobsService.getIndustrialJobRoles(industrialAreaId).subscribe(
      res => {
        if (!res.error && res.code == 200) {
          this.industrialJobRoleDto = res.data
          this.jobPostForm.controls['functionalJobRoleUuid'].enable()

        }
      }
    )
  }

  onChangeJobType(type: string, matCheckboxChange: MatCheckboxChange) {

    this.jobTypesFormArray = <FormArray>this.jobPostForm.controls.jobTypes;

    if (matCheckboxChange.checked) {
      this.jobTypesFormArray.push(new FormControl(type));
    }
    else {
      let index = this.jobTypesFormArray.controls.findIndex(x => x.value == type)
      this.jobTypesFormArray.removeAt(index);
    }
  }

  onChangeEmpType(empType: string, matCheckboxChange: MatCheckboxChange) {
    const empTypesFormArray = <FormArray>this.jobPostForm.controls.employmentTypes;

    if (matCheckboxChange.checked) {
      empTypesFormArray.push(new FormControl(empType));

    } else {
      let index = empTypesFormArray.controls.findIndex(x => x.value == empType)
      empTypesFormArray.removeAt(index);
    }
  }

  onAnyMinExperience(event) {
    this.jobPostForm.controls['minExp'].valueChanges.subscribe(
      res => {
        this.jobPostForm.controls['maxExp'].setValue(null)
        this.minExp = res
      }
    )
  }

  onAnyMaxExperience(event) {
    this.jobPostForm.controls['maxExp'].valueChanges.subscribe(
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
  onAnyMinKeyDown(event) {
    this.jobPostForm.controls['minSalary'].valueChanges.subscribe(
      res => {
        this.jobPostForm.controls['maxSalary'].setValue(null)
        this.minSalary = res
      }
    )
  }

  onAnyMaxKeyDown(event) {
    this.jobPostForm.controls['maxSalary'].valueChanges.subscribe(
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

  onKeydownSpace(event, location: string) {
    if (event.keyCode === 32) {
      if (location === 'getUserDetail') {
        this.getExistingMobileAndEmail();
        return true
      }
      else if (location === 'businessPost') {
        this.onBusinessPostCheckbox();
      }
      else {

      }
    }
  }


  onKeydown(event) {
    return !(event.keyCode === 32)
  }

  onBusinessPostCheckbox() {
    if (!this.jobPostForm.controls['businessPost'].value) {
      this.pricing.checkCredits(CreditType.BUSINESS_POST).subscribe(

        res => {

          if (res.error) {
            if (res.errorResponse && res.code === 402) {
              let selectedCreditType: SelectedCreditType = {
                creditType: CreditType.BUSINESS_POST,
                displayName: res.errorResponse.typeDisplayName
              }
              let ref = this.matDialog.open(NoCreditsLeftComponent, this.dialog.getNoCreditsDialogConfig(selectedCreditType))
              ref.afterClosed().subscribe(
                res => {
                  if (res) {
                    let ref = this.matDialog.open(BuyCreditsComponent, this.dialog.getBuyCreditsDialogConfig(selectedCreditType))
                    ref.afterClosed().subscribe(
                      res => {
                        if (res) {
                          this.jobPostForm.controls['businessPost'].setValue(true)
                        }
                        else {
                          this.jobPostForm.controls['businessPost'].setValue(false)
                        }
                      }
                    )
                  } else {
                    this.jobPostForm.controls['businessPost'].setValue(false)
                  }
                }
              )

            }
          } else {
            return true;
          }
        }
      )
    }
  }

  getExistingMobileAndEmail() {
    let uuid = this.token.getUserId();
    this.loginService.getUserVo(uuid).subscribe(
      res => {

        if (res.data.userMobile != null) {
          this.jobPostForm.patchValue({
            contactMobileNumber: res.data.userMobile,
          });

        } else {
          this.jobPostForm.controls['contactMobileNumber'].setErrors({
            'mobileNotAvailable': true
          })
        }
        if (res.data.userEmail != null) {
          this.jobPostForm.patchValue({
            contactEmail: res.data.userEmail,
          });
        } else {
          this.jobPostForm.controls['contactEmail'].setErrors({
            'emailNotAvailable': true
          })
        }
        this.disableFlag = true
        this.isSelected = true

      }
    )
  }

  ageRangeValidator({ min, max }: { min: number; max: number; }): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value !== undefined && (isNaN(control.value) || control.value < min || control.value > max)) {
        return { 'ageRange': true }
      }
      return null;
    };
  }
  // onClickPreview() {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = true
  //   dialogConfig.autoFocus = false;
  //   dialogConfig.width = '900px';
  //   dialogConfig.height = '800px';
  //   dialogConfig.data = jobPost
  //   this.vacancyPreview = this.matDialog.open(PreviewVacancyComponent, dialogConfig);
  //   this.vacancyPreview.afterClosed().subscribe(
  //     res => {

  //     }
  //   )
  // }
  onSubmit() {

    if (this.jobPostForm.valid) {
      this.showButton = false

      let vacancyDetail = new VacancyDetail();
      vacancyDetail.longDescription = this.jobPostForm.controls['longDescription'].value;
      vacancyDetail.contactMobileNumber = this.jobPostForm.controls['contactMobileNumber'].value;
      vacancyDetail.contactEmail = this.jobPostForm.controls['contactEmail'].value;

      let jobPost = new JobPost();
      jobPost = this.jobPostForm.value;
      jobPost.vacancyDetail = vacancyDetail;

      jobPost.qualificationSpecializations;

      if (this.newCategory || this.newSubCategory) {

        let otherCategory: VacancyOtherCategory = new VacancyOtherCategory()

        otherCategory.customIndustrialArea = this.jobPostForm.controls['customFunctionalAreaUuid'].value;


        otherCategory.customJobRoleUuid = this.jobPostForm.controls['customFunctionalJobRoleUuid'].value;

        if (this.newSubCategory) {
          otherCategory.areaUuid = this.jobPostForm.controls['functionalAreaUuid'].value;
        }

        jobPost.otherCategory = otherCategory;

      } else {
        let industrialJobRole = new IndustrialJobRoleDto();
        industrialJobRole.jobRoleUuid = this.jobPostForm.controls["functionalJobRoleUuid"].value;
        jobPost.jobRole = industrialJobRole;
      }

      if (jobPost.shortDescription != null && jobPost.shortDescription.length <= 0) {
        jobPost.shortDescription = null;
      }


      if (vacancyDetail.longDescription != null && vacancyDetail.longDescription.length <= 0) {
        vacancyDetail.longDescription = null;
      }

      jobPost.lastApplyDate = this.jobPostForm.controls['lastApplyDate'].value;

      jobPost.locations = this.jobPostForm.controls['locations'].value;

      var finalSelectedCourse = this.selectedCourse;

      let specs = new Array<SpecializationDto>();

      for (let v of this.specializationMap.values()) {
        v.forEach(sp => {
          const spec = new SpecializationDto();
          spec.specializationId = sp.specializationId;
          specs.push(spec);
        })

      }
      var finalSelectedCourse = this.selectedCourse.filter((v1) => !this.specializationMap.has(v1.courseId));
      if (specs != null && specs.length > 0) {
        jobPost.qualificationSpecializations = specs;
      }

      if (finalSelectedCourse != null && finalSelectedCourse.length > 0) {
        jobPost.qualificationCourses = finalSelectedCourse;
      }

      jobPost.skillSets = this.skillSets;

      this.jobPostService.postJob(jobPost).subscribe(
        res => {
          if (res.error) {
            if (res.code === 402) {
              this.showButton = true;
              let selectedCreditType: SelectedCreditType;

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
                    let ref = this.matDialog.open(BuyCreditsComponent, this.dialog.getBuyCreditsDialogConfig(selectedCreditType))
                    ref.afterClosed().subscribe(
                      res => {
                        if (res) {
                        }
                      }
                    )
                  }
                }
              )
            }
          }
          else {
            this.snackbar.open('Vacancy Added Successfully !!');
            this.router.navigateByUrl('/my-sme/' + this.smeId + '/jobs');

          }

        },
        err => {
          this.showButton = true;
        }
      )


    }
    else {
      window.scrollTo(0, 0)

    }

  }

}
