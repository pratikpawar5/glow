import { Component, OnInit , HostListener} from '@angular/core';
import { TokenService } from '@services/token/token.service';
import { PageTitleService } from '@services/page-title/page-title.service';
import { SmeService } from '@services/sme/sme.service';
import { LazySmeModuleService } from '../http-service/lazy-sme-module.service';
import { SMEInformationVo } from '@models/sme';

@Component({
  selector: 'app-no-left-side-route',
  templateUrl: './no-left-side-route.component.html',
  styleUrls: ['./no-left-side-route.component.css']
})
export class NoLeftSideRouteComponent implements OnInit {

  smes:SMEInformationVo
  windowScrolled: boolean
  constructor(private smeService:LazySmeModuleService,private token:TokenService,
    private pageTitleService:PageTitleService) { }

  ngOnInit() {
    this.smeService.getSmeNameAndImage(this.token.getSmeId()).subscribe(
      res => {
        if(!res.error)
        {
          this.smes = res.data
          this.pageTitleService.updateTitle(res.data.smeName)
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
