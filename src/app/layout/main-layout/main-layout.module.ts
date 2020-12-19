import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from './main-header/main-header.component';
import { MainFooterComponent } from './main-footer/main-footer.component';
import { MainMenuBarComponent } from './main-menu-bar/main-menu-bar.component';
import { RouterModule } from '@angular/router';
import { ExternalModule } from 'app/external-modules/external.module';
import { AvatarModule } from 'ngx-avatar';
import { SharedModule } from 'app/shared/shared.module';

const avatarColors = ["#FFB6C1", "#2c3e50", "#95a5a6", "#f39c12", "#1abc9c"];

@NgModule({
  declarations: [
    MainHeaderComponent,
    MainFooterComponent,
    MainMenuBarComponent,
  ],
  exports: [
    MainHeaderComponent, 
    MainFooterComponent, 
    MainMenuBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ExternalModule,
    AvatarModule.forRoot({
      colors: avatarColors
    }),//use external npm for display avatar or profile image in navigation bar after user login 
    SharedModule
    ]
})
export class MainLayoutModule { }
