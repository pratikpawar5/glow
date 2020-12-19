import { TestBed } from '@angular/core/testing';

import { BusinessPostService } from './business-post.service';

describe('BusinessPostService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusinessPostService = TestBed.get(BusinessPostService);
    expect(service).toBeTruthy();
  });
});
