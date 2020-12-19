import { TestBed } from '@angular/core/testing';

import { SmeAddressService } from './sme-address.service';

describe('SmeAddressService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SmeAddressService = TestBed.get(SmeAddressService);
    expect(service).toBeTruthy();
  });
});
