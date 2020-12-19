import { Component, OnInit, HostListener } from '@angular/core';
import { TokenService } from '@services/token/token.service';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { CartService } from '@services/cart/cart.service';
import { environment } from 'environments/environment';
import { FormControl } from '@angular/forms';
import { SearchServiceService } from '@services/search/search-service.service';
import { PageTitleService } from '@services/page-title/page-title.service';
import { MatDialog } from '@angular/material';
import { AuthRouteComponent } from 'app/auth/auth-route/auth-route.component';
import { BusinessCircle } from '@models/business-circle';
import { ExtraService } from '@services/common/extra.service';
import { SearchHistory, SearchCategory } from '@models/common';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';
import { YoutubeVideoComponent } from 'app/shared/components/youtube-video/youtube-video.component';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})

//gloqr home page header
export class MainHeaderComponent implements OnInit {

  isLoggedIn: boolean
  isSME: boolean
  isNormalUser: boolean
  sUuid: string
  cartCount: number
  initialTrue: boolean
  /**Search*/
  searchCategory: Array<string> = [
    'All', 'Products', 'Services', "SME"
  ]
  selectedCategory: string = this.searchCategory[0]
  searchText = new FormControl();
  searchHistory: Array<SearchHistory>

  productSuggests: Array<string>
  serviceSuggests: Array<string>
  smeSuggests: Array<string>

  PRODUCT = SearchCategory.PRODUCT
  SERVICE = SearchCategory.SERVICE
  SME = SearchCategory.SME
  ALL = SearchCategory.ALL

  userName: string
  uuid: string
  profileImage: string
  contentServer: string = environment.CONTENT_SERVER

  /*Social Count */
  profileResponse: BusinessCircle;
  myconnectionCount: number = 0
  sentCount: number = 0
  pendingCount: number = 0
  constructor(private token: TokenService, private dialog: DialogService, private matDialog: MatDialog,
    private cart: CartService, private searchService: SearchServiceService, private extraService: ExtraService, private title: PageTitleService,
    private router: Router) { }

  ngOnInit() {
    this.token.checkLogin().subscribe(
      res => {
        if (res) {
          this.isLoggedIn = true
          this.uuid = this.token.getUserId();
          this.userName = this.token.getUserName();
          this.cart.countFromSever();
          if (this.token.getProfileImage()) {
            this.profileImage = this.token.getProfileImage();
          }
          else {
            this.initialTrue = true
          }

          if (this.token.isSME()) {
            this.isSME = true
            this.isNormalUser = false
            this.sUuid = this.token.getSmeId()

            this.extraService.getCircleCount().subscribe(
              res => {
                if (res.error && res.code === 404) {

                }
                else {
                  this.profileResponse = res.data;
                  this.myconnectionCount = this.profileResponse.connectionCount
                  this.sentCount = this.profileResponse.sendReqCount
                  this.pendingCount = this.profileResponse.receivedReqCount
                }
              }
            )
          }
          if (this.token.isNormalUser()) {
            this.isNormalUser = true
          }
        } else {
          this.isSME = false
          this.isNormalUser = false
        }
      }
    )

    this.title.defaultTitle()

    this.cart.getCartCount().subscribe(
      res => {
        this.cartCount = res
      }
    )

    this.searchText.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe(
      value => {
        if (value == undefined || value.length < 2) {
          this.productSuggests = this.serviceSuggests = this.smeSuggests = undefined
        } else {
          this.getSearchSuggest(value, this.selectedCategory)
        }
      }
    )

    let history = JSON.parse(localStorage.getItem('searchHistory'));
    this.searchHistory = history
  }

  checkImage(imageUrl: string) {
    if (imageUrl != null && imageUrl.startsWith("https://")) {
      return false
    }
    return true
  }

  getSearchSuggest(searchText: string, searchModule: string) {

    if (this.selectedCategory === 'Products') {
      this.searchService.productSearchSuggest(searchText).subscribe(
        res => {
          if (!res.error) {
            this.productSuggests = res.data
            this.serviceSuggests = undefined
            this.smeSuggests = undefined
          }
        }
      )
    } else if (this.selectedCategory === 'Services') {
      this.searchService.serviceSearchSuggest(searchText).subscribe(
        res => {
          if (!res.error) {
            this.serviceSuggests = res.data
            this.productSuggests = undefined
            this.smeSuggests = undefined
          }
        }
      )
    } else if (this.selectedCategory === 'SME') {
      this.searchService.smeSearchSuggest(searchText).subscribe(
        res => {
          if (!res.error) {
            this.smeSuggests = res.data
            this.serviceSuggests = undefined
            this.productSuggests = undefined
          }
        }
      )
    } else {
      this.searchService.allSearchSuggest(searchText, searchModule).subscribe(
        res => {
          if (!res.error) {
            this.productSuggests = res.data.suggestedResult.products
            this.serviceSuggests = res.data.suggestedResult.services
            this.smeSuggests = res.data.suggestedResult.smes
          }
        }
      )
    }
  }

  onClickCategory(value: string) {
    this.selectedCategory = value;
    this.productSuggests = this.serviceSuggests = this.smeSuggests = undefined
  }

  scrolltoTop() {
    window.scrollTo(0, 0)
  }

  login() {
    let ref = this.matDialog.open(AuthRouteComponent, this.dialog.loginConfig())
    ref.afterClosed().subscribe(
      res => {
        if (res) {
          window.location.reload()
        }
      }
    )
  }

  logout() {
    this.token.clearTokenAndLogout()
  }

  searchBtnClick() {
    let searchText: string = this.searchText.value
    if (searchText && searchText.trim() != "") {
      if (this.selectedCategory === 'Products') {
        this.router.navigate(['search', 'p'], { queryParams: { "searchText": searchText.trim() } })
        this.addHistory(searchText, SearchCategory.PRODUCT)
      } else if (this.selectedCategory === 'Services') {
        this.router.navigate(['search', 's'], { queryParams: { "searchText": searchText.trim() } })
        this.addHistory(searchText, SearchCategory.SERVICE)
      }
      else if (this.selectedCategory === 'SME') {
        this.router.navigate(['search', 'res'], { queryParams: { "searchText": searchText.trim() } })
        this.addHistory(searchText, SearchCategory.SME)
      }
      else {
        this.router.navigate(['search', 'all'], { queryParams: { "searchText": searchText.trim() } })
        this.addHistory(searchText, SearchCategory.ALL)
      }
    }
  }

  addHistory(searchObj: any, searchCategory: SearchCategory) {
    let history = new SearchHistory();
    history.data = searchObj
    history.type = searchCategory

    if (!this.searchHistory) {
      this.searchHistory = new Array<SearchHistory>();
    }

    let alreadyPresent: boolean = false

    for (let s of this.searchHistory) {
      let searchText = searchObj
      let matchStr = s.data
      if (searchText == matchStr) {
        alreadyPresent = true
        break;
      }
    }

    if (!alreadyPresent) {
      this.searchHistory.push(history)
      this.searchHistory.reverse()
      localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory))
    }
  }
  openVideoPopUp() {
    this.matDialog.open(YoutubeVideoComponent, this.dialog.getOpenYoutubeVideoDialog())
  }
  inputFocus: boolean
  onFocus() {
    this.inputFocus = true
  }
}
