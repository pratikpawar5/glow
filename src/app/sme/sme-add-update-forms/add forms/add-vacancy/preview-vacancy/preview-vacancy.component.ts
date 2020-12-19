import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { SelectedCreditType, CreditErrorCode, CreditType } from '@models/pricing';
import { NoCreditsLeftComponent } from 'app/shared/components/no-credits-left/no-credits-left.component';
import { BuyCreditsComponent } from 'app/shared/components/buy-credits/buy-credits.component';
import { SnackBarService } from '@services/common/snack-bar.service';
import { LazySmeModuleService } from 'app/sme/http-service/lazy-sme-module.service';
import { Router } from '@angular/router';
import { DialogService } from '@services/mat-dialog/dialog.service';

@Component({
  selector: 'app-preview-vacancy',
  templateUrl: './preview-vacancy.component.html',
  styleUrls: ['./preview-vacancy.component.css']
})
export class PreviewVacancyComponent implements OnInit {
  showButton: boolean = true
    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private matDialog: MatDialog
    , private dialog: DialogService, private dialogRef: MatDialogRef<PreviewVacancyComponent>) { }

  ngOnInit() {
  }
  onClickClose() {
    this.dialogRef.close();
  }


}
