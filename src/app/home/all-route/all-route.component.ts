import { Component, OnInit, HostListener } from '@angular/core';
import { ServiceResponse, ServiceCategory } from '@models/service';
import { ProductResponse, ProductCategory } from '@models/product';
import { HomeService } from '@services/home/home.service';
import { TokenService } from '@services/token/token.service';
import { SME } from '@models/sme';
import { JobView } from '@models/jobs';
import { MatDialog } from '@angular/material';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { Router } from '@angular/router';
import { YoutubeVideoComponent } from 'app/shared/components/youtube-video/youtube-video.component';

@Component({
  selector: 'app-all-route',
  templateUrl: './all-route.component.html',
  styleUrls: ['./all-route.component.css']
})
export class AllRouteComponent implements OnInit {
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  services: Array<ServiceResponse>
  products: Array<ProductResponse>
  smes: Array<SME>;
  productCategories: Array<ProductCategory> = new Array<ProductCategory>()
  serviceCategories: Array<ServiceCategory> = new Array<ServiceCategory>()
  jobs: Array<JobView>
  sUuid: string
  constructor(private token: TokenService, private router: Router, private dialog: DialogService, private matDialog: MatDialog, private homePage: HomeService) { }

  ngOnInit() {

    if (this.token.isLoggedIn() && this.token.isSME()){
      this.sUuid = this.token.getSmeId()
    }

    this.homePage.services().subscribe(
      res => {
        if (!res.error) {
          this.services = res.data
        }
      }
    )
    this.homePage.topProducts().subscribe(
      res => {
        if (!res.error) {
          this.products = res.data
        }
      }
    )

    this.homePage.productCategoriesObservable().subscribe(
      res => {
        if (!res.error) {
          this.productCategories.push(...res.data)
        }
      }
    )
    this.homePage.serviceCategoriesObservable().subscribe(
      res => {
        if (!res.error) {
          this.serviceCategories.push(...res.data)
        }
      }
    )

    // let status: boolean = localStorage.getItem('video') === "true";
    // if (!status) {
    //   this.matDialog.open(YoutubeVideoComponent, this.dialog.getOpenYoutubeVideoDialog())
    // }
  }

  onScrollDown() {
    if (!this.jobs) {
      this.homePage.topJobs().subscribe(
        res => {
          if (!res.error) {
            this.jobs = res.data
          }
        }
      )
    }

    if (!this.smes) {
      if (this.token.isLoggedIn() && this.token.isSME()) {
        this.homePage.topSmesWithLogin().subscribe(
          res => {
            if (!res.error) {
              this.smes = res.data
            }
          }
        )
      } else {
        this.homePage.topSmes().subscribe(
          res => {
            if (!res.error) {
              this.smes = res.data
            }

          }
        )
      }
    }
  }
}
