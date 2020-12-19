import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmeHomeHeaderComponent } from './sme-home-header/sme-home-header.component';
import { SmeHomeFooterComponent } from './sme-home-footer/sme-home-footer.component';
import { RouterModule } from '@angular/router';
import { ExternalModule } from 'app/external-modules/external.module';
import { AvatarModule } from 'ngx-avatar';
import { SharedModule } from 'app/shared/shared.module';

const avatarColors = ["#FFB6C1", "#2c3e50", "#95a5a6", "#f39c12", "#1abc9c"];

@NgModule({
  declarations: [SmeHomeHeaderComponent, SmeHomeFooterComponent],
  imports: [
    CommonModule,
    ExternalModule,
    RouterModule,
    AvatarModule.forRoot({
      colors: avatarColors
    }), //use external npm for display avatar or profile image in navigation bar after user login 
    SharedModule
  ],
  exports: [
    SmeHomeHeaderComponent,
    SmeHomeFooterComponent]
})
export class SmeHomeLayoutModule { }
