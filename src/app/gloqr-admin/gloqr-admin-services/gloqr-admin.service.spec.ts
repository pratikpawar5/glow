import { TestBed } from '@angular/core/testing';

import { GloqrAdminService } from './gloqr-admin.service';

describe('GloqrAdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GloqrAdminService = TestBed.get(GloqrAdminService);
    expect(service).toBeTruthy();
  });
});
