import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementTeamsComponent } from './management-teams.component';

describe('ManagementTeamsComponent', () => {
  let component: ManagementTeamsComponent;
  let fixture: ComponentFixture<ManagementTeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementTeamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
