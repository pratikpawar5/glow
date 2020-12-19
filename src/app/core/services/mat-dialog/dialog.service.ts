import { Injectable } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { PageData, PageName } from '@models/common';
import { SelectedCreditType } from '@models/pricing';
import { DeleteObject } from '@models/common-delete';
import { SMECircleDto } from '@models/business-circle';
import { JobApplicantDto } from '@models/jobs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private authConfig = new MatDialogConfig();

  constructor() {
    this.authConfig.autoFocus = false
    this.authConfig.width = '400px'
    this.authConfig.height = '500px'
  }

  loginConfig(): MatDialogConfig {
    let pageData: PageData = {
      pageName: PageName.LOGIN,
    }
    this.authConfig.data = pageData
    return this.authConfig;
  }

  signUpConfig(): MatDialogConfig {
    let pageData: PageData = {
      pageName: PageName.SIGNUP,
    }
    this.authConfig.data = pageData
    return this.authConfig;
  }

  getBuyCreditsDialogConfig(creditType: SelectedCreditType): MatDialogConfig {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false
    dialogConfig.width = '500px'
    dialogConfig.disableClose = true
    dialogConfig.data = creditType

    return dialogConfig;
  }

  getNoCreditsDialogConfig(creditType: SelectedCreditType): MatDialogConfig {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false
    dialogConfig.width = '400px'
    dialogConfig.data = creditType

    return dialogConfig;
  }

  getDeleteDialogConfig(deleteObj: DeleteObject<any>): MatDialogConfig {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false
    dialogConfig.width = '500px'
    dialogConfig.height = '220px'
    dialogConfig.disableClose = true
    dialogConfig.data = deleteObj
    return dialogConfig;
  }

  getMutualConnDialogConfig(mutualConnections: SMECircleDto[], smeName: string): MatDialogConfig {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false
    dialogConfig.width = '400px'
    dialogConfig.disableClose = true
    dialogConfig.data = { mutualConnections, smeName }
    return dialogConfig;
  }

  getOpenYoutubeVideoDialog() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false
    // dialogConfig.width = '600px'
    dialogConfig.width = 'auto'
    dialogConfig.disableClose = true
    return dialogConfig;
  }
  getVacancyAppliedPopup(vacancyUuid): MatDialogConfig {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false
    dialogConfig.width = '400px';

    dialogConfig.disableClose = true
    dialogConfig.data = vacancyUuid;
    return dialogConfig;
  }

  getPaymentInfoConfig(data: any) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false
    dialogConfig.width = '500px'
    dialogConfig.data = data;
    dialogConfig.disableClose = true
    return dialogConfig;
  }

  getJobApplicant(vacancyUuid: string, value: string) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false
    dialogConfig.width = '1000px';
    dialogConfig.height = '800px';
    dialogConfig.data = { vacancyUuid, value };
    dialogConfig.disableClose = true
    return dialogConfig;
  }
}
