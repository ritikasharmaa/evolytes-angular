import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillProgressChartComponent } from './skill-progress-chart.component';

describe('SkillProgressChartComponent', () => {
  let component: SkillProgressChartComponent;
  let fixture: ComponentFixture<SkillProgressChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillProgressChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillProgressChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
