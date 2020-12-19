import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDisplayListComponent } from './job-display-list.component';

describe('JobDisplayListComponent', () => {
  let component: JobDisplayListComponent;
  let fixture: ComponentFixture<JobDisplayListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobDisplayListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDisplayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
