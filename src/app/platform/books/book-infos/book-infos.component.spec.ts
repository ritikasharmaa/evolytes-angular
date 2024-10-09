import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookInfosComponent } from './book-infos.component';

describe('BookInfosComponent', () => {
  let component: BookInfosComponent;
  let fixture: ComponentFixture<BookInfosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookInfosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
