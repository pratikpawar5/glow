import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancyDetailPageComponent } from './vacancy-detail-page.component';

describe('VacancyDetailPageComponent', () => {
  let component: VacancyDetailPageComponent;
  let fixture: ComponentFixture<VacancyDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacancyDetailPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacancyDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
