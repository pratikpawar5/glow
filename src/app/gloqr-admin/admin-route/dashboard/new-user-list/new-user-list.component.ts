import { Component, OnInit, Input } from '@angular/core';
import { UserType, UserBasicInfo } from '@models/user';
import { GloqrAdminService } from 'app/gloqr-admin/gloqr-admin-services/gloqr-admin.service';
import { FormControl } from '@angular/forms';
interface Dashboard {
  value: string;
  viewValue: string;
}
interface User {
  value: UserType;
  viewValue: string;
}
@Component({
  selector: 'app-new-user-list',
  templateUrl: './new-user-list.component.html',
  styleUrls: ['./new-user-list.component.css']
})
export class NewUserListComponent implements OnInit {
  noDataAvailable: boolean

  userBasicInfo: Array<UserBasicInfo>;

  userDaysFormControl: FormControl;

  userTypeFormControl: FormControl;

  filterDays: Dashboard[] = [
    { value: '365', viewValue: 'All Days' },
    { value: '30', viewValue: '30 Days' },
    { value: '15', viewValue: '15 Days' },
    { value: '7', viewValue: '7 Days' },
  ];
  user: User[] = [
    { value: UserType.SME, viewValue: 'SME' },
    { value: UserType.NORMAL, viewValue: 'NORMAL' },
    { value: UserType.GLOQR, viewValue: 'GLOQR' },
    { value: UserType.ALL, viewValue: 'ALL' }
  ];
  page: number = 1;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  currentDate = new Date();
  noMoreDataAvailable: boolean;
  count: number;
  @Input()
  selectedIndex: number
  constructor(private gloqrAdminService: GloqrAdminService) {

    this.userDaysFormControl = new FormControl(this.filterDays[0].value);
    this.userTypeFormControl = new FormControl(this.user[0].value);
  }

  ngOnInit() {
    if (this.selectedIndex == 0) {
      this.getNewUser(this.page);
      this.getUserCount();
      this.userDaysFormControl.valueChanges.subscribe(
        res => {
          this.page = 1;
          this.getNewUser(this.page);
          this.getUserCount();
          this.noMoreDataAvailable = false;
        }
      )

      this.userTypeFormControl.valueChanges.subscribe(
        res => {
          this.page = 1;
          this.getNewUser(this.page);
          this.getUserCount();
          this.noMoreDataAvailable = false;
        }
      )
    }
  }
  //get Newly Registered User Count
  getUserCount() {
    this.gloqrAdminService.getUserCount(this.userTypeFormControl.value, this.userDaysFormControl.value).subscribe(
      res => {
        if (!res.error) {
          this.count = res.data.count
        }
      }
    )
  }

  //get Newly Registered Data  according User Type Status like SME, NORMAL, GLOQR, ALL

  getNewUser(page: number) {
    this.gloqrAdminService.getNewlyRegisterUserDetails(this.userTypeFormControl.value, this.userDaysFormControl.value, page).subscribe(
      res => {
        if (res.code === 404) {
          this.userBasicInfo = [];
          this.noDataAvailable = true
        }
        else {
          this.noDataAvailable = false
          this.userBasicInfo = res.data
        }
      }
    )
  }

  //Dashboard Newly Registered Data  Pagination on Scroll use external NPM
  onScrollDown() {
    if (this.selectedIndex == 0 && this.userBasicInfo.length > 0) {
      this.gloqrAdminService.getNewlyRegisterUserDetails(this.userTypeFormControl.value, this.userDaysFormControl.value, ++this.page).subscribe(
        res => {
          if (res.code === 404) {
            this.noMoreDataAvailable = true;
            this.noDataAvailable = false
          }
          else {
            this.userBasicInfo.push(...res.data)
          }
        }
      )
    }
  }
}
