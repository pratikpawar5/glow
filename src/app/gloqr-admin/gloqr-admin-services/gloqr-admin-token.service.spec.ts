import { TestBed } from '@angular/core/testing';

import { GloqrAdminTokenService } from './gloqr-admin-token.service';

describe('GloqrAdminTokenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GloqrAdminTokenService = TestBed.get(GloqrAdminTokenService);
    expect(service).toBeTruthy();
  });
});
