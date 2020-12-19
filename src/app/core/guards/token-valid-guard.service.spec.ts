import { TestBed } from '@angular/core/testing';

import { TokenValidGuardService } from './token-valid-guard.service';

describe('TokenValidGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TokenValidGuardService = TestBed.get(TokenValidGuardService);
    expect(service).toBeTruthy();
  });
});
