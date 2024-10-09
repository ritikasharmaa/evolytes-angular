import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvoLandChooseLanguageComponent } from './evo-land-choose-language.component';

describe('EvoLandChooseLanguageComponent', () => {
  let component: EvoLandChooseLanguageComponent;
  let fixture: ComponentFixture<EvoLandChooseLanguageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvoLandChooseLanguageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvoLandChooseLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
