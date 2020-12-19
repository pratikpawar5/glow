import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobBreadCrumbsComponent } from './job-bread-crumbs.component';

describe('JobBreadCrumbsComponent', () => {
  let component: JobBreadCrumbsComponent;
  let fixture: ComponentFixture<JobBreadCrumbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobBreadCrumbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobBreadCrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
