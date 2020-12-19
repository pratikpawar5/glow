import { Component, OnInit, HostListener } from '@angular/core';
import { SocialService } from './social-service/social.service';
import { TokenService } from '@services/token/token.service';
import { BusinessCircle } from '@models/business-circle';
import { SmeService } from '@services/sme/sme.service';
import { SMEInformationVo } from '@models/sme';
import { PageTitleService } from '@services/page-title/page-title.service';
import { Router } from '@angular/router';
declare var ga: Function;
@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {

  profileResponse: BusinessCircle;
  smes: SMEInformationVo
  profileTrue: boolean = false
  windowScrolled: boolean

  constructor(private socialService: SocialService, private token: TokenService, private smeService: SmeService,
    private title: PageTitleService, private router: Router, ) {
    ga('set', 'page', router.url);
    ga('send', 'pageview');
  }

  ngOnInit() {
    let sUuid = this.token.getSmeId();
    this.socialService.getCircleCount().subscribe(
      res => {
        if (res.error && res.code === 404) {
          this.profileResponse = new BusinessCircle();
        }
        else {
          this.profileResponse = res.data;
        }
      }
    )

    this.smeService.getSmeNameAndImage(sUuid).subscribe(res => {
      if (!res.error) {
        this.smes = res.data
        this.title.updateTitle(this.smes.smeName)
        this.title.updateMetaTitle(res.data.smeName)
        this.title.updateMetaInfo(this.smes.smeName + ', ' + this.smes.smeAddress.locality +
          ', ' + this.smes.smeAddress.city)
        this.title.updateMetaURL(this.router.url)
        this.title.updateMetaImage(this.smes.logoImage)
      }
    })
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
