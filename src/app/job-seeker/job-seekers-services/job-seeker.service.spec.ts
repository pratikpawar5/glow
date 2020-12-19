import { TestBed } from '@angular/core/testing';

import { JobSeekerService } from './job-seeker.service';

describe('JobSeekerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobSeekerService = TestBed.get(JobSeekerService);
    expect(service).toBeTruthy();
  });
});
