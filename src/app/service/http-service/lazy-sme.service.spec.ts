import { TestBed } from '@angular/core/testing';

import { LazySmeService } from './lazy-sme.service';

describe('LazySmeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LazySmeService = TestBed.get(LazySmeService);
    expect(service).toBeTruthy();
  });
});
