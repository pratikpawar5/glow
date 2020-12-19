import { Component, OnInit } from '@angular/core';
import { LazySmeModuleService } from 'app/sme/http-service/lazy-sme-module.service';
import { ProductVO } from '@models/product';
import { environment } from 'environments/environment';
import { PageTitleService } from '@services/page-title/page-title.service';
import { Router } from '@angular/router';
declare var ga: Function;
@Component({
  selector: 'app-sme-products',
  templateUrl: './sme-products.component.html',
  styleUrls: ['./sme-products.component.css']
})
export class SmeProductsComponent implements OnInit {

  products:Array<ProductVO>
  contentServer:string = environment.CONTENT_SERVER
  showSpinner:boolean = true
  notFound:boolean

  constructor(private lazyService:LazySmeModuleService,private title:PageTitleService,router:Router) { 
    ga('set', 'page', router.url);
    ga('send', 'pageview');
  }

  ngOnInit() {
    this.title.updateTitle('Products')
    this.lazyService.smeProducts('all').subscribe(
      res => {
        if(res.error){
          this.showSpinner = false
          this.notFound = true
        }else{
          this.products = res.data
          this.showSpinner = false
        }
      },
      err => {
        this.showSpinner = false
        this.notFound = true
      }
    )
  }

}
