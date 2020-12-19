import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSeekerBasicDetailsDialogComponent } from './job-seeker-basic-details-dialog.component';

describe('JobSeekerBasicDetailsDialogComponent', () => {
  let component: JobSeekerBasicDetailsDialogComponent;
  let fixture: ComponentFixture<JobSeekerBasicDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobSeekerBasicDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobSeekerBasicDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
