import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '@services/page-title/page-title.service';
import { Router } from '@angular/router';
declare var ga: Function;
@Component({
  selector: 'app-cancellation-refund',
  templateUrl: './cancellation-refund.component.html',
  styleUrls: ['./cancellation-refund.component.css']
})
export class CancellationRefundComponent implements OnInit {

  constructor(private title:PageTitleService,private router:Router) { 
    ga('set', 'page', router.url);
    ga('send', 'pageview');
  }

  ngOnInit() {
    window.scrollTo(0, 0)
    this.title.updateTitle('Cancellation and Refund')
    this.title.updateMetaTitle('Cancellation and Refund')
    this.title.updateMetaInfo('Gloqr Cancellation and Refund')
    this.title.updateMetaURL(this.router.url)
  }

}
