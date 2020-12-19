import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSeekerCreateProfilePermissionComponent } from './job-seeker-create-profile-permission.component';

describe('JobSeekerCreateProfilePermissionComponent', () => {
  let component: JobSeekerCreateProfilePermissionComponent;
  let fixture: ComponentFixture<JobSeekerCreateProfilePermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobSeekerCreateProfilePermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobSeekerCreateProfilePermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
