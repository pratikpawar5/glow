import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing-module';
import { MainLayoutModule } from '@layout/main-layout/main-layout.module';
import { UserComponent } from './user/user.component';
import { UserLeftSideBarComponent } from './user/components/user-left-side-bar/user-left-side-bar.component';
import { UserProfileComponent } from './user/components/user-profile/user-profile.component';
import { UploadUserProfilePhotoComponent } from './user/components/user-left-side-bar/upload-user-profile-photo/upload-user-profile-photo.component';
import { UpdateMobileEmailOtpVerifyDialogComponent } from './user/components/user-profile/update-mobile-email-otp-verify-dialog/update-mobile-email-otp-verify-dialog.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    MainLayoutModule,
    SharedModule,
  ],
  declarations: [
    UserComponent,
    UserLeftSideBarComponent,
    UserProfileComponent,
    UploadUserProfilePhotoComponent,
    UpdateMobileEmailOtpVerifyDialogComponent,
  ],
  entryComponents: [
    UploadUserProfilePhotoComponent,
    UpdateMobileEmailOtpVerifyDialogComponent
  ]

})
export class UserModule { }
