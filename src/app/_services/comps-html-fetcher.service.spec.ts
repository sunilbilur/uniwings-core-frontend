import { TestBed } from '@angular/core/testing';

import { CompsHtmlFetcherService } from './comps-html-fetcher.service';

describe('CompsHtmlFetcherService', () => {
  let service: CompsHtmlFetcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompsHtmlFetcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
