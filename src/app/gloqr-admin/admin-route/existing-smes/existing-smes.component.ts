import { Component, OnInit } from '@angular/core';
import { GloqrAdmin, GloqrSMEVo } from '@models/sme';
import { environment } from 'environments/environment.prod';
import { GloqrAdminService } from 'app/gloqr-admin/gloqr-admin-services/gloqr-admin.service';
const VERIFIED: string = 'true';
@Component({
  selector: 'app-existing-smes',
  templateUrl: './existing-smes.component.html',
  styleUrls: ['./existing-smes.component.css']
})
export class ExistingSmesComponent implements OnInit {
  showSpinner: boolean = false
  
  //PAGINATION
  page: number = 0;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;

  totalSmesCount:number
  smes = new Array<GloqrSMEVo>();
  noDataFound:boolean

  
  contentServer: string = environment.CONTENT_SERVER
  constructor(private gloqrAdminService: GloqrAdminService) { }

  ngOnInit() {
    this.getSmes(this.page);
  }

  //ALL EXISTING SME WHICH ARE VERIFIED BY OUR GLOQR BDE TEAM
  getSmes(page: number){
    this.showSpinner=true
    this.gloqrAdminService.getSMEs(page,VERIFIED).subscribe(
      res => {  
        if (res.code == 200) {
          this.showSpinner=false
          this.totalSmesCount=res.data.totalSmes
          if(res.data.totalSmes == 0)
          {
            this.noDataFound = true
          }
          this.smes.push(...res.data.smes);
        }else{
          this.showSpinner=false;
          this.noDataFound=true;
        }

      }
    )
  }

  // PAGINATION

  onScrollDown() {
    this.getSmes(++this.page);
  }
}
