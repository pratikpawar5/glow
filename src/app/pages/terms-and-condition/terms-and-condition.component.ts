import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '@services/page-title/page-title.service';
import { Router } from '@angular/router';
declare var ga: Function;
@Component({
  selector: 'app-terms-and-condition',
  templateUrl: './terms-and-condition.component.html',
  styleUrls: ['./terms-and-condition.component.css']
})
export class TermsAndConditionComponent implements OnInit {

  constructor(private title:PageTitleService,private router:Router) { 
    ga('set', 'page', router.url);
    ga('send', 'pageview');
  }

  ngOnInit() {
    window.scrollTo(0, 0)
    this.title.updateTitle('Terms of Use')
    this.title.updateMetaTitle('Terms of Use')
    this.title.updateMetaInfo('Gloqr Terms of Use,Terms and Conditions')
    this.title.updateMetaURL(this.router.url)
  }

}
