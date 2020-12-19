import { TestBed } from '@angular/core/testing';

import { GloqrAdminGuardService } from './gloqr-admin-guard.service';

describe('GloqrAdminGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GloqrAdminGuardService = TestBed.get(GloqrAdminGuardService);
    expect(service).toBeTruthy();
  });
});
