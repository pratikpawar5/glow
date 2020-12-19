import { TestBed } from '@angular/core/testing';

import { BusinessInterestService } from './business-interest.service';

describe('BusinessInterestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusinessInterestService = TestBed.get(BusinessInterestService);
    expect(service).toBeTruthy();
  });
});
