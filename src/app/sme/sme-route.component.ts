import { Component, OnInit, HostListener } from '@angular/core';
import { SmeService } from '@services/sme/sme.service';
import { TokenService } from '@services/token/token.service';
import { PageTitleService } from '@services/page-title/page-title.service';
import { Router } from '@angular/router';
import { SMEInformationVo } from '@models/sme';

@Component({
  selector: 'app-sme-route',
  templateUrl: './sme-route.component.html',
  styleUrls: ['./sme-route.component.css']
})
export class SmeRouteComponent implements OnInit {
  smes: SMEInformationVo
  notFound: boolean
  windowScrolled: boolean

  constructor(private smeService: SmeService, private token: TokenService,
    private title: PageTitleService, private router: Router) { }

  ngOnInit() {
    this.smeService.getSmeNameAndImage(this.token.getSmeId()).subscribe(
      res => {
        if (res.error) {
        }
        else {
          this.smes = res.data
          this.title.updateTitle(this.smes.smeName)
          this.title.updateMetaTitle(res.data.smeName)
          this.title.updateMetaInfo(this.smes.smeName + ', ' + this.smes.smeAddress.locality +
            ', ' + this.smes.smeAddress.city)
          this.title.updateMetaURL(this.router.url)
          this.title.updateMetaImage(this.smes.logoImage)
        }
      }
    )
    window.scrollTo(0, 0)
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
