import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSeekerMainPageComponent } from './job-seeker-main-page.component';

describe('JobSeekerMainPageComponent', () => {
  let component: JobSeekerMainPageComponent;
  let fixture: ComponentFixture<JobSeekerMainPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobSeekerMainPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobSeekerMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
