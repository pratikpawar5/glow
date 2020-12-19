import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewVacancyComponent } from './preview-vacancy.component';

describe('PreviewVacancyComponent', () => {
  let component: PreviewVacancyComponent;
  let fixture: ComponentFixture<PreviewVacancyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewVacancyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewVacancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
