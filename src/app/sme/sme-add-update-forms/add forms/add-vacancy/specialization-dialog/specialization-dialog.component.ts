import { Component, OnInit, Inject } from '@angular/core';
import { SpecializationDto } from '@models/jobs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JobPostService } from '@services/job-post/job-post.service';

@Component({
  selector: 'app-specialization-dialog',
  templateUrl: './specialization-dialog.component.html',
  styleUrls: ['./specialization-dialog.component.css']
})
export class SpecializationDialogComponent implements OnInit {

  specializations: SpecializationDto
  specilizationIds = new Array<SpecializationDto>();
  specUpdate: string[]
  specializationMap = new Map<string, Array<SpecializationDto>>()
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private jobPostService: JobPostService, private specializationDialog: MatDialogRef<SpecializationDialogComponent>) { }

  ngOnInit() {
    if (this.data.spec) {
      this.specilizationIds.push(...this.data.spec)
      this.specUpdate = this.data.spec.map(s =>
        s.specializationId
      )
    }
    
    this.jobPostService.getSpecializationInEducation(this.data.selectC.courseId).subscribe(
      res => {
        this.specializations = res.data
      }
    )
  }
  onClickClose() {
    this.specializationMap.set(this.data.selectC.courseId, this.data.spec);
    this.specializationDialog.close(this.specializationMap);
  }

  onClickDone() {
    this.specializationMap.set(this.data.selectC.courseId, this.specilizationIds);
    this.specializationDialog.close(this.specializationMap)
  }

  onclickCheckBox(specialization: SpecializationDto) {
    let index = this.specilizationIds.findIndex(s => s.specializationId == specialization.specializationId);
    if (index === -1) {
      this.specilizationIds.push(specialization)
    }
    else {
      this.specilizationIds.splice(index, 1)
    }
  }

}
