import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmeViewHeaderComponent } from './sme-view-header/sme-view-header.component';
import { SmeViewFooterComponent } from './sme-view-footer/sme-view-footer.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    SmeViewHeaderComponent,
    SmeViewFooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule
  ],
  exports: [
    SmeViewHeaderComponent,
    SmeViewFooterComponent
  ]
})
export class SmeViewLayoutModule { }
