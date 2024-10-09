import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBillingSettingsComponent } from './new-billing-settings.component';

describe('NewBillingSettingsComponent', () => {
  let component: NewBillingSettingsComponent;
  let fixture: ComponentFixture<NewBillingSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBillingSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBillingSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
