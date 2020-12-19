import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sme-filter-bread-crumbs',
  templateUrl: './sme-filter-bread-crumbs.component.html',
  styleUrls: ['./sme-filter-bread-crumbs.component.css']
})
export class SmeFilterBreadCrumbsComponent implements OnInit {

  @Input()
  breadcrumbs:any
  constructor() { }

  ngOnInit() {
  }

}
