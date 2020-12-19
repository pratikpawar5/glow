import { TestBed } from '@angular/core/testing';

import { LazyCartService } from './lazy-cart.service';

describe('LazyCartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LazyCartService = TestBed.get(LazyCartService);
    expect(service).toBeTruthy();
  });
});
