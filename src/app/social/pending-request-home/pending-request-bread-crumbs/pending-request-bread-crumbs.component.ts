import { Component, OnInit } from '@angular/core';
import { TokenService } from '@services/token/token.service';

@Component({
  selector: 'app-pending-request-bread-crumbs',
  templateUrl: './pending-request-bread-crumbs.component.html',
  styleUrls: ['./pending-request-bread-crumbs.component.css']
})
export class PendingRequestBreadCrumbsComponent implements OnInit {
  sUuid:string
  constructor(private token:TokenService) { }

  ngOnInit() {
    this.sUuid = this.token.getSmeId();
    
  }
}
