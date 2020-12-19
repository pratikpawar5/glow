import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '@services/page-title/page-title.service';
import { Router } from '@angular/router';
declare var ga: Function;
@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit {

  constructor(private title:PageTitleService,private router:Router) { 
    ga('set', 'page', router.url);
    ga('send', 'pageview');
  }

  ngOnInit() {
    window.scrollTo(0, 0)
    this.title.updateTitle('Privacy Policy')
    this.title.updateMetaTitle('Privacy Policy')
    this.title.updateMetaInfo('Gloqr Privacy Policy')
    this.title.updateMetaURL(this.router.url)
  }

}
