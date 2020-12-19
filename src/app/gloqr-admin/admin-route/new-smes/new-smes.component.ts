import { Component, OnInit } from '@angular/core';
import { GloqrAdmin, GloqrSMEVo } from '@models/sme';
import { environment } from 'environments/environment';
import { GloqrAdminService } from 'app/gloqr-admin/gloqr-admin-services/gloqr-admin.service';
const VERIFIED: string = 'false';

@Component({
  selector: 'app-new-smes',
  templateUrl: './new-smes.component.html',
  styleUrls: ['./new-smes.component.css']
})
export class NewSmesComponent implements OnInit {

  showSpinner: boolean = false

  //PAGINATION
  page: number = 0;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;

  totalSmesCount: number
  smes = new Array<GloqrSMEVo>();
  noDataFound: boolean

  contentServer: string = environment.CONTENT_SERVER

  constructor(private gloqrAdminService: GloqrAdminService) { }

  ngOnInit() {
    this.getSmes(this.page);
  }

  //ALL NEWLY REGISTERED SME WHICH ARE VERIFIED BY OUR GLOQR BDE TEAM
  getSmes(page: number) {
    this.showSpinner = true
    this.gloqrAdminService.getSMEs(page, VERIFIED).subscribe(
      res => {
        if (!res.error) {
          this.showSpinner = false
          this.totalSmesCount = res.data.totalSmes
          this.smes.push(...res.data.smes);
          if (res.data.totalSmes === 0) {
            this.noDataFound = true
          }
        } else {
          this.showSpinner = false;
        }
      }
    )
  }
  // PAGINATION
  onScrollDown() {
    this.getSmes(++this.page);
  }

}
