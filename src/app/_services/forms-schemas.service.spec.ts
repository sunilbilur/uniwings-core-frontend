import { TestBed } from '@angular/core/testing';

import { FormsSchemasService } from './forms-schemas.service';

describe('FormsSchemasService', () => {
  let service: FormsSchemasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormsSchemasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
