import { TestBed } from '@angular/core/testing';

import { LazySmeModuleService } from './lazy-sme-module.service';

describe('LazySmeModuleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LazySmeModuleService = TestBed.get(LazySmeModuleService);
    expect(service).toBeTruthy();
  });
});
