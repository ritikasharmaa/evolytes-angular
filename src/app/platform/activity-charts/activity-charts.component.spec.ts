import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityChartsComponent } from './activity-charts.component';

describe('ActivityChartsComponent', () => {
  let component: ActivityChartsComponent;
  let fixture: ComponentFixture<ActivityChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
