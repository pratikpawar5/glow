import { Component, OnInit, Input } from '@angular/core';
import { PageTitleService } from '@services/page-title/page-title.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-breadcrumb',
  templateUrl: './service-breadcrumb.component.html',
  styleUrls: ['./service-breadcrumb.component.css']
})
export class ServiceBreadcrumbComponent implements OnInit {

  @Input()
  category:any

  constructor(private title:PageTitleService,private router:Router) { }

  ngOnInit() {
    if(this.category.subCategories){
      this.title.updateTitle(this.category.categoryName)
      this.title.updateMetaInfo(this.category.categoryName)
      this.title.updateMetaTitle(this.category.categoryName)
    }else{
      this.title.updateTitle(this.category.subCategoryName)
      this.title.updateMetaInfo(this.category.subCategoryName)
      this.title.updateMetaTitle(this.category.subCategoryName)
    }
    this.title.updateMetaImage(this.category.fileLocation)
    this.title.updateMetaURL(this.router.url)
  }
}
