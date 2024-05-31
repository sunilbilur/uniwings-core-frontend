import { TestBed } from '@angular/core/testing';

import { CompHtmlFetcherService } from './comp-html-fetcher.service';

describe('CompHtmlFetcherService', () => {
  let service: CompHtmlFetcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompHtmlFetcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
