import { Component, OnInit, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { SmeService } from '@services/sme/sme.service';
import { PageTitleService } from '@services/page-title/page-title.service';
import { filter } from 'rxjs/operators';
import { SMEFilterResponse } from '@models/sme';
import { TokenService } from '@services/token/token.service';
declare var ga: Function;
@Component({
  selector: 'app-sme-filter-display',
  templateUrl: './sme-filter-display.component.html',
  styleUrls: ['./sme-filter-display.component.css']
})
export class SmeFilterDisplayComponent implements OnInit {

  showSpinner: boolean = false;
  smeFilterAndResult: SMEFilterResponse;
  sUuid: string;
  isSME: boolean = false;
  windowScrolled: boolean;
  constructor(private router: Router, private smeService: SmeService, private token: TokenService,
    private pageTitleService: PageTitleService, route: ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    route.queryParams.subscribe(
      res => {
        if (this.token.isLoggedIn() && this.token.isSME()) {
          this.isSME = true
          this.forSME(router.url)
        } else {
          this.isSME = false
          this.forUser(router.url);
        }
      }
    )
  }

  ngOnInit() {
    this.pageTitleService.updateTitle('SME Filter')
    window.scrollTo(0, 0);
  }

  forUser(url: string) {
    this.showSpinner = true
    this.smeService.smes(url).subscribe(res => {
      if (!res.error) {
        this.smeFilterAndResult = res.data
        this.showSpinner = false
      }
    })
  }


  forSME(url: string) {
    this.showSpinner = true
    this.smeService.getSMEsFromCircle(url).subscribe(
      res => {
        if (!res.error) {
          this.smeFilterAndResult = res.data
          this.showSpinner = false
        }
      },
    )
  }


  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (window.pageYOffset > 500) {
      this.windowScrolled = true;
    }
    else if (this.windowScrolled && window.pageYOffset < 50) {
      this.windowScrolled = false;
    }
  }
}
