import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeVacanciesViewComponent } from './sme-vacancies-view.component';

describe('SmeVacanciesViewComponent', () => {
  let component: SmeVacanciesViewComponent;
  let fixture: ComponentFixture<SmeVacanciesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeVacanciesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeVacanciesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
