import { Component, OnInit } from '@angular/core';
import {  SMEInformationVo } from '@models/sme';
import { SmeService } from '@services/sme/sme.service';
import { TokenService } from '@services/token/token.service';

@Component({
  selector: 'app-sme-admin-page',
  templateUrl: './sme-admin-page.component.html',
  styleUrls: ['./sme-admin-page.component.css']
})
export class SmeAdminPageComponent implements OnInit {

  smes:SMEInformationVo

  constructor(private smeService:SmeService,private token:TokenService) { }

  ngOnInit() {

    let sUuid=this.token.getSmeId();

    this.smeService.getSmeNameAndImage(sUuid).subscribe(
      res => {
        if(!res.error)
        {
          this.smes=res.data;
        }
      }
    )
  }

}
