import { Component, OnInit } from '@angular/core';
import { EducationalDetail, SpecializationDto, CourseDto, CourseCategoryDto } from '@models/jobs';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { State } from '@models/sme';
import { MatDialogRef } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { JobSeekerService } from 'app/job-seeker/job-seekers-services/job-seeker.service';
import { SnackBarService } from '@services/common/snack-bar.service';
import { TokenService } from '@services/token/token.service';

@Component({
  selector: 'app-create-educational-details-dialog',
  templateUrl: './create-educational-details-dialog.component.html',
  styleUrls: ['./create-educational-details-dialog.component.css']
})
export class CreateEducationalDetailsDialogComponent implements OnInit {
  educationalCreateForm: FormGroup

  passingOutYears: Array<number> = [
    2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006,
    2005, 2004, 2003, 2002, 2001, 2000, 1999, 1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990, 1989, 1988,
    1987, 1986, 1985, 1984, 1983, 1982, 1981, 1980
  ]
  suggestCourseCategoryDto: CourseCategoryDto

  suggestedCourse: CourseDto

  suggestSpecialization: SpecializationDto

  selectedCourse = new Array();

  specializationMap = new Map();

  states: Array<State>

  isSpecializationEnable: boolean

  showButton: boolean = true
  uuid:string
  constructor(private formBuilder: FormBuilder,private token:TokenService, private router: Router, private snackBar: SnackBarService, private jobSeekerService: JobSeekerService, private educationalCreateDialog: MatDialogRef<CreateEducationalDetailsDialogComponent>) {
  }
  ngOnInit() {
    this.uuid=this.token.getUserId();
    this.educationalCreateForm = this.formBuilder.group({

      courseId: new FormControl(null, Validators.required),

      specializationId: new FormControl(null),

      universityName: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]*$'), Validators.maxLength(150)]),

      instituteName: new FormControl(null, [Validators.required, Validators.maxLength(150), Validators.pattern('[a-zA-Z ]*$')]),

      percentage: new FormControl(null, [Validators.required, Validators.pattern('^[0-9.]*$'), Validators.min(1), Validators.max(100)]),

      passingOutYear: new FormControl(null, Validators.required),

    })
    this.getCourses();

  }


  getCourses() {
    this.jobSeekerService.getcourse2().subscribe(
      res => {
        this.suggestCourseCategoryDto = res.data
      }
    )
  }

  onGetSpecialization(course: CourseDto) {
    this.educationalCreateForm.controls['specializationId'].setValue(null)
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

  onEducationalDetailsSave() {
    if (this.educationalCreateForm.valid) {
      this.showButton = false
      let educational: EducationalDetail = this.educationalCreateForm.value
      const specId = this.educationalCreateForm.controls["specializationId"].value
      if (specId != null && specId != undefined) {
        let spec = new SpecializationDto();
        spec.specializationId = specId
        educational.qualificationSpecialization = spec
      }
      else {
        let course = new CourseDto();
        course.courseId = this.educationalCreateForm.controls["courseId"].value
        educational.qualificationCourse = course

      }
      this.jobSeekerService.postEducationalDetails(educational).subscribe(
        res => {
          this.educationalCreateDialog.close();
          this.snackBar.open('Educational Details Created');
      
            this.router.navigateByUrl('', { skipLocationChange: true }).then(() =>
            this.router.navigate(['job-seeker', this.uuid, 'job-seeker-display']));
        },
        err => {
          this.showButton = true
        }
      )
    }
  }
  onClickClose() {
    this.educationalCreateDialog.close();
  }

}
