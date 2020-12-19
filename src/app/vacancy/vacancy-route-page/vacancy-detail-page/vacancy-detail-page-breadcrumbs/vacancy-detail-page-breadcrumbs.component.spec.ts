import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancyDetailPageBreadcrumbsComponent } from './vacancy-detail-page-breadcrumbs.component';

describe('VacancyDetailPageBreadcrumbsComponent', () => {
  let component: VacancyDetailPageBreadcrumbsComponent;
  let fixture: ComponentFixture<VacancyDetailPageBreadcrumbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacancyDetailPageBreadcrumbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacancyDetailPageBreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
