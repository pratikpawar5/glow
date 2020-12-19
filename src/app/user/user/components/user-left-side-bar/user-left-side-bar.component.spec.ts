import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLeftSideBarComponent } from './user-left-side-bar.component';

describe('UserLeftSideBarComponent', () => {
  let component: UserLeftSideBarComponent;
  let fixture: ComponentFixture<UserLeftSideBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLeftSideBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLeftSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
