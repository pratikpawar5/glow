import { TestBed } from '@angular/core/testing';

import { JobAppiledService } from './job-appiled.service';

describe('JobAppiledService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobAppiledService = TestBed.get(JobAppiledService);
    expect(service).toBeTruthy();
  });
});
