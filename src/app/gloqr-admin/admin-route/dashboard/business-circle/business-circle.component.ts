import { Component, OnInit, Input } from '@angular/core';
import { CircleState, CircleInviteStatus } from '@models/business-circle';
import { FormControl } from '@angular/forms';
import { GloqrAdminService } from 'app/gloqr-admin/gloqr-admin-services/gloqr-admin.service';
interface Dashboard {
  value: string;
  viewValue: string;
}
interface CircleStatus {
  value: CircleState;
  viewValue: string;
}
@Component({
  selector: 'app-business-circle',
  templateUrl: './business-circle.component.html',
  styleUrls: ['./business-circle.component.css']
})
export class BusinessCircleComponent implements OnInit {
  noDataAvailable: boolean
  noMoreDataAvailable: boolean
  circleDaysFormControl: FormControl;
  circleStatusFormControl: FormControl;
  circleInviteStatus: Array<CircleInviteStatus>
  currentDate = new Date();
  page: number = 1;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  circleStatus: CircleStatus[] = [
    { value: CircleState.ACCEPTED, viewValue: 'ACCEPTED' },
    { value: CircleState.REJECTED, viewValue: 'REJECTED' },
    { value: CircleState.PENDING, viewValue: 'PENDING' },
    { value: CircleState.ALL, viewValue: 'ALL' }
  ];
  filterDays: Dashboard[] = [
    { value: '365', viewValue: 'All Days' },
    { value: '30', viewValue: '30 Days' },
    { value: '15', viewValue: '15 Days' },
    { value: '7', viewValue: '7 Days' },
  ];
  @Input()
  selectedIndex: number
  count: number;
  constructor(private gloqrAdminService: GloqrAdminService) {

    this.circleDaysFormControl = new FormControl(this.filterDays[0].value);
    this.circleStatusFormControl = new FormControl(this.circleStatus[0].value);
  }

  ngOnInit() {
    if (this.selectedIndex === 2) {
      this.getAllCircleInviteStatus(this.page);
      this.getCircleCount();
      this.circleDaysFormControl.valueChanges.subscribe(
        res => {
          this.page = 1
          this.getAllCircleInviteStatus(this.page);
          this.getCircleCount();
          this.noMoreDataAvailable = false

        }
      )

      this.circleStatusFormControl.valueChanges.subscribe(
        res => {
          this.page = 1
          this.getAllCircleInviteStatus(this.page);
          this.getCircleCount();
          this.noMoreDataAvailable = false

        }
      )
    }
  }

  getAllCircleInviteStatus(page: number) {
    //get business circle data according Circle Status like ACCEPTED, REJECTED, PENDING, ALL
    this.gloqrAdminService.getAllCircleInviteStatus(this.circleStatusFormControl.value, this.circleDaysFormControl.value, page).subscribe(
      res => {
        if (res.code === 404) {
          this.circleInviteStatus = [];
          this.noDataAvailable = true
        }
        else {
          this.noDataAvailable = false
          this.circleInviteStatus = res.data
        }
      }
    )
  }

  getCircleCount() {
    //Circle Count
    
    this.gloqrAdminService.getCircleCount(this.circleStatusFormControl.value, this.circleDaysFormControl.value).subscribe(
      res => {
        if (!res.error) {
          this.count = res.data.count
        }
      }
    )
  }
  onScrollDown() {
    //Dashboard Business Circle Pagination on Scroll use external NPM
    if (this.selectedIndex === 2 && this.circleInviteStatus.length > 0) {
      this.gloqrAdminService.getAllCircleInviteStatus(this.circleStatusFormControl.value, this.circleDaysFormControl.value, ++this.page).subscribe(
        res => {
          if (res.code === 404) {
            this.noMoreDataAvailable = true;
            this.noDataAvailable = false;
          }
          else {
            this.circleInviteStatus.push(...res.data)
          }
        }
      )
    }
  }
}
