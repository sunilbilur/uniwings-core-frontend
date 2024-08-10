import { TestBed } from '@angular/core/testing';

import { CompFetcherService } from './comp-fetcher.service';

describe('CompHtmlFetcherService', () => {
  let service: CompFetcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompFetcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
