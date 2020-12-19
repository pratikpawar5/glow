import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancyDisplayComponent } from './vacancy-display.component';

describe('VacancyDisplayComponent', () => {
  let component: VacancyDisplayComponent;
  let fixture: ComponentFixture<VacancyDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacancyDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacancyDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
