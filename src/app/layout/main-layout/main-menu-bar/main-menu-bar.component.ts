import { Component, OnInit } from '@angular/core';
import { HomeService } from '@services/home/home.service';
import { ServiceCategory, ServiceSubCategory } from '@models/service';
import { ProductCategory, ProductSubCategory } from '@models/product';
import { SMECategoryFilter, SMEFilterByCity, SMEFilterDto } from '@models/sme';
import { FilterByJobRole, FilterByLocation, FilterBySalary, FilterBySme, JobFilter } from '@models/jobs';
import { TokenService } from '@services/token/token.service';

@Component({
  selector: 'app-main-menu-bar',
  templateUrl: './main-menu-bar.component.html',
  styleUrls: ['./main-menu-bar.component.css']
})

//gloqr home page Menu Bar
export class MainMenuBarComponent implements OnInit {

  isLoggedIn: boolean
  isSME: boolean


  serviceCategories: Array<ServiceCategory>
  productCategories: Array<ProductCategory>

  smeCategoryMenu: Map<string, Array<SMECategoryFilter>>;
  smeCityMenu: Map<string, Array<SMEFilterByCity>>;
  homepageSMEFilterCategories: SMEFilterDto

  homePageVacancyCategories: JobFilter
  vacancyJobRoleMenu: Map<string, Array<FilterByJobRole>>;
  vacancyLocationMenu: Map<string, Array<FilterByLocation>>;
  vacancyExperienceMenu: Map<string, Array<FilterByLocation>>;
  vacancySalaryMenu: Map<string, Array<FilterBySalary>>;
  vacancySMEMenu: Map<string, Array<FilterBySme>>;

  constructor(private home: HomeService, private token: TokenService) { }

  ngOnInit() {
    this.token.checkLogin().subscribe(
      res => {
        if (res) {
          this.isLoggedIn = true
          if (this.token.isSME()) {
            this.isSME = true
          }
        }
        else {
          this.isSME = false
        }
      })

    this.home.serviceCategories().subscribe(
      res => {
        if (!res.error) {
          this.serviceCategories = res.data
          this.serviceCategories.forEach(c => {
            c.subCategories.sort((a: ServiceSubCategory, b: ServiceSubCategory) => {
              return a.subCategoryName.localeCompare(b.subCategoryName)
            })
          })
        }
      }
    )
    this.home.productCategories().subscribe(
      res => {
        if (!res.error) {
          this.productCategories = res.data
          this.productCategories.forEach(c => {
            c.subCategories.sort((a: ProductSubCategory, b: ProductSubCategory) => {
              return a.subCategoryName.localeCompare(b.subCategoryName)
            })
          })
        }
      }
    )
    this.home.smeCategoriesDto().subscribe(
      res => {
        if (!res.error)
          this.homepageSMEFilterCategories = res.data;
        this.smeCategoryMenu = new Map<string, Array<SMECategoryFilter>>();
        this.smeCategoryMenu.set('Category', res.data.filters['Category']);

        this.smeCityMenu = new Map<string, Array<SMEFilterByCity>>();
        this.smeCityMenu.set('City', res.data.filters['City']);
      }
    )

    this.home.vacancyCategories().subscribe(
      res => {
        this.homePageVacancyCategories = res.data
        this.vacancyJobRoleMenu = new Map<string, Array<FilterByJobRole>>();
        this.vacancyJobRoleMenu.set('Job Role', res.data.filters['Job_Role']);

        this.vacancyLocationMenu = new Map<string, Array<FilterByLocation>>();
        this.vacancyLocationMenu.set('Location', res.data.filters['Location']);

        this.vacancyExperienceMenu = new Map<string, Array<FilterByLocation>>();
        this.vacancyExperienceMenu.set('Experience', res.data.filters['Experience']);

        this.vacancySalaryMenu = new Map<string, Array<FilterBySalary>>();
        this.vacancySalaryMenu.set('Salary', res.data.filters['Salary']);

        this.vacancySMEMenu = new Map<string, Array<FilterBySme>>();
        this.vacancySMEMenu.set('SME', res.data.filters['SME']);

      })

  }

}
