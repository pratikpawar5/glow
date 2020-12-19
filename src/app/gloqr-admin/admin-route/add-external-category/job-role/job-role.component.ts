import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { JobPostService } from '@services/job-post/job-post.service';
import { GloqrAdminService } from 'app/gloqr-admin/gloqr-admin-services/gloqr-admin.service';
import { IndustrialAreaDto } from '@models/jobs';
import { SnackBarService } from '@services/common/snack-bar.service';

@Component({
  selector: 'app-job-role',
  templateUrl: './job-role.component.html',
  styleUrls: ['./job-role.component.css']
})

//Add Job Role from gloqr-admin
export class JobRoleComponent implements OnInit {

  jobRoleForm: FormGroup;
  industrialAreaDto: IndustrialAreaDto;
  showButton: boolean = true

  constructor(private gloqrAdminService: GloqrAdminService, private snackBar: SnackBarService, private formBuilder: FormBuilder, private jobsService: JobPostService) { }

  ngOnInit() {
    this.jobRoleForm = this.formBuilder.group({
      functionalAreaUuid: new FormControl(null, Validators.required),
      jobRoles: this.formBuilder.array([
        this.formBuilder.group({
          jobRole: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
        })
      ])
    })
  }

  getControls() {
    const arrayControl = <FormArray>this.jobRoleForm.controls['jobRoles']
    return arrayControl.controls
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

  removeSubCategory(index: number) {
    const arrayControl = <FormArray>this.jobRoleForm.controls['jobRoles']
    arrayControl.removeAt(index)
  }

  addSubCategory() {
    const arrayControl = <FormArray>this.jobRoleForm.controls['jobRoles']

    let newGroup = this.formBuilder.group({
      jobRole: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
    });
    arrayControl.push(newGroup);
  }

  onSubmit() {
    if (this.jobRoleForm.valid) {
      let industrialAreaId = this.jobRoleForm.controls['functionalAreaUuid'].value;
      let jobRole = this.jobRoleForm.controls['jobRoles'].value;
      this.gloqrAdminService.addJobRole(jobRole, industrialAreaId).subscribe(
        res => {
          if (!res.error) {
            this.snackBar.open("Industrial Area Added Successfully");
            this.showButton = true;
            this.jobRoleForm.reset();
          }
        }
      )
    }
    else {
      this.showButton = true
    }
  }
}
