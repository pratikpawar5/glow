import { Component, OnInit, Input } from '@angular/core';
import { Filter, SMEFilter } from '@models/filter';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-common-filter',
  templateUrl: './common-filter.component.html',
  styleUrls: ['./common-filter.component.css']
})
export class CommonFilterComponent implements OnInit {

  @Input()
  filter: Filter
  smeSearchControl = new FormControl()
  smeFilter: Array<SMEFilter>
  selectedFilters = new Array<string>()
  isMobile:boolean
  isTablet:boolean
  isDesktop:boolean
  constructor(private router: Router, private detectorService:DeviceDetectorService) { }

  ngOnInit() {
    this.isMobile = this.detectorService.isMobile();
    this.isDesktop = this.detectorService.isDesktop();
    this.isTablet = this.detectorService.isTablet();
    if (this.filter.smeFilter) {
      this.smeFilter = this.filter.smeFilter
      this.filter.smeFilter.filter(s => s.selected).forEach(s => this.selectedFilters.push(s.smeName))
    }
    this.smeSearchControl.valueChanges.subscribe(
      res => {
        this.smeFilter = this.filterResult(res)
      }
    )
  }

  smeNameClick(index: number) {
    let selectedName: string = this.smeFilter[index].smeName

    if (this.smeFilter[index].selected) {
      for (let i = 0; i < this.selectedFilters.length; i++) {
        if (this.selectedFilters[i] === selectedName) {
          this.selectedFilters.splice(i, 1)
        }
      }
    } else {
      this.selectedFilters.push(selectedName)
    }
    this.addSMENameParams()
  }

  removeFilter(selectedName: string) {
    for (let i = 0; i < this.selectedFilters.length; i++) {
      if (this.selectedFilters[i] === selectedName) {
        this.selectedFilters.splice(i, 1)
      }
    }
    this.addSMENameParams()
  }

  removeAll() {
    this.selectedFilters = new Array<string>()
    this.clearAllQueryParams()
  }

  addSMENameParams() {
    this.router.navigate([], {
      queryParams: { sme: this.selectedFilters },
      queryParamsHandling: 'merge'
    })
  }

  clearAllQueryParams() {
    this.router.navigate([], {
      queryParams: { sme: this.selectedFilters },
      queryParamsHandling: 'merge'
    })
  }


  filterResult(value: string): Array<SMEFilter> {
    const filterValue = value.toLocaleLowerCase();

    return this.filter.smeFilter.filter(option => option.smeName.toLowerCase().includes(filterValue))
  }

}
