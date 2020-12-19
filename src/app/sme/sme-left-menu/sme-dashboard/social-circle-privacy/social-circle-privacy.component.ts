import { Component, OnInit, Inject } from '@angular/core';
import { CirclePrivacy, BusinessCircle } from '@models/business-circle';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TokenService } from '@services/token/token.service';
import { Router } from '@angular/router';
import { ExtraService } from '@services/common/extra.service';

export interface privacy {
  value: CirclePrivacy;
  viewValue: string;
}
@Component({
  selector: 'app-social-circle-privacy',
  templateUrl: './social-circle-privacy.component.html',
  styleUrls: ['./social-circle-privacy.component.css']
})
export class SocialCirclePrivacyComponent implements OnInit {

  privacyCircleConnection: privacy[] = [
    {
      value: CirclePrivacy.CIRCLE, viewValue: 'Circle',
    },
    {
      value: CirclePrivacy.PUBLIC, viewValue: 'Public',
    },
    {
      value: CirclePrivacy.PRIVATE, viewValue: 'Private'
    }
  ];
  businessCircle = new BusinessCircle();
  privacy: any
  sUuid: string;
  constructor(private dialogRef: MatDialogRef<SocialCirclePrivacyComponent>, private token: TokenService,
    private router: Router, private extraService: ExtraService, @Inject(MAT_DIALOG_DATA) public data: BusinessCircle) { }

  ngOnInit() {
    this.privacy = this.data
    this.sUuid = this.token.getSmeId();
  }
  onClickClose() {
    this.dialogRef.close();
  }

  onClickPrivacy(val: number) {
    if (val === 0) {
      this.businessCircle.circlePrivacy = CirclePrivacy.CIRCLE
    }
    else if (val === 1) {
      this.businessCircle.circlePrivacy = CirclePrivacy.PUBLIC
    }
    else {
      this.businessCircle.circlePrivacy = CirclePrivacy.PRIVATE
    }
  }

  onSave() {
    this.extraService.updateCircleConnectionPrivacy(this.businessCircle).subscribe(
      res => {
        this.dialogRef.close();
        this.router.navigateByUrl('', { skipLocationChange: true }).then(() =>
          this.router.navigate(['my-sme', this.sUuid, 'sme-dashboard']));
      }
    )
  }
}
