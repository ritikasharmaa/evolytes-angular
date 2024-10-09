import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSettingsButtonComponent } from './manage-settings-button.component';

describe('ManageSettingsButtonComponent', () => {
  let component: ManageSettingsButtonComponent;
  let fixture: ComponentFixture<ManageSettingsButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSettingsButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSettingsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
