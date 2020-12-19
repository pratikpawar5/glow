import { Component, OnInit } from '@angular/core';
import { SMEItemStatus, SmeEntity } from '@models/sme';
import { JobView } from '@models/jobs';
import { SmeAdminServiceService } from 'app/sme-admin/sme-admin-service/sme-admin-service.service';
import { PageTitleService } from '@services/page-title/page-title.service';
import { TokenService } from '@services/token/token.service';
import { JobPostService } from '@services/job-post/job-post.service';
import { SnackBarService } from '@services/common/snack-bar.service';
import { Router } from '@angular/router';
declare var ga: Function;

@Component({
  selector: 'app-admin-vacancy',
  templateUrl: './admin-vacancy.component.html',
  styleUrls: ['./admin-vacancy.component.css']
})
export class AdminVacancyComponent implements OnInit {

  smeJobs: Array<JobView>
  edit: boolean = false
  disablePublishButton: boolean = true;
  disableDeactiveButton: boolean = true;
  map = new Map<string, SMEItemStatus>();
  sUuid: string
  selectedSize: any = 0
  publishVacancyButton: boolean = true
  showSpinner: boolean = true
  notFound: boolean
  showButton: boolean = true
  constructor(private smeAdminServiceService: SmeAdminServiceService,
    private jobPostService: JobPostService, private snackBar: SnackBarService,
    private pageTitleService: PageTitleService, private token: TokenService, router: Router) {
    ga('set', 'page', router.url);
    ga('send', 'pageview');
  }
  ngOnInit() {
    this.pageTitleService.updateTitle('Job | Admin')
    this.sUuid = this.token.getSmeId()
    this.getJobsBySmeId("false");
  }
  getJobsBySmeId(paramValue: string) {
    this.jobPostService.getJobsBySmeId(paramValue).subscribe(
      res => {
        if (res.error) {
          this.showSpinner = false
          this.notFound = true
        }
        else {
          this.smeJobs = res.data
          this.showSpinner = false
        }
      }
    )
  }
  onActive() {
    this.smeJobs = undefined
    this.edit = false
    this.showSpinner = false
    this.getJobsBySmeId("false");
    this.notFound = false
  }

  onInActive() {
    this.smeJobs = undefined
    this.edit = true
    const pendingJobs = "true"
    this.getJobsBySmeId(pendingJobs);
    this.notFound = false
  }

  onclickCheckbox(vacancyUuid: string, vacancyActive: boolean) {
    if (!this.map.has(vacancyUuid)) {
      if (vacancyActive) {
        this.map.set(vacancyUuid, SMEItemStatus.ACTIVE);
      }
      else {
        this.map.set(vacancyUuid, SMEItemStatus.DEACTIVE);
      }

    } else {
      this.map.delete(vacancyUuid)
    }
    this.selectedSize = this.map.size
    if (this.map.size > 0) {
      this.disablePublishButton = false
      this.disableDeactiveButton = false
    } else {
      this.disablePublishButton = true
      this.disableDeactiveButton = true
    }
  }

  onClickPublish() {
    this.showButton = false
    let publishDataArr = new Array<SmeEntity>();
    this.map.forEach((itemStatus: SMEItemStatus, vacancyUuid: string) => {
      let smeItem = new SmeEntity();
      smeItem.id = vacancyUuid;
      smeItem.smeAction = itemStatus;
      publishDataArr.push(smeItem);
    });
    this.smeAdminServiceService.publishVacancy(this.sUuid, publishDataArr).subscribe(
      res => {
        this.snackBar.open('Publish Data Successfully')
        this.map.clear()
        this.disablePublishButton = true
        this.onInActive();
        this.showButton = true

      }
    )
  }

  onClickDeactive() {
    this.showButton = false
    let publishDataArr = new Array<SmeEntity>();
    this.map.forEach((itemStatus: SMEItemStatus, vacancyUuid: string) => {
      let smeItem = new SmeEntity();
      smeItem.id = vacancyUuid;
      smeItem.smeAction = itemStatus;
      publishDataArr.push(smeItem);
    });
    this.smeAdminServiceService.publishVacancy(this.sUuid, publishDataArr).subscribe(
      res => {
        this.snackBar.open('Publish Data Successfully')
        this.map.clear()
        this.disablePublishButton = true
        this.onActive();
        this.showButton = true
      }
    )
  }

  addNewVacancyClick() {
    let url = '/my-sme/' + this.sUuid + '/add-job'
    window.open(url, '_blank')
  }

  viewAllVacancy() {
    let url = '/my-sme/' + this.sUuid + '/jobs';
    window.open(url, '_blank')
  }
  
}
