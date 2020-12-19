import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailDialogComponent } from './team-detail-dialog.component';

describe('TeamDetailDialogComponent', () => {
  let component: TeamDetailDialogComponent;
  let fixture: ComponentFixture<TeamDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
