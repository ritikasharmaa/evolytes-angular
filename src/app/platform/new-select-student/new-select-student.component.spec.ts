import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSelectStudentComponent } from './new-select-student.component';

describe('NewSelectStudentComponent', () => {
  let component: NewSelectStudentComponent;
  let fixture: ComponentFixture<NewSelectStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSelectStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSelectStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
