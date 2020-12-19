import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancyDetailDialogComponent } from './vacancy-detail-dialog.component';

describe('VacancyDetailDialogComponent', () => {
  let component: VacancyDetailDialogComponent;
  let fixture: ComponentFixture<VacancyDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacancyDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacancyDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
