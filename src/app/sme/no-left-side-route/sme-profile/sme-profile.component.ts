import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LazySmeModuleService } from 'app/sme/http-service/lazy-sme-module.service';
import { SMEInformationDto } from '@models/sme';
import { Router } from '@angular/router';
declare var ga: Function;
@Component({
  selector: 'app-sme-profile',
  templateUrl: './sme-profile.component.html',
  styleUrls: ['./sme-profile.component.css']
})
export class SmeProfileComponent implements OnInit {
   
  smes: Observable<SMEInformationDto>

  constructor(private smeService: LazySmeModuleService,router:Router) { 
    ga('set', 'page', router.url);
    ga('send', 'pageview');
  }
  ngOnInit() {
    this.smeService.editSme().subscribe(
      res => {
        if (!res.error) {
          this.smes = res.data;
        }
      }
    )
  }

}
