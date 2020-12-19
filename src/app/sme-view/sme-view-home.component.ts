import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SmeService } from '@services/sme/sme.service';
import { PageTitleService } from '@services/page-title/page-title.service';
import { SMEInformationVo } from '@models/sme';

@Component({
  selector: 'app-sme-view-home',
  templateUrl: './sme-view-home.component.html',
  styleUrls: ['./sme-view-home.component.css']
})
export class SmeViewHomeComponent implements OnInit, OnDestroy {

  smes: SMEInformationVo
  subcription$: Subscription
  sUuid: string
  notFound: boolean
  status: string
  windowScrolled: boolean
  constructor(private route: ActivatedRoute, private smeService: SmeService,
    private title: PageTitleService, private router: Router) { }

  ngOnInit() {
    this.subcription$ = this.route.params.subscribe(params => {
      this.sUuid = params['sUuid']

      this.smeService.getSmeNameAndImage(this.sUuid).subscribe(
        res => {
          if (res.error) {
            this.notFound = true
          } else {
            this.smes = res.data;
            this.circleStatus()
            this.title.updateTitle(this.smes.smeName);
            this.title.updateMetaTitle(res.data.smeName);
            this.title.updateMetaInfo(this.smes.smeName + ', ' + this.smes.smeAddress.locality + ' , ' + this.smes.smeAddress.city)
            this.title.updateMetaURL(this.router.url);
            this.title.updateMetaImage(this.smes.logoImage);
          }
        }
      )


    })
  }
  circleStatus() {
    this.smeService.circleStatus(this.sUuid).subscribe(
      res => {
        if (!res.error) {
          this.status = res.data.status
        }

      }
    )
  }
  ngOnDestroy(): void {
    this.subcription$.unsubscribe()
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
