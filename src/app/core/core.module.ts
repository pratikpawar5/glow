import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { MatSnackBarModule, MatDialogModule } from '@angular/material';

export function tokenGetter() {
  return localStorage.getItem('T');
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    JwtModule.forRoot({config :{tokenGetter : tokenGetter}}),
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [
    JwtHelperService
  ]
})
export class CoreModule { 
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
