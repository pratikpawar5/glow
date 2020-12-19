import { Component, OnInit } from '@angular/core';
import { TokenService } from '@services/token/token.service';

@Component({
  selector: 'app-people-you-may-know-bread-crumbs',
  templateUrl: './people-you-may-know-bread-crumbs.component.html',
  styleUrls: ['./people-you-may-know-bread-crumbs.component.css']
})
export class PeopleYouMayKnowBreadCrumbsComponent implements OnInit {

  sUuid:string
  constructor(private token:TokenService) { }

  ngOnInit() {
    this.sUuid = this.token.getSmeId();
    
  }

}
