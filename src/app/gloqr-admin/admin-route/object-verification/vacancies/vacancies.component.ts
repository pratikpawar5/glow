import { Component, OnInit, Input } from '@angular/core';
import { SmeEntity } from '@models/sme';
import { JobPost, CourseDto } from '@models/jobs';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { VacancyDetailDialogComponent } from './vacancy-detail-dialog/vacancy-detail-dialog.component';
import { GloqrAdminService } from 'app/gloqr-admin/gloqr-admin-services/gloqr-admin.service';
@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.css']
})
export class VacanciesComponent implements OnInit {

  smeEntities = new Array<SmeEntity>();
  smeJobs: Array<JobPost>
  approveSelectedSize: any = 0;
  name: string;
  rejectSelectedSize: any = 0;
  @Input()
  sUuid: string
  isSelect: boolean = false
  disableFlag: boolean = true;
  @Input()
  uuid: string
  showSpinner: boolean = true
  notFound: boolean
  approveVacancyDialog: MatDialogRef<VacancyDetailDialogComponent>
  apiResponseCourseTypes: Array<CourseDto>
  showButton: boolean = true

  constructor(private gloqrAdminService: GloqrAdminService, private matDialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit() {
    this.approveSelectedSize = 0
    this.rejectSelectedSize = 0
    this.sUuid = this.route.snapshot.params['sUuid']
    this.uuid = this.route.snapshot.params['uuid']
    this.gloqrAdminService.getVacancy(this.sUuid).subscribe(
      res => {
        if (res.error) {
          this.showSpinner = false
          this.notFound = true
        }
        else {
          this.smeJobs = res.data
          this.apiResponseCourseTypes = res.data.qualificationCourses
          this.showSpinner = false
        }
      }
    )
  }

  onViewVacancyDetail(job: JobPost, index: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = false;
    dialogConfig.width = '1000px';
    dialogConfig.height = '800px';
    dialogConfig.data = job
    this.approveVacancyDialog = this.matDialog.open(VacancyDetailDialogComponent, dialogConfig);
    this.approveVacancyDialog.afterClosed().subscribe(
      res => {

        if (res) {
          this.rejectSelectedSize = 0
          this.approveSelectedSize = 0
          if (res.state === 1) {
            job.isApprove = true
            job.isReject = false
          }

          if (res.state === 2) {
            job.isReject = true
            job.isApprove = false
          }


          let entityIndex: number = this.smeEntities.findIndex(entity => entity.id == res.id);
          if (entityIndex != -1) {
            this.smeEntities.splice(entityIndex, 1);
          }
          this.smeEntities.push(res)

          this.smeEntities.forEach(smeEntity => {
            let job: JobPost = this.smeJobs.find(job => job.vacancyUuid === smeEntity.id)
            if (job) {
              job.frontFeedBackMessage = smeEntity.feedbackMessage
              if (smeEntity.state == 2) {
                this.smeJobs[index].isSelected = true
                ++this.rejectSelectedSize;
              }
              if (smeEntity.state == 1) {
                this.smeJobs[index].isSelected = true
                ++this.approveSelectedSize;
              }
            }
          })
        }
      }
    )
  }

  onSubmit() {
    let adminVacancyPublish = {
      userId: this.uuid,
      smeId: this.sUuid,
      vacanciesInfo: this.smeEntities
    }
    if (adminVacancyPublish.vacanciesInfo.length > 0) {
      this.showButton = false
      this.gloqrAdminService.updateVacancy(adminVacancyPublish).subscribe(
        res => {
          this.smeEntities.forEach(smeEntity => {
            let index: number = this.smeJobs.findIndex(jobs => jobs.vacancyUuid === smeEntity.id)
            if (index != -1) {
              this.smeJobs.splice(index, 1)
              this.smeEntities = []
              this.showButton = true
              this.rejectSelectedSize = 0
              this.approveSelectedSize = 0
            }
          })
        }
      )
    }

  }

}
