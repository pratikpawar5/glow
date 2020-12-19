import { TestBed } from '@angular/core/testing';

import { SmeAdminServiceService } from './sme-admin-service.service';

describe('SmeAdminServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SmeAdminServiceService = TestBed.get(SmeAdminServiceService);
    expect(service).toBeTruthy();
  });
});
