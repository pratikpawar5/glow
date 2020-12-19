import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeVacancyComponent } from './sme-vacancy.component';

describe('SmeVacancyComponent', () => {
  let component: SmeVacancyComponent;
  let fixture: ComponentFixture<SmeVacancyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeVacancyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeVacancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
