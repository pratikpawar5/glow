import { Component, OnInit, Input } from '@angular/core';
import { JobView } from '@models/jobs';

@Component({
  selector: 'app-vacancy-detail-page-breadcrumbs',
  templateUrl: './vacancy-detail-page-breadcrumbs.component.html',
  styleUrls: ['./vacancy-detail-page-breadcrumbs.component.css']
})
export class VacancyDetailPageBreadcrumbsComponent implements OnInit {

  @Input()
  smeJob: JobView

  constructor() { }

  ngOnInit() {
  }

 
}
