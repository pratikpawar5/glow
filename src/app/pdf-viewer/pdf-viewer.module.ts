import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PdfViewerRoutingModule } from './pdf-viewer-routing.module';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { MainLayoutModule } from '@layout/main-layout/main-layout.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [PdfViewerComponent],
  imports: [
    CommonModule,
    PdfViewerRoutingModule,
    MainLayoutModule,
    PdfViewerModule
  ]
})
export class CustomPdfViewerModule { }
