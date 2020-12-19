import { Component, OnInit } from '@angular/core';
import { TokenService } from '@services/token/token.service';

@Component({
  selector: 'app-my-connection-bread-crumbs',
  templateUrl: './my-connection-bread-crumbs.component.html',
  styleUrls: ['./my-connection-bread-crumbs.component.css']
})
export class MyConnectionBreadCrumbsComponent implements OnInit {

  sUuid:string
  constructor(private token:TokenService) { }

  ngOnInit() {
    this.sUuid = this.token.getSmeId();
    
  }

}
