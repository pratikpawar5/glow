import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-job-bread-crumbs',
  templateUrl: './job-bread-crumbs.component.html',
  styleUrls: ['./job-bread-crumbs.component.css']
})
export class JobBreadCrumbsComponent implements OnInit {

  @Input()
  breadcrumbs:any
  constructor() { }

  ngOnInit() {
  }

}
