import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSeekerProfileDisplayComponent } from './job-seeker-profile-display.component';

describe('JobSeekerProfileDisplayComponent', () => {
  let component: JobSeekerProfileDisplayComponent;
  let fixture: ComponentFixture<JobSeekerProfileDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobSeekerProfileDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobSeekerProfileDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
