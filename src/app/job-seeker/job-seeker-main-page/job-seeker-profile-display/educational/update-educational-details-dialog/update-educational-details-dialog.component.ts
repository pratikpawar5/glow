import { Component, OnInit, Inject } from '@angular/core';
import { State } from '@models/sme';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SpecializationDto, CourseDto, CourseCategoryDto, JobSeeker, EducationalDetail } from '@models/jobs';
import { Router } from '@angular/router';
import { JobSeekerService } from 'app/job-seeker/job-seekers-services/job-seeker.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackBarService } from '@services/common/snack-bar.service';
import { TokenService } from '@services/token/token.service';

@Component({
  selector: 'app-update-educational-details-dialog',
  templateUrl: './update-educational-details-dialog.component.html',
  styleUrls: ['./update-educational-details-dialog.component.css']
})
export class UpdateEducationalDetailsDialogComponent implements OnInit {

  jobSeeker: JobSeeker

  suggestCourseCategoryDto: CourseCategoryDto
  existCourseCategoryDto: CourseCategoryDto

  suggestedCourse: CourseDto
  existCourse: CourseDto

  suggestSpecialization: SpecializationDto
  existspecializationDto: SpecializationDto

  educationalUpdateForm: FormGroup

  passingOutYears: Array<number> = [
    2019,
    2018,
    2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006,
    2005, 2004, 2003, 2002, 2001, 2000, 1999, 1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990, 1989, 1988,
    1987, 1986, 1985, 1984, 1983, 1982, 1981, 1980
  ]
  states: Array<State>

  isSpecializationEnable: boolean

  showButton: boolean = true
  uuid:string
  constructor(private formBuilder: FormBuilder, private token:TokenService,private router: Router,private snackBar: SnackBarService, private jobSeekerService: JobSeekerService, @Inject(MAT_DIALOG_DATA) public data: any, private educationalUpdateDialog: MatDialogRef<UpdateEducationalDetailsDialogComponent>) {
  }
  ngOnInit() {
    this.uuid=this.token.getUserId();
    this.existCourse = this.data.qualificationCourse
    this.existspecializationDto = this.data.qualificationSpecialization

    this.educationalUpdateForm = this.formBuilder.group({

      educationalDetailUuid: new FormControl(this.data.educationalDetailUuid),

      courseId: new FormControl(this.existCourse.courseId, Validators.required),

      specializationId: new FormControl(null),

      universityName: new FormControl(this.data.universityName,[Validators.required, Validators.pattern('[a-zA-Z ]*$'), Validators.maxLength(150)]),

      instituteName: new FormControl(this.data.instituteName, [Validators.required, Validators.pattern('[a-zA-Z ]*$'), Validators.maxLength(150)]),

      percentage: new FormControl(this.data.percentage, [Validators.required, Validators.pattern('^[0-9.]*$'), Validators.min(1), Validators.max(100)]),

      passingOutYear: new FormControl(this.data.passingOutYear, Validators.required),

    })


    this.getCourses();

    this.checkSpecialization();

    this.getSpecialization(this.existCourse)
    
  }
  checkSpecialization() {
    if (this.existspecializationDto) {
      this.isSpecializationEnable = true

      this.educationalUpdateForm.patchValue(
        {
          specializationId: this.existspecializationDto.specializationId,
        }
      )
    }
  }

  onClickClose() {
    this.educationalUpdateDialog.close();
  }

  getCourses() {
    this.jobSeekerService.getcourse2().subscribe(
      res => {
        this.suggestCourseCategoryDto = res.data
      }
    )
  }

  onGetSpecialization(course: CourseDto) {
    this.educationalUpdateForm.controls['specializationId'].setValue(null)
    if (course.totalSpecializations > 0) {
      this.isSpecializationEnable = true

      this.getSpecialization(course);
    }
    else {
      this.isSpecializationEnable = false

    }

  }

  getSpecialization(course: CourseDto) {
    this.jobSeekerService.getSpecializationInEducation(course.courseId).subscribe(
      res => {
        if (!res.error && res.code == 200) {
          this.suggestSpecialization = res.data

        }
      }
    )
  }

  onClickSave() {
    if (this.educationalUpdateForm.valid) {
      this.showButton = false

      let educational: EducationalDetail = this.educationalUpdateForm.value

      const specId = this.educationalUpdateForm.controls["specializationId"].value
      if (specId != null && specId != undefined) {
        let spec = new SpecializationDto();
        spec.specializationId = specId
        educational.qualificationSpecialization = spec
      }
      else {
        let course = new CourseDto();
        course.courseId = this.educationalUpdateForm.controls["courseId"].value
        educational.qualificationCourse = course

      }

      this.jobSeekerService.updateEducationalDetails(educational).subscribe(
        res => {
          this.educationalUpdateDialog.close();
          this.snackBar.open('Educational Details Updated');
        
            this.router.navigateByUrl('', { skipLocationChange: true }).then(() =>
            this.router.navigate(['job-seeker', this.uuid, 'job-seeker-display']));
        },
        err => {
          this.showButton = true

        }
      )
    }

  }
}
