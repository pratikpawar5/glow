import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Filter, SMEFilter } from '@models/filter';
import { Options } from 'ng5-slider';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-product-filter-result',
  templateUrl: './product-filter-result.component.html',
  styleUrls: ['./product-filter-result.component.css']
})
export class ProductFilterResultComponent implements OnInit {

  @Input()
  filter: Filter
  selectedFilters = new Array<string>()
  selectedPrice:string

  options: Options
  minPrice: number
  maxPrice: number
  minPriceControl = new FormControl()
  maxPriceControl = new FormControl()

  smeSearchControl = new FormControl()
  smeFilter: Array<SMEFilter>

  priceChange: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  isMobile: boolean
  isDesktop: boolean
  isTablet: boolean
  constructor(private router: Router, private detectorService: DeviceDetectorService,
    private route:ActivatedRoute) {
      route.queryParams.subscribe(
        res => this.selectedPrice = res['price']
      )
  }

  ngOnInit() {

    this.isMobile = this.detectorService.isMobile();
    this.isDesktop = this.detectorService.isDesktop();
    this.isTablet = this.detectorService.isTablet();

    this.minPrice = this.filter.price.selectedMinPrice
    this.maxPrice = this.filter.price.selectedMaxPrice
    if (this.filter.smeFilter) {
      this.smeFilter = this.filter.smeFilter
      this.filter.smeFilter.filter(s => s.selected).forEach(s => this.selectedFilters.push(s.smeName))
    }
    this.options = {
      floor: this.filter.price.minPrice,
      ceil: this.filter.price.maxPrice,
      step: 1,
      noSwitching: true
    };
    this.priceChange.pipe(debounceTime(500)).subscribe(
      res => {
        if (res) {
          this.addPriceQueryParams()
        }
      }
    )

    this.minPriceControl.valueChanges.pipe(debounceTime(500)).subscribe(
      res => {
        if (res <= this.filter.price.maxPrice && res >= this.filter.price.minPrice) {
          this.minPrice = res
          this.addPriceQueryParams()
        }
      }
    )
    this.maxPriceControl.valueChanges.pipe(debounceTime(500)).subscribe(
      res => {
        if (res <= this.filter.price.maxPrice && res >= this.filter.price.minPrice) {
          this.maxPrice = res
          this.addPriceQueryParams()
        }
      }
    )

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

  discountClick(value: string, selected: boolean) {
    if (selected) {
      for (let i = 0; i < this.selectedFilters.length; i++) {
        if (this.selectedFilters[i] === value) {
          this.selectedFilters.splice(i, 1)
        }
      }
    } else {
      this.selectedFilters.push(value)
    }
    this.addDiscountParams()
  }

  removeSmeName(selectedName: string) {
    for (let i = 0; i < this.selectedFilters.length; i++) {
      if (this.selectedFilters[i] === selectedName) {
        this.selectedFilters.splice(i, 1)
      }
    }
    this.addSMENameParams()
  }

  removeSelectedPrice(){
    this.selectedPrice = undefined
    this.router.navigate([], {
      queryParams: { price: this.selectedPrice },
      queryParamsHandling: 'merge'
    })
  }

  removeAll() {
    this.selectedFilters = new Array<string>()
    this.selectedPrice = undefined
    this.minPrice = this.filter.price.minPrice
    this.maxPrice = this.filter.price.maxPrice
    this.router.navigate([], {
      queryParams: { sme: this.selectedFilters, price: this.selectedPrice },
      queryParamsHandling: 'merge'
    })
  }

  removeAllSmeNameFilter() {
    this.selectedFilters = new Array<string>()
    this.router.navigate([], {
      queryParams: { sme: this.selectedFilters },
      queryParamsHandling: 'merge'
    })
  }

  addSMENameParams() {
    this.router.navigate([], {
      queryParams: { sme: this.selectedFilters },
      queryParamsHandling: 'merge'
    })
  }

  addDiscountParams() {
    this.router.navigate([], {
      queryParams: { disc: this.selectedFilters },
      queryParamsHandling: 'merge'
    })
  }

  addPriceQueryParams() {
    this.router.navigate([], {
      queryParams: { price: this.minPrice + '-' + this.maxPrice },
      queryParamsHandling: 'merge'
    })
  }

  valueChange(event: number) {
    this.priceChange.next(event)
  }

  filterResult(value: string): Array<SMEFilter> {
    const filterValue = value.toLocaleLowerCase();

    return this.filter.smeFilter.filter(option => option.smeName.toLowerCase().includes(filterValue))
  }
}
