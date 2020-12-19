import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadUserProfilePhotoComponent } from './upload-user-profile-photo.component';

describe('UploadUserProfilePhotoComponent', () => {
  let component: UploadUserProfilePhotoComponent;
  let fixture: ComponentFixture<UploadUserProfilePhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadUserProfilePhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadUserProfilePhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
