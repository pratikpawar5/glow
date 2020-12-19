import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSeekerDetailPageComponent } from './job-seeker-detail-page.component';

describe('JobSeekerDetailPageComponent', () => {
  let component: JobSeekerDetailPageComponent;
  let fixture: ComponentFixture<JobSeekerDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobSeekerDetailPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobSeekerDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
