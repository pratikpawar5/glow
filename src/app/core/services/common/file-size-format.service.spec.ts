import { TestBed } from '@angular/core/testing';

import { FileSizeFormatService } from './file-size-format.service';

describe('FileSizeFormatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FileSizeFormatService = TestBed.get(FileSizeFormatService);
    expect(service).toBeTruthy();
  });
});
