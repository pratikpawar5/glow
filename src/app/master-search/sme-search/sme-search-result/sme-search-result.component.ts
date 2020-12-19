import { Component, OnInit, Input } from '@angular/core';
import { SMEInformationVo, SMEFilterResponse } from '@models/sme';
import { environment } from 'environments/environment';
import { TokenService } from '@services/token/token.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchServiceService } from '@services/search/search-service.service';
import { SMECircleDto, BusinessCircle } from '@models/business-circle';
import { SmeService } from '@services/sme/sme.service';
import { SnackBarService } from '@services/common/snack-bar.service';
import { AuthRouteComponent } from 'app/auth/auth-route/auth-route.component';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { MatDialog } from '@angular/material';
const sentReqStatus = "SENT_REQ";
@Component({
  selector: 'app-sme-search-result',
  templateUrl: './sme-search-result.component.html',
  styleUrls: ['./sme-search-result.component.css']
})
export class SmeSearchResultComponent implements OnInit {

  @Input()
  filterAndResult: SMEFilterResponse;

  @Input()
  isSME: boolean

  isDisableId: string;
  asc: string = 'asc';
  desc: string = 'desc';
  popularity: string = 'popularity'
  sortBy: string
  smes: Array<SMEInformationVo>;
  contentServer: string = environment.CONTENT_SERVER
  searchText: string
  smesCount: number

  //PAGINATION
  page: number = 1;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;

  showSpinner: boolean

  constructor(private smeService: SmeService, private matDialog: MatDialog, private dialog: DialogService, private token: TokenService, private router: Router, private route: ActivatedRoute, private searchService: SearchServiceService, private snackBar: SnackBarService) {

    route.queryParams.subscribe(
      res => {
        this.searchText = res['searchText']
        let s = res['sort']
        if (s === this.asc) {
          this.sortBy = this.asc
        } else if (s === this.desc) {
          this.sortBy = this.desc
        } else {
          this.sortBy = this.popularity
        }
      })
  }

  ngOnInit() {
    this.smes = this.filterAndResult.result
    this.smesCount = this.filterAndResult.totalSmesCount;
  }

  onScrollDown() {

    if (this.smes.length < this.smesCount) {
      ++this.page;
      this.showSpinner = true
      this.searchService.getSMESearchResult(this.router.url.substring(1), this.isSME, this.page.toString()).subscribe(res => {
        if (!res.error) {
          this.smesCount = res.data.totalSmesCount;
          this.smes.push(...res.data.result)
        }
        this.showSpinner = false
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
          window.alert("Request has already been sent to "+ smeConnection.smeName);
        }
        else if (response.error && response.customErrorCode === 101) {
          window.alert("You are already Connected with " + smeConnection.smeName);
        }
        else if (response.error && response.customErrorCode === 102) {
          window.alert(smeConnection.smeName + " has already sent you a Circle Invite. Please check your 'Circle Invites Received' section in Social.")
        }
        else if (response.error && response.customErrorCode === 103) {
          window.alert("Oops! you're trying to send request yourself")
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

  sort(sortBy: string) {
    this.router.navigate([], {
      queryParams: { sort: sortBy },
      queryParamsHandling: 'merge'
    })
  }

}
