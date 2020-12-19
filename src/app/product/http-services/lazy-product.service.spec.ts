import { TestBed } from '@angular/core/testing';

import { LazyProductService } from './lazy-product.service';

describe('LazyProductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LazyProductService = TestBed.get(LazyProductService);
    expect(service).toBeTruthy();
  });
});
