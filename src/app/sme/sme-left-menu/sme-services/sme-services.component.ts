import { Component, OnInit } from '@angular/core';
import { ServiceVO } from '@models/service';
import { environment } from 'environments/environment';
import { LazySmeModuleService } from 'app/sme/http-service/lazy-sme-module.service';
import { PageTitleService } from '@services/page-title/page-title.service';
import { Router } from '@angular/router';
declare var ga: Function;
@Component({
  selector: 'app-sme-services',
  templateUrl: './sme-services.component.html',
  styleUrls: ['./sme-services.component.css']
})
export class SmeServicesComponent implements OnInit {

  services:Array<ServiceVO>
  contentServer:string = environment.CONTENT_SERVER
  showSpinner:boolean = true
  notFound:boolean

  constructor(private lazyService:LazySmeModuleService,private title:PageTitleService,router:Router) { 
    ga('set', 'page', router.url);
    ga('send', 'pageview');
  }

  ngOnInit() {
    this.title.updateTitle('Services')
    this.lazyService.smeServices('all').subscribe(
      res => {
        if(res.error){
          this.showSpinner = false
          this.notFound = true
        }else{
          this.showSpinner = false
          this.services = res.data
        }
      },
      err => {
        this.showSpinner = false
        this.notFound = true
      }
    )
  }


}
