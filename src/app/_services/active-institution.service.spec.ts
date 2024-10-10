import { TestBed } from '@angular/core/testing';

import { ActiveInstitutionService } from './active-institution.service';

describe('ActiveInstitutionService', () => {
  let service: ActiveInstitutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveInstitutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
