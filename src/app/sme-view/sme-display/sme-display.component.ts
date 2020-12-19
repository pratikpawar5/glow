import { Component, OnInit } from '@angular/core';
import { SMEInformationDto } from '@models/sme';
import { SMEImage } from '@models/sme-image';
import { ActivatedRoute, Router } from '@angular/router';
import { LazySmeViewService } from '../http-service/lazy-sme-view.service';
import { SmeService } from '@services/sme/sme.service';
import { ItemsCount } from '@models/sme-items-count';
declare var ga: Function;

@Component({
  selector: 'app-sme-display',
  templateUrl: './sme-display.component.html',
  styleUrls: ['./sme-display.component.css']
})
export class SmeDisplayComponent implements OnInit {

  smes: SMEInformationDto

  sliderImages: Array<SMEImage>

  viewModeItemsCount: ItemsCount

  constructor(private route: ActivatedRoute, private smeService: SmeService, private lazySmeService: LazySmeViewService, router: Router) {
    ga('set', 'page', router.url);
    ga('send', 'pageview');
  }

  ngOnInit() {
    let sUuid = this.route.snapshot.root.firstChild.children[0].params['sUuid']
    this.lazySmeService.viewSME(sUuid).subscribe(
      res => {
        if (!res.error) {
          this.smes = res.data
          this.sliderImages = res.data.homeSliderImages
        }
      }
    )

    this.smeService.getSmeObjectCountForViewModeObservable().subscribe(
      res => {
        if (res.error) {

        }
        else {
          this.viewModeItemsCount = res.data
        }
      }
    )
  }

}
