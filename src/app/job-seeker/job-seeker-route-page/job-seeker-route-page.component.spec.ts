import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSeekerRoutePageComponent } from './job-seeker-route-page.component';

describe('JobSeekerRoutePageComponent', () => {
  let component: JobSeekerRoutePageComponent;
  let fixture: ComponentFixture<JobSeekerRoutePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobSeekerRoutePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobSeekerRoutePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
