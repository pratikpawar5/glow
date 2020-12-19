import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatRadioModule,
  MatBadgeModule,
  MatNativeDateModule,
  MatCardModule,
  MatTooltipModule,
  MatButtonModule,
  MatDividerModule,
  MatCheckboxModule,
  MatDialogModule,
  MatInputModule,
  MatAutocompleteModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatDatepickerModule,
  MatProgressBarModule,
  MatChipsModule,
  MatIconModule,
  MatExpansionModule,
  MatSliderModule,
  MatSidenavModule,
  MatSlideToggleModule
} from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
export const MATERIAL_MODULES = [
  MatCardModule,
  MatTooltipModule,
  MatButtonModule,
  MatDividerModule,
  MatCheckboxModule,
  MatDialogModule,
  MatInputModule,
  MatAutocompleteModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatBadgeModule,
  MatRadioModule,
  MatProgressBarModule,
  MatChipsModule,
  MatIconModule,
  MatExpansionModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  DragDropModule,
  MatTabsModule
]

@NgModule({
  declarations: [],
  imports: [
  ],
  exports: [
    CommonModule,
    MATERIAL_MODULES,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ExternalModule { }

//EXTERNAL MODULE IS MADE ONE COMMON MODULE IT INCLUDES ALL ANGULAR MATERIAL MODULE, FORMS MODULE AND REACTIVE FORMS MODULE