import { Component, OnInit } from '@angular/core';
import { PricingService } from '@services/pricing/pricing.service';
import { PricingHistory } from '@models/pricing';
import { FileSizeFormatService } from '@services/common/file-size-format.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-credit-consumptions',
  templateUrl: './credit-consumptions.component.html',
  styleUrls: ['./credit-consumptions.component.css']
})
export class CreditConsumptionsComponent implements OnInit {

  consumptions: Array<PricingHistory>
  page = 1;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  showSpinner: boolean = true
  notFound: boolean

  types: Array<string> = [
    'All',
    'Product/ Service Listing',
    'Business Interest Read',
    'Job Postings',
    'Business Update Postings',
    'Active Connections Allowed',
    'Image Storage'
  ]

  order: Array<any> = [
    { name: 'Newest First', value: 'DESC' },
    { name: 'Oldest First', value: 'ASC' },
  ]

  filterBy: FormControl
  sortBy: FormControl

  constructor(private pricing: PricingService, public convert: FileSizeFormatService) {
    this.filterBy = new FormControl(this.types[0]);
    this.sortBy = new FormControl(this.order[0].value);
  }

  ngOnInit() {
    this.getCreditConsumptions()

    this.filterBy.valueChanges.subscribe(
      res => {
        this.page = 1;
        this.getCreditConsumptions()
      }
    )

    this.sortBy.valueChanges.subscribe(
      res => {
        this.page = 1;
        this.getCreditConsumptions()
      }
    )
  }

  getCreditConsumptions() {
    this.pricing.creditConsumptions(this.page, this.filterBy.value, this.sortBy.value).subscribe(
      res => {
        this.showSpinner = false
        if (res.error) {
          this.notFound = true
          this.consumptions = undefined
        } else {
          this.consumptions = res.data
        }
      }
    )
  }


  onScrollDown() {

    if (this.consumptions) {
      this.showSpinner = true
      this.pricing.creditConsumptions(++this.page, this.filterBy.value, this.sortBy.value).subscribe(
        res => {
          this.showSpinner = false
          if (!res.error) {
            this.consumptions.push(...res.data)
          }
        }
      )
    }
  }

}
