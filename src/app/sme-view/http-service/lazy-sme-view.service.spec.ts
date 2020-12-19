import { TestBed } from '@angular/core/testing';

import { LazySmeViewService } from './lazy-sme-view.service';

describe('LazySmeViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LazySmeViewService = TestBed.get(LazySmeViewService);
    expect(service).toBeTruthy();
  });
});
