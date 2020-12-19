import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobLeftSideBarComponent } from './job-left-side-bar.component';

describe('JobLeftSideBarComponent', () => {
  let component: JobLeftSideBarComponent;
  let fixture: ComponentFixture<JobLeftSideBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobLeftSideBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobLeftSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
