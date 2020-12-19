import { Component, OnInit } from '@angular/core';
import { SmeService } from '@services/sme/sme.service';
import { TokenService } from '@services/token/token.service';
import { SMEInformationDto } from '@models/sme';
import { Router } from '@angular/router';
import { EditModeItemsCount, ItemsCount } from '@models/sme-items-count';
import { SMEImage } from '@models/sme-image';
declare var ga: Function;
@Component({
  selector: 'app-sme-home',
  templateUrl: './sme-home.component.html',
  styleUrls: ['./sme-home.component.css']
})
export class SmeHomeComponent implements OnInit {
  smes: SMEInformationDto
  sliderImages: Array<SMEImage>
  editModeItemsCount: ItemsCount
  constructor(private smeService: SmeService, private token: TokenService, router: Router) {
    ga('set', 'page', router.url);
    ga('send', 'pageview');
  }

  ngOnInit() {
    this.smeService.editSme().subscribe(
      res => {
        if (!res.error) {
          this.smes = res.data
          this.sliderImages = this.smes.homeSliderImages
        }
      }
    )

    this.smeService.getSmeObjectCountForEditMode('individualTotal').subscribe(
      res => {
        if (res.error) {

        }
        else {
          this.editModeItemsCount = res.data
        }
      }
    )
  }

}
