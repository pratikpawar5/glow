import { Component, OnInit, Input } from '@angular/core';
import { FilterByJobRole, FilterByLocation, FilterByExperience, FilterBySalary, FilterBySme } from '@models/jobs';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-job-left-side-bar',
  templateUrl: './job-left-side-bar.component.html',
  styleUrls: ['./job-left-side-bar.component.css']
})
export class JobLeftSideBarComponent implements OnInit {

  @Input()
  vacancyFilters: Map<string, Array<any>>


  //for store filter param
  jobRoleFilterParams = new Set<String>();
  jobLocationFilterParams = new Set<String>();
  jobExperienceFilterParams = new Set<String>();
  salaryFilterParams = new Set<String>();
  smeFilterParams = new Set<String>();

  //for display selected filter
  selectedSMEsFilter = new Array<FilterBySme>();

  //for display filter value
  jobRolesFilter: Array<FilterByJobRole>;
  locationsFilter: Array<FilterByLocation>;
  experiencesFilter: Array<FilterByExperience>;
  salariesFilter: Array<FilterBySalary>;
  smesFilter: Array<FilterBySme>;




  // for filter Local Search
  searchJobRole = new FormControl();
  searchLocation = new FormControl();
  searchSME = new FormControl();



  // for selected filter matchip
  resetButton: boolean = false
  selectable = true;
  removable = true;

  isMobile: boolean
  isDesktop: boolean
  isTablet: boolean

  constructor(private router: Router, private route: ActivatedRoute, private detectorService: DeviceDetectorService) { }

  ngOnInit() {

    this.isMobile = this.detectorService.isMobile();
    this.isDesktop = this.detectorService.isDesktop();
    this.isTablet = this.detectorService.isTablet();

    this.jobRolesFilter = this.vacancyFilters["Job_Role"];
    this.locationsFilter = this.vacancyFilters["Location"];
    this.experiencesFilter = this.vacancyFilters["Experience"];
    this.salariesFilter = this.vacancyFilters["Salary"];
    this.smesFilter = this.vacancyFilters["SME"];

    this.jobRolesFilter.filter(role => role.selected).forEach(role => this.jobRoleFilterParams.add(role.jobRole))
    this.locationsFilter.filter(loc => loc.selected).forEach(loc => this.jobLocationFilterParams.add(loc.location))
    this.experiencesFilter.filter(exp => exp.selected).forEach(exp => this.jobExperienceFilterParams.add(exp.formattedExperience))
    this.salariesFilter.filter(sal => sal.selected).forEach(sal => this.salaryFilterParams.add(sal.formattedSalary))
    this.smesFilter.filter(sme => sme.selected).forEach(sme => {
      this.smeFilterParams.add(sme.sUuid);
      this.selectedSMEsFilter.push(sme);
    })

    this.searchJobRole.valueChanges.subscribe(
      value => {
        this.jobRolesFilter = this.getSearchJobRole(value.toLowerCase())
      }
    )
    this.searchLocation.valueChanges.subscribe(
      value => {
        this.locationsFilter = this.getSearchLocation(value.toLowerCase())
      }
    )
    this.searchSME.valueChanges.subscribe(
      value => {
        this.smesFilter = this.getSearchSME(value.toLowerCase())
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

  getSearchJobRole(value: string): Array<FilterByJobRole> {
    const filters = this.buildMap(this.vacancyFilters);
    return filters.get('Job_Role').filter(role => role.jobRole.toLowerCase().includes(value));;
  }
  getSearchLocation(value: string): Array<FilterByLocation> {
    const filters = this.buildMap(this.vacancyFilters);
    return filters.get('Location').filter(location => location.location.toLowerCase().includes(value));
  }

  getSearchSME(value: string): Array<FilterBySme> {
    const filters = this.buildMap(this.vacancyFilters);
    return filters.get('SME').filter(sme => sme.smeName.toLowerCase().includes(value));;
  }

  removeSelectedFilter(filterParam: string, filterType: string): void {

    if (filterType == 'ROLE') {
      this.filterByJobRole(filterParam);
    } else if (filterType == 'LOCATION') {
      this.filterByLocation(filterParam)
    } else if (filterType == 'EXPERIENCE') {
      this.filterByExperience(filterParam)
    } else if (filterType == 'SALARY') {
      this.filterBySalary(filterParam)
    } else if (filterType == 'SME') {
      this.filterBySme(filterParam)
    } else if (filterType == 'CLEAR_ALL_ROLE') {
      this.jobRoleFilterParams.clear();
      this.filter();
    } else if (filterType == 'CLEAR_ALL_LOCATION') {
      this.jobLocationFilterParams.clear();
      this.filter();
    } else if (filterType == 'CLEAR_ALL_EXPERIENCE') {
      this.jobExperienceFilterParams.clear();
      this.filter();
    } else if (filterType == 'CLEAR_ALL_SALARY') {
      this.salaryFilterParams.clear();
      this.filter();
    } else if (filterType == 'CLEAR_ALL_SME') {
      this.smeFilterParams.clear();
      this.filter();
    }

  }

  filterByJobRole(jobRole: string) {
    if (!this.jobRoleFilterParams.has(jobRole)) {
      this.jobRoleFilterParams.add(jobRole)
    }
    else {
      this.jobRoleFilterParams.delete(jobRole)
    }
    this.filter();
  }

  filterByLocation(location: string) {
    if (!this.jobLocationFilterParams.has(location)) {
      this.jobLocationFilterParams.add(location)
    }
    else {
      this.jobLocationFilterParams.delete(location)
    }
    this.filter();
  }

  filterByExperience(experience: string) {
    if (!this.jobExperienceFilterParams.has(experience)) {
      this.jobExperienceFilterParams.add(experience)
    }
    else {
      this.jobExperienceFilterParams.delete(experience)
    }
    this.filter();
  }

  filterBySalary(formattedSalary: string) {
    if (!this.salaryFilterParams.has(formattedSalary)) {
      this.salaryFilterParams.add(formattedSalary)
    }
    else {
      this.salaryFilterParams.delete(formattedSalary)
    }
    this.filter();

  }

  filterBySme(smeName: string) {
    if (!this.smeFilterParams.has(smeName)) {
      this.smeFilterParams.add(smeName)
    }
    else {
      this.smeFilterParams.delete(smeName)
    }
    this.filter();
  }

  filter() {
    const queryparams: Params = Object.assign({}, this.route.snapshot.params);

    if (this.jobRoleFilterParams.size > 0 || this.jobLocationFilterParams.size > 0 || this.jobExperienceFilterParams.size > 0 || this.salaryFilterParams.size > 0 || this.smeFilterParams.size > 0) {
      queryparams['filterByJobRoles'] = Array.from(this.jobRoleFilterParams);
      queryparams['filterByLocations'] = Array.from(this.jobLocationFilterParams);
      queryparams['filterByExperiences'] = Array.from(this.jobExperienceFilterParams);
      queryparams['filterBySalaries'] = Array.from(this.salaryFilterParams);
      queryparams['filterBySmes'] = Array.from(this.smeFilterParams);
      this.router.navigate([], { queryParams: queryparams });

    } else {
      this.router.navigate([]);
    }


  }
  clearAllFilter() {
    this.jobRoleFilterParams.clear();
    this.jobLocationFilterParams.clear();
    this.jobExperienceFilterParams.clear();
    this.salaryFilterParams.clear();
    this.smeFilterParams.clear();
    this.router.navigate([]);
  }


}
