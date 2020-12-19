import { Component, OnInit, Inject } from '@angular/core';
import { SmeEntity, ItemState } from '@models/sme';
import { Image } from '@models/common';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JobPostService } from '@services/job-post/job-post.service';
import { IndustrialAreaDto, IndustrialJobRoleDto } from '@models/jobs';

@Component({
  selector: 'app-vacancy-detail-dialog',
  templateUrl: './vacancy-detail-dialog.component.html',
  styleUrls: ['./vacancy-detail-dialog.component.css']
})
export class VacancyDetailDialogComponent implements OnInit {

  name: string;
  showImages: boolean
  images: Image[] = []
  public itemStatus: ItemState;
  feedbackMessage = new FormControl();

  /*Job Admin Form*/
  jobsAdminForm: FormGroup
  userSelectedCategory: boolean

  industrialAreaDto: Array<IndustrialAreaDto>
  industrialJobRoleDto: Array<IndustrialJobRoleDto>
  smeEntity:SmeEntity;
  constructor(private dialogRef: MatDialogRef<VacancyDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, private jobPostService: JobPostService) { }

  ngOnInit() {
    this.onGetFunctionalArea();
    this.jobsAdminForm = this.formBuilder.group({
      customIndustrialArea: new FormControl(null, [Validators.required]),
      customJobRoleUuid: new FormControl(null, [Validators.required])
    })

    this.jobsAdminForm.controls['customJobRoleUuid'].disable()

    if (this.data.jobRole) {
      this.setCategory()
    } else {
      this.userSelectedCategory = true;
    }

    this.jobsAdminForm.controls['customIndustrialArea'].valueChanges.subscribe(
      res => {
        if (res) {
          this.onGetIndustrialJobRoles(res)
          this.jobsAdminForm.controls['customJobRoleUuid'].setValue(null)
        }
      }
    )
  }


  setCategory() {
    if(this.data.jobRole != null)
    {
      this.jobsAdminForm.controls['customIndustrialArea'].setValue(this.data.jobRole.industrialArea.areaUuid)
      this.onGetIndustrialJobRoles(this.data.jobRole.industrialArea.areaUuid)
    }
  }


  onGetFunctionalArea() {
    this.jobPostService.getIndustrialAreas().subscribe(
      res => {
        if (!res.error && res.code == 200) {
          this.industrialAreaDto = res.data
          if(this.data.jobRole == null && this.data.otherCategory){
            this.jobsAdminForm.controls['customIndustrialArea'].setValue(this.data.otherCategory.areaUuid)
          }
        }
      }
    )
  }


  onGetIndustrialJobRoles(industrialAreaId) {
    this.jobPostService.getIndustrialJobRoles(industrialAreaId).subscribe(
      res => {
        if (!res.error && res.code == 200) {
          this.industrialJobRoleDto = res.data
          this.jobsAdminForm.controls['customJobRoleUuid'].enable()
          if (this.data.jobRole) {
            this.jobsAdminForm.controls['customJobRoleUuid'].setValue(this.data.jobRole.jobRoleUuid)
          }
        }
      }
    )
  }

  check() {
    if (this.jobsAdminForm.valid) {
      this.onApprove()
    }
  }
  onApprove() {
    this.smeEntity = new SmeEntity();
    this.smeEntity.id = this.data.vacancyUuid
    this.smeEntity.feedbackMessage = this.feedbackMessage.value
    this.smeEntity.state = ItemState.APPROVED;
    this.smeEntity.jobRoleUuid = this.jobsAdminForm.controls['customJobRoleUuid'].value
    this.dialogRef.close(this.smeEntity)
  }
  onReject() {
    this.smeEntity = new SmeEntity();
    this.smeEntity.id = this.data.vacancyUuid
    this.smeEntity.feedbackMessage = this.feedbackMessage.value
    this.smeEntity.state = ItemState.REJECTED;
    this.dialogRef.close(this.smeEntity)
  }
  close() {
    this.dialogRef.close(this.smeEntity)
  }
}
