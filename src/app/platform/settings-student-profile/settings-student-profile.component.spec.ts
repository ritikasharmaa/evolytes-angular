import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsStudentProfileComponent } from './settings-student-profile.component';

describe('AllStudentSettingsComponent', () => {
  let component: SettingsStudentProfileComponent;
  let fixture: ComponentFixture<SettingsStudentProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsStudentProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsStudentProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
