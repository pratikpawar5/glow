import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateManagementTeamComponent } from './update-management-team.component';

describe('UpdateManagementTeamComponent', () => {
  let component: UpdateManagementTeamComponent;
  let fixture: ComponentFixture<UpdateManagementTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateManagementTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateManagementTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
