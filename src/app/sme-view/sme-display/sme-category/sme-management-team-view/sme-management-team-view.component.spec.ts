import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeManagementTeamViewComponent } from './sme-management-team-view.component';

describe('SmeManagementTeamViewComponent', () => {
  let component: SmeManagementTeamViewComponent;
  let fixture: ComponentFixture<SmeManagementTeamViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeManagementTeamViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeManagementTeamViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
