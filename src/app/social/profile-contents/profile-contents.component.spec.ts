import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileContentsComponent } from './profile-contents.component';

describe('ProfileContentsComponent', () => {
  let component: ProfileContentsComponent;
  let fixture: ComponentFixture<ProfileContentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileContentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
