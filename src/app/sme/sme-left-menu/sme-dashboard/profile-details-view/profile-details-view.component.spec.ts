import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDetailsViewComponent } from './profile-details-view.component';

describe('ProfileDetailsViewComponent', () => {
  let component: ProfileDetailsViewComponent;
  let fixture: ComponentFixture<ProfileDetailsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileDetailsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
