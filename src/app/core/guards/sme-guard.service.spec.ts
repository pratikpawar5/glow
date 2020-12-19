import { TestBed } from '@angular/core/testing';

import { SmeGuardService } from './sme-guard.service';

describe('SmeGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SmeGuardService = TestBed.get(SmeGuardService);
    expect(service).toBeTruthy();
  });
});
