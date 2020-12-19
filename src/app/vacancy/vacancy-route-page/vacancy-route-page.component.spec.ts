import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancyRoutePageComponent } from './vacancy-route-page.component';

describe('VacancyRoutePageComponent', () => {
  let component: VacancyRoutePageComponent;
  let fixture: ComponentFixture<VacancyRoutePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacancyRoutePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacancyRoutePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
