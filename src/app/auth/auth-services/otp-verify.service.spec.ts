import { TestBed } from '@angular/core/testing';

import { OtpVerifyService } from './otp-verify.service';

describe('OtpVerifyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OtpVerifyService = TestBed.get(OtpVerifyService);
    expect(service).toBeTruthy();
  });
});
