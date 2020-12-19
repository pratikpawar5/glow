import { TestBed } from '@angular/core/testing';

import { SmeAndUserGuardService } from './sme-and-user-guard.service';

describe('SmeAndUserGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SmeAndUserGuardService = TestBed.get(SmeAndUserGuardService);
    expect(service).toBeTruthy();
  });
});
