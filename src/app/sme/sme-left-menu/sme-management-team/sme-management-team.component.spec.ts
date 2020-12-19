import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeManagementTeamComponent } from './sme-management-team.component';

describe('SmeManagementTeamComponent', () => {
  let component: SmeManagementTeamComponent;
  let fixture: ComponentFixture<SmeManagementTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeManagementTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeManagementTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
