import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddManagementTeamComponent } from './add-management-team.component';

describe('AddManagementTeamComponent', () => {
  let component: AddManagementTeamComponent;
  let fixture: ComponentFixture<AddManagementTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddManagementTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddManagementTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
