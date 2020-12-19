import { Component, OnInit, Input } from '@angular/core';
import { CartState, CartItem } from '@models/cart';
import { FormControl } from '@angular/forms';
import { GloqrAdminService } from 'app/gloqr-admin/gloqr-admin-services/gloqr-admin.service';

interface CartStages {
  value: CartState;
  viewValue: string;
}
interface Dashboard {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-buiness-interest',
  templateUrl: './buiness-interest.component.html',
  styleUrls: ['./buiness-interest.component.css']
})
export class BuinessInterestComponent implements OnInit {

  noDataAvailable: boolean;
  noMoreDataAvailable: boolean
  biStagesFormControl: FormControl;
  biDaysFormControl: FormControl;
  currentDate = new Date();
  page: number = 1;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  cartItems: Array<CartItem>
  count: number;
  filterDays: Dashboard[] = [
    { value: '365', viewValue: 'All Days' },
    { value: '30', viewValue: '30 Days' },
    { value: '15', viewValue: '15 Days' },
    { value: '7', viewValue: '7 Days' },
  ];

  cartStages: CartStages[] = [
    { value: CartState.ACTIVE, viewValue: 'ACTIVE' },
    { value: CartState.REJECTED, viewValue: 'REJECTED' },
    { value: CartState.COMPLETED, viewValue: 'COMPLETED' },
    { value: CartState.AUTO_CLOSED, viewValue: 'AUTO_CLOSED' },
    { value: CartState.ALL, viewValue: 'ALL' }
  ]
  @Input()
  selectedIndex: number
  constructor(private gloqrAdminService: GloqrAdminService) {
    this.biDaysFormControl = new FormControl(this.filterDays[0].value);
    this.biStagesFormControl = new FormControl(this.cartStages[0].value);
  }

  ngOnInit() {
    if (this.selectedIndex == 1) {

      this.currentDate.getDate();

      this.getBI(this.page);
      this.getTotalBICount();

      this.biDaysFormControl.valueChanges.subscribe(
        biDays => {
          this.page = 1
          this.getBI(this.page);
          this.getTotalBICount();
          this.noMoreDataAvailable = false
        }
      )

      this.biStagesFormControl.valueChanges.subscribe(
        biStages => {
          this.page = 1
          this.getBI(this.page);
          this.getTotalBICount();
          this.noMoreDataAvailable = false

        }
      )
    }
  }

  getTotalBICount() {
    //BI Count
    this.gloqrAdminService.getBICount(this.biDaysFormControl.value, this.biStagesFormControl.value).subscribe(
      count => {
        if (!count.error)
          this.count = count.data.count
      }
    )
  }

  getBI(page: number) {
    //get business interest status like ACTIVE, REJECTED, COMPLETED, AUTO_CLOSED, ALL.
    
    this.gloqrAdminService.getBIStatus(this.biStagesFormControl.value, this.biDaysFormControl.value, page).subscribe(
      res => {
        if (res.code === 404) {
          this.cartItems = [];
          this.noDataAvailable = true;
          this.noMoreDataAvailable = false
        }
        else {
          this.noDataAvailable = false
          this.cartItems = res.data
        }
      }
    )
  }

  onScrollDown() {
    //Dashboard Business Interest Pagination on Scroll use external NPM
    if (this.selectedIndex == 1 && this.cartItems.length > 0) {
      this.gloqrAdminService.getBIStatus(this.biStagesFormControl.value, this.biDaysFormControl.value, ++this.page).subscribe(
        res => {
          if (res.code === 404) {
            this.noMoreDataAvailable = true;
            this.noDataAvailable = false
          }
          else {
            this.cartItems.push(...res.data)
          }
        }
      )
    }
  }
}
