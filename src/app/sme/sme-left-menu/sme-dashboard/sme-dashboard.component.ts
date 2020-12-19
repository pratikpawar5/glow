import { Component, OnInit } from '@angular/core';
import { BusinessCircle } from '@models/business-circle';
import { ExtraService } from '@services/common/extra.service';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { PageTitleService } from '@services/page-title/page-title.service';
import { FileSizeFormatService } from '@services/common/file-size-format.service';
import { EditModeItemsPercentage, ItemsCount } from '@models/sme-items-count';
import { TokenService } from '@services/token/token.service';
import { LazySmeModuleService } from 'app/sme/http-service/lazy-sme-module.service';
import { BarChartValue, PieChartValue, VacancyApplicantCountVo } from '@models/sme';
import { SocialCirclePrivacyComponent } from './social-circle-privacy/social-circle-privacy.component';
import { ProfileDetailsViewComponent } from './profile-details-view/profile-details-view.component';
import { SmeService } from '@services/sme/sme.service';
import { JobPostService } from '@services/job-post/job-post.service';
import { JobApplicantDto } from '@models/jobs';
import { ViewApplicantsComponent } from '../sme-vacancy/view-applicants/view-applicants.component';

@Component({
  selector: 'app-sme-dashboard',
  templateUrl: './sme-dashboard.component.html',
  styleUrls: ['./sme-dashboard.component.css'],
})
export class SmeDashboardComponent implements OnInit {
  sUuid: string
  vacancyUuid: string
  /*Profile Completion*/
  editModeItemsCount: ItemsCount
  editModeItemsPercentage: EditModeItemsPercentage
  /*Profile Completion*/
  data: any;
  barChartValue: BarChartValue
  pieChartValue: PieChartValue
  cartData: any
  /*Business Circle Start*/
  profileResponse: BusinessCircle;
  myconnectionCount: number = 0
  sentCount: number = 0
  pendingCount: number = 0
  circlePrivacyDialogComponent: MatDialogRef<SocialCirclePrivacyComponent>;
  profileDetailsViewComponent: MatDialogRef<ProfileDetailsViewComponent>;
  circlePrivacy: string
  vacancyApplicantCountVo: VacancyApplicantCountVo;
  jobApplicantDto: Array<JobApplicantDto>

  /*Scroll Module */
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  /*Business Circle End*/
  businessCredit: boolean = false
  constructor(private extraService: ExtraService,
    public format: FileSizeFormatService, private dialog: DialogService,
    private title: PageTitleService, private smeService: SmeService, private matDialog: MatDialog, private lazySmeModuleService: LazySmeModuleService, private token: TokenService) { }

  ngOnInit() {
    this.sUuid = this.token.getSmeId();

    this.lazySmeModuleService.getValueForPieChart().subscribe(
      res => {
        if (res.error) {

        }
        else {
          this.pieChartValue = res.data.summary;
          this.barChartValue = res.data.chart;
          this.cartData = {
            labels: ['BI', 'Quotation', 'Delivered'],
            datasets: [
              {
                data: [this.pieChartValue.totalCount, this.pieChartValue.quotationCount, this.pieChartValue.deliveredCount],
                backgroundColor: [
                  "#c57d29",
                  "#ef7601",
                  "#388e3c",
                ],
                hoverBackgroundColor: [
                  "#c57d29",
                  "#ef7601",
                  "#388e3c",
                ]
              }]
          };
          this.data = {
            labels: this.barChartValue.months,
            datasets: [
              {
                label: 'Total BI',
                backgroundColor: '#c57d29',
                data: this.barChartValue.total
              },
              {
                label: 'Quotation',
                backgroundColor: '#ef7601',
                data: this.barChartValue.quotation
              },
              {
                label: 'Delivered',
                backgroundColor: ' #388e3c',
                data: this.barChartValue.delivered
              }
            ]
          }
        }
      }
    )
    // this.lazySmeModuleService.getAllBarChartValue().subscribe(
    //   res => {
    //     if (res.error) {

    //     }
    //     else {
    //       this.barChartValue = res.data;

    //       this.data = {
    //         labels: this.barChartValue.months,
    //         datasets: [
    //           {
    //             label: 'Total BI',
    //             backgroundColor: '#c57d29',
    //             data: this.barChartValue.total
    //           },
    //           {
    //             label: 'Quotation',
    //             backgroundColor: '#ef7601',
    //             data: this.barChartValue.quotation
    //           },
    //           {
    //             label: 'Delivered',
    //             backgroundColor: ' #388e3c',
    //             data: this.barChartValue.delivered
    //           }
    //         ]
    //       }
    //     }
    //   }
    // )

    this.extraService.getCircleCount().subscribe(
      res => {
        if (res.error && res.code === 404) {
          this.profileResponse = new BusinessCircle();
        }
        else {
          this.myconnectionCount = res.data.connectionCount
          this.sentCount = res.data.sendReqCount
          this.pendingCount = res.data.receivedReqCount
        }
      }
    )
    this.lazySmeModuleService.getSMEObjectPercentage().subscribe(
      res => {
        if (res.error) {

        }
        else {
          this.editModeItemsPercentage = res.data
        }
      }
    )
    this.extraService.getCircleConnectionPrivacy().subscribe(
      res => {
        if (res.error) {
        }
        else {
          this.circlePrivacy = res.data.circlePrivacy
        }
      }
    )

  }

  onScrollDown() {
    if (!this.editModeItemsCount) {

      this.smeService.getSmeObjectCountForEditMode('all').subscribe(
        res => {
          if (res.error) {

          }
          else {
            this.editModeItemsCount = res.data
          }
        }
      )
    }

    if (!this.vacancyApplicantCountVo) {

      this.lazySmeModuleService.getJobApplicantDashboard().subscribe(
        res => {
          if (res.error) {
          }
          else {
            this.vacancyApplicantCountVo = res.data
            this.vacancyUuid = this.vacancyApplicantCountVo.vacancyUuid
          }
        }
      )
    }
    this.businessCredit = true
  }
  onClickSetting() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = false
    dialogConfig.width = '350px';
    dialogConfig.height = '200px';
    dialogConfig.data = this.circlePrivacy
    this.circlePrivacyDialogComponent = this.matDialog.open(SocialCirclePrivacyComponent, dialogConfig);
  }
  onClickViewMoreDetail() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = true
    dialogConfig.width = '650px';
    dialogConfig.height = '550px';
    dialogConfig.data = this.editModeItemsPercentage
    this.profileDetailsViewComponent = this.matDialog.open(ProfileDetailsViewComponent, dialogConfig);
  }
  onClickView(vacancyUuid: string, value: string) {
    this.matDialog.open(ViewApplicantsComponent, this.dialog.getJobApplicant(vacancyUuid, value));
  }
}
