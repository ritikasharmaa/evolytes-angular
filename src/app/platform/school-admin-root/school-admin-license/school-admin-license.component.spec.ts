import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminLicenseComponent } from './school-admin-license.component';

describe('SchoolAdminLicenseComponent', () => {
  let component: SchoolAdminLicenseComponent;
  let fixture: ComponentFixture<SchoolAdminLicenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminLicenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
