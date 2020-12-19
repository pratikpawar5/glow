import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthRouteComponent } from './auth-route/auth-route.component';
import { SignUpComponent } from './auth-route/sign-up/sign-up.component';
import { LoginComponent } from './auth-route/login/login.component';
import { OtpVerifyComponent } from './auth-route/otp-verify/otp-verify.component';
import { ForgotPasswordComponent } from './auth-route/forgot-password/forgot-password.component';
import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialLoginCredentials } from '@models/social-login-credentials';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule } from '@angular/material';
import { MainLayoutModule } from '@layout/main-layout/main-layout.module';

// FOR GOOGLE AND FACEBOOK SOCIAL LOGIN AND IMPORT IT IN PROVIDERS SECTION 
export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider(SocialLoginCredentials.facebookClientId)
      },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(SocialLoginCredentials.googleClientId)
      }
    ]
  );
  return config;
}

@NgModule({
  declarations: [
    AuthRouteComponent,//PARENT COMPONENT
    SignUpComponent,//CHILD COMPONENT
    LoginComponent,//CHILD COMPONENT
    OtpVerifyComponent,//CHILD COMPONENT
    ForgotPasswordComponent,//CHILD COMPONENT
  ],
  imports: [
    CommonModule,
    AuthRoutingModule, // FOR NAVIGATION PURPOSE
    ReactiveFormsModule,//FOR IMPLMENTING FORMS IN ANGULAR AND ITS TYPE OF FORM THAT WE ARE USING
    FormsModule,//FOR IMPLMENTING FORMS IN ANGULAR
    MatInputModule,//MATERIAL INPUT MODULE
    MatButtonModule,//MATERIAL BUTTON MODULE
    MainLayoutModule //GLOQR HEADER AND FOOTER.HENCE IMPORT A MAIN LAYOUT MODULE
  ],
  exports: [
    AuthRouteComponent,
    SocialLoginModule
  ],
  entryComponents: [
    AuthRouteComponent
  ],
  providers: [{
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  }],
})
export class AuthModule { }
