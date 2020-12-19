import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { SmeFilterSideComponent } from '../sme-filter-side/sme-filter-side.component';
import { BusinessCircle, SMECircleDto } from '@models/business-circle';
import { ActivatedRoute, Router } from '@angular/router';
import { SmeService } from '@services/sme/sme.service';
import { TokenService } from '@services/token/token.service';
import { SMEFilterResponse } from '@models/sme';
import { environment } from 'environments/environment';
import { SnackBarService } from '@services/common/snack-bar.service';
import { SortParamFilter } from '@models/common';
import { AuthRouteComponent } from 'app/auth/auth-route/auth-route.component';
import { MatDialog } from '@angular/material';
import { DialogService } from '@services/mat-dialog/dialog.service';
const sentReqStatus = "SENT_REQ";

@Component({
  providers: [SmeFilterSideComponent],
  selector: 'app-sme-list-display',
  templateUrl: './sme-list-display.component.html',
  styleUrls: ['./sme-list-display.component.css']
})
export class SmeListDisplayComponent implements OnInit {

  @Input()
  smeFilterAndResult: SMEFilterResponse;

  smes: Array<any>;
  smesCount: number;

  @Input()
  isSME: boolean
  
  asc: string = 'asc';
  desc: string = 'desc';
  popularity: string = 'popularity'
  sortBy: string
  cityFilterParams = new Set<String>();
  categoryFilterParams = new Set<String>();
  isDisableId: string;
  //PAGINATION
  page: number = 1;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  showSpinner: boolean
  contentServer: string = environment.CONTENT_SERVER
  constructor(private smeService: SmeService, private matDialog: MatDialog,private snackBar: SnackBarService, private token: TokenService, private router: Router, private dialog: DialogService, route: ActivatedRoute) {

    route.queryParams.subscribe(
      res => {
        let s = res['sort']
        if (s === this.asc) {
          this.sortBy = this.asc
        } else if (s === this.desc) {
          this.sortBy = this.desc
        } else {
          this.sortBy = this.popularity
        }
      }
    )
  }

  ngOnInit() {
    this.smes = this.smeFilterAndResult.result;
    this.smesCount = this.smeFilterAndResult.totalSmesCount;

    const categoryFilter = this.smeFilterAndResult.filters['Category'];
    const cityFilter = this.smeFilterAndResult.filters['City'];

    categoryFilter.filter(cat => cat.selected).forEach(cat => this.categoryFilterParams.add(cat.categoryName))
    cityFilter.filter(city => city.selected).forEach(city => this.cityFilterParams.add(city.city))
  }

  onScrollDown() {

    if (this.smes.length < this.smesCount) {
      this.showSpinner = true;
      ++this.page;
      this.smeService.getSMEs(Array.from(this.categoryFilterParams), Array.from(this.cityFilterParams),this.sortBy,this.page.toString(), this.isSME).subscribe(res => {
        if (!res.error) {
          this.smesCount = res.data.totalSmesCount;
          this.smes.push(...res.data.result)
        }
        this.showSpinner = false;
      }, err => {
      })
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
          this.router.navigateByUrl('', { skipLocationChange: true }).then(() =>
            this.router.navigate(['smes/fetch']));
        }
        else if (response.error && response.customErrorCode === 101) {
          window.alert("You are already Connected with " + smeConnection.smeName);
          this.router.navigateByUrl('', { skipLocationChange: true }).then(() =>
            this.router.navigate(['smes/fetch']));
        }
        else if (response.error && response.customErrorCode === 102) {
          window.alert(smeConnection.smeName + " has already sent you a Circle Invite. Please check your 'Circle Invites Received' section in Social.")
          this.router.navigateByUrl('', { skipLocationChange: true }).then(() =>
            this.router.navigate(['smes/fetch']));
        }
        else if (response.error && response.customErrorCode === 103) {
          this.snackBar.open("Oops! you're trying to send request yourself");

          this.router.navigateByUrl('', { skipLocationChange: true }).then(() =>
            this.router.navigate(['smes/fetch']));
        }
        else {
          this.isDisableId = smeConnection.sUuid;
          this.smes[index].status = sentReqStatus
          this.snackBar.open('Invitation Sent to ' + smeConnection.smeName);
          this.router.navigateByUrl('', { skipLocationChange: true }).then(() =>
            this.router.navigate(['smes/fetch']));
        }
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
  

  onClickSMECard(sUuid) {
    let url = 'sme/' + sUuid
    window.open(url, '_blank')
  }

  sort(sortBy: string) {
    this.router.navigate([], {
      queryParams: { sort: sortBy },
      queryParamsHandling: 'merge'
    })
  }
}
