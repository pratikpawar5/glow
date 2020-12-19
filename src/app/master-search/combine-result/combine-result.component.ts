import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchServiceService } from '@services/search/search-service.service';
import { ProductResponse } from '@models/product';
import { ServiceResponse } from '@models/service';
import { SMEInformationVo } from '@models/sme';
import { environment } from 'environments/environment';
import { NguCarouselConfig } from '@ngu/carousel';
import { TokenService } from '@services/token/token.service';
import { FilterResult } from '@models/filter';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { MatDialog } from '@angular/material';
import { BusinessInterestService } from '@services/shared/business-interest.service';
import { AuthRouteComponent } from 'app/auth/auth-route/auth-route.component';
import { ItemType } from '@models/cart';
import { SMECircleDto, BusinessCircle } from '@models/business-circle';
import { SmeService } from '@services/sme/sme.service';
import { SnackBarService } from '@services/common/snack-bar.service';
const sentReqStatus = "SENT_REQ";

@Component({
  selector: 'app-combine-result',
  templateUrl: './combine-result.component.html',
  styleUrls: ['./combine-result.component.css']
})
export class CombineResultComponent implements OnInit {

  products: FilterResult<ProductResponse>
  services: FilterResult<ServiceResponse>
  smes: Array<SMEInformationVo>;

  isDisableId: string;

  notFound: boolean
  spinner: boolean
  sUuid: string

  contentServer: string = environment.CONTENT_SERVER

  carousel: NguCarouselConfig = {
    grid: { xs: 1, sm: 3, md: 5, lg: 6, all: 0 },
    slide: 3,
    speed: 150,
    point: {
      visible: false
    },
    load: 6,
  }
  searchText: string
  isSME: boolean

  constructor(private smeService: SmeService, route: ActivatedRoute, private searchService: SearchServiceService,
    private token: TokenService, private dialog: DialogService, private matDialog: MatDialog,
    private bi: BusinessInterestService, private snackBar: SnackBarService, private router: Router) {
    route.queryParams.subscribe(
      res => {
        this.searchText = res['searchText'];
        this.getData()
      }
    )
  }

  ngOnInit() {
    if (this.token.isLoggedIn()) {
      if (this.token.isSME()) {
        this.sUuid = this.token.getSmeId()
        this.isSME = true;
      }
    }
  }

  getData() {
    this.notFound = false
    this.spinner = true
    this.searchService.combinSearchResult(this.searchText).subscribe(
      res => {
        if (res.error) {
          this.notFound = true
          this.products = this.services = this.smes = undefined
        } else {
          this.products = res.data.searchedResult.products
          this.services = res.data.searchedResult.services
          this.smes = res.data.searchedResult.smes
        }
        this.spinner = false
      },
      err => {
        this.notFound = true
        this.spinner = false
        this.products = this.services = this.smes = undefined
      }
    )
  }

  businessInterest(itemUuid: string, index: number) {
    if (this.token.isLoggedIn()) {

      this.services.response.result[index].addedToCart = true
      this.bi.generate(itemUuid, 1, ItemType.SERVICE, this.services.response.result[index].sUuid, false)

    } else {

      let ref = this.matDialog.open(AuthRouteComponent, this.dialog.loginConfig())
      ref.afterClosed().subscribe(
        res => {
          if (res) {
            this.services.response.result[index].addedToCart = true
            this.bi.generate(itemUuid, 1, ItemType.SERVICE, this.services.response.result[index].sUuid, true)
          }
        }
      )
    }
  }

  businessInterestProduct(itemUuid: string, index: number) {
    if (this.token.isLoggedIn()) {

      this.products.response.result[index].addedToCart = true
      this.bi.generate(itemUuid, 1, ItemType.PRODUCT, this.products.response.result[index].sUuid, false)

    } else {

      let ref = this.matDialog.open(AuthRouteComponent, this.dialog.loginConfig())
      ref.afterClosed().subscribe(
        res => {
          if (res) {
            this.products.response.result[index].addedToCart = true
            this.bi.generate(itemUuid, 1, ItemType.PRODUCT, this.products.response.result[index].sUuid, true)
          }
        }
      )
    }
  }


  onSendRequest(smeConnection: SMECircleDto, index) {
    this.isDisableId = smeConnection.sUuid;
    let circle = new BusinessCircle()
    circle.smeId = smeConnection.sUuid

    this.smeService.addBusinessRequest(circle).subscribe(
      response => {
        if (response.error && response.code === 404) {
          this.isDisableId = null
          window.alert("This functionality will be active as soon as your SME is Verified by our gloqr team")
        }
        else if (response.error && response.customErrorCode === 100) {
          window.alert("Request has already been sent to " + smeConnection.smeName);
        }
        else if (response.error && response.customErrorCode === 101) {
          window.alert("You are already Connected with " + smeConnection.smeName);
        }
        else if (response.error && response.customErrorCode === 102) {
          window.alert(smeConnection.smeName + " has already sent you a Circle Invite. Please check your 'Circle Invites Received' section in Social.")
        }
        else if (response.error && response.customErrorCode === 103) {
          this.snackBar.open("Oops! you're trying to send request yourself");
        }
        else {
          this.isDisableId = smeConnection.sUuid;
          this.smes[index].status = sentReqStatus
          this.snackBar.open('Invitation Sent to ' + smeConnection.smeName);
        }
        window.location.reload();
      },
    )
  }

  onClickCircleInvite(smeConnection: SMECircleDto, index) {
    if (!this.token.isLoggedIn()) {
      const dialogRef = this.matDialog.open(AuthRouteComponent, this.dialog.loginConfig())
      dialogRef.afterClosed().subscribe(
        res => {
          if (this.token.isLoggedIn() && this.token.isSME()) {
            this.onSendRequest(smeConnection, index);
          }
          else if (this.token.isLoggedIn() && this.token.isNormalUser()) {
            let c1 = window.confirm("To connect with " + smeConnection.smeName + " you need to Register as SME on gloqr. Click 'OK' to register on gloqr");
            if (c1 === true) {
              this.router.navigateByUrl('/pricing');
            }
          }
        }
      )
    }
    else {
      if (this.token.isSME()) {
        this.onSendRequest(smeConnection, index);
      }
      else if (this.token.isNormalUser()) {
        let c2 = window.confirm("To connect with " + smeConnection.smeName + " you need to Register as SME on gloqr. Click 'OK' to register on gloqr");
        if (c2 === true) {
          this.router.navigateByUrl('/pricing');
        }
      }
    }

  }


}
