import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSeekerAppliedJobsComponent } from './job-seeker-applied-jobs.component';

describe('JobSeekerAppliedJobsComponent', () => {
  let component: JobSeekerAppliedJobsComponent;
  let fixture: ComponentFixture<JobSeekerAppliedJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobSeekerAppliedJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobSeekerAppliedJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
