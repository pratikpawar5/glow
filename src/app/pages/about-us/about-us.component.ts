import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '@services/page-title/page-title.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
// import { } from '@types/gapi';
// import { } from '@types/gapi.auth2';

declare var ga: Function;
declare var gapi: any;


@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  authConfig: any
  auth2: any;
  constructor(private title: PageTitleService, private router: Router, private http: HttpClient) {
    ga('set', 'page', router.url);
    ga('send', 'pageview');
  }

  ngOnInit() {
    this.title.updateTitle('About Us')
    this.title.updateMetaTitle('About Us')
    this.title.updateMetaInfo('Gloqr About Us')
    this.title.updateMetaURL(this.router.url)
    window.scrollTo(0, 0)

    this.authConfig = {
      client_id: '596330013132-03h35jjs12j92apavcsnoj41euk8e897.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/contacts.readonly'
    };

  }

  // googleContacts() {
  //   gapi.client.setApiKey('AIzaSyAX7IGEdkVuXccCwJX3Y6-3mop3RX_-8vA');
  //   gapi.auth2.authorize(this.authConfig, this.handleAuthorization);
  // }

  handleAuthorization = (authorizationResult) => {
    if (authorizationResult && !authorizationResult.error) {
      let url: string = "https://www.google.com/m8/feeds/contacts/default/thin?" +
         "alt=json&max-results=500&v=3.0&access_token=" +
         authorizationResult.access_token;
      this.http.get<any>(url)
        .subscribe(
          response => {
            if (response.feed && response.feed.entry) {
            }
          }
        )
    }
  }

}