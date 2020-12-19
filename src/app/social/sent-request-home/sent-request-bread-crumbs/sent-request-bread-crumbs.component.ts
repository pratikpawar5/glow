import { Component, OnInit } from '@angular/core';
import { TokenService } from '@services/token/token.service';

@Component({
  selector: 'app-sent-request-bread-crumbs',
  templateUrl: './sent-request-bread-crumbs.component.html',
  styleUrls: ['./sent-request-bread-crumbs.component.css']
})
export class SentRequestBreadCrumbsComponent implements OnInit {
  
  sUuid:string
  constructor(private token:TokenService) { }

  ngOnInit() {
    this.sUuid = this.token.getSmeId();
    
  }

}
