import { Component, OnInit, Input } from '@angular/core';
import { SMECategoryFilter, SMEFilterByCity } from '@models/sme';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sme-search-filter',
  templateUrl: './sme-search-filter.component.html',
  styleUrls: ['./sme-search-filter.component.css']
})
export class SmeSearchFilterComponent implements OnInit {

  @Input()
  filters: Map<string, Array<any>>;

  searchText: string;

  //for store filter param
  cityFilterParams = new Set<String>();
  categoryFilterParams = new Set<String>();


  //for display filter
  categoryFilter: Array<SMECategoryFilter>;
  cityFilter: Array<SMEFilterByCity>;

  //for search in filter
  searchCategory = new FormControl();
  searchCity = new FormControl();

  constructor(private router: Router, private route: ActivatedRoute) {
    route.queryParams.subscribe(params => {
      this.searchText = params["searchText"];
    })
  }

  ngOnInit() {

    this.categoryFilter = this.filters['Category'];
    this.cityFilter = this.filters['City'];

    this.categoryFilter.filter(cat => cat.selected).forEach(cat => this.categoryFilterParams.add(cat.categoryName))
    this.cityFilter.filter(city => city.selected).forEach(city => this.cityFilterParams.add(city.city))

    this.searchCategory.valueChanges.subscribe(
      value => {
        this.categoryFilter = this.getSearchCategory(value.toLowerCase())
      }
    )
    this.searchCity.valueChanges.subscribe(
      value => {
        this.cityFilter = this.getSearchCity(value.toLowerCase())
      }
    )
  }

  buildMap(obj): Map<string, any> {
    let map = new Map<string, any>();
    Object.keys(obj).forEach(key => {
      map.set(key, obj[key]);
    });
    return map;
  }

  getSearchCategory(value: string): Array<SMECategoryFilter> {
    const filters = this.buildMap(this.filters);
    return filters.get('Category').filter(category => category.categoryName.toLowerCase().includes(value));
  }
  getSearchCity(value: string): Array<SMEFilterByCity> {
    const filters = this.buildMap(this.filters);
    return filters.get('City').filter(city => city.city.toLowerCase().includes(value));
  }



  removeSelectedFilter(filterParam: string, filterType: string): void {
    if (filterType == 'CATEGORY') {
      this.filterByCategory(filterParam)
    } else if (filterType == 'CITY') {
      this.filterByCity(filterParam)
    } else if (filterType == 'CLEAR_ALL_CATEGORY') {
      this.categoryFilterParams.clear();
      this.filter();
    } else if (filterType == 'CLEAR_ALL_CITY') {
      this.cityFilterParams.clear();
      this.filter();
    }

  }



  filterByCategory(categoryName: string) {
    if (this.categoryFilterParams.has(categoryName)) {
      this.categoryFilterParams.delete(categoryName)
    } else {
      this.categoryFilterParams.add(categoryName)
    }
    this.filter();
  }

  filterByCity(city: string) {
    if (this.cityFilterParams.has(city)) {
      this.cityFilterParams.delete(city)
    } else {
      this.cityFilterParams.add(city)
    }
    this.filter();
  }

  filter() {
    this.router.navigate([], { queryParams: { searchText: this.searchText, categoriesFilterParam: Array.from(this.categoryFilterParams), citiesFilterParam: Array.from(this.cityFilterParams) } });
  }
  clearAllFilter() {
    this.cityFilterParams.clear();
    this.categoryFilterParams.clear();
    this.router.navigate([], { queryParams: { searchText: this.searchText } });
  }
}
