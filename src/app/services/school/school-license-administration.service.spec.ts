import { TestBed } from '@angular/core/testing';

import { SchoolLicenseAdministrationService } from './school-license-administration.service';

describe('SchoolLicenseAdministrationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SchoolLicenseAdministrationService = TestBed.get(SchoolLicenseAdministrationService);
    expect(service).toBeTruthy();
  });
});
