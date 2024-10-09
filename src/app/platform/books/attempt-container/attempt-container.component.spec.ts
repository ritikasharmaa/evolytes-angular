import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttemptContainerComponent } from './attempt-container.component';

describe('AttemptContainerComponent', () => {
  let component: AttemptContainerComponent;
  let fixture: ComponentFixture<AttemptContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttemptContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttemptContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
