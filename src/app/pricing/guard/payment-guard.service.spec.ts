import { TestBed } from '@angular/core/testing';

import { PaymentGuardService } from './payment-guard.service';

describe('PaymentGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaymentGuardService = TestBed.get(PaymentGuardService);
    expect(service).toBeTruthy();
  });
});
