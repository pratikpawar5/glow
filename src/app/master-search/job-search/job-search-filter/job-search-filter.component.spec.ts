import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSearchFilterComponent } from './job-search-filter.component';

describe('JobSearchFilterComponent', () => {
  let component: JobSearchFilterComponent;
  let fixture: ComponentFixture<JobSearchFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobSearchFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobSearchFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
