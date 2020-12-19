import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancyAppilyPopUpComponent } from './vacancy-appily-pop-up.component';

describe('VacancyAppilyPopUpComponent', () => {
  let component: VacancyAppilyPopUpComponent;
  let fixture: ComponentFixture<VacancyAppilyPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacancyAppilyPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacancyAppilyPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
