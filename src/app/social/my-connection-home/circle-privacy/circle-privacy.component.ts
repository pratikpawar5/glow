import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SocialService } from 'app/social/social-service/social.service';
import { CirclePrivacy, BusinessCircle } from '@models/business-circle';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { TokenService } from '@services/token/token.service';
export interface privacy {
  value: CirclePrivacy;
  viewValue: string;
}
@Component({
  selector: 'app-circle-privacy',
  templateUrl: './circle-privacy.component.html',
  styleUrls: ['./circle-privacy.component.css']
})
export class CirclePrivacyComponent implements OnInit {

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
  constructor(private dialogRef: MatDialogRef<CirclePrivacyComponent>, private token: TokenService, private router: Router, private socialService: SocialService, @Inject(MAT_DIALOG_DATA) public data: BusinessCircle) { }

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
    this.socialService.updateCircleConnectionPrivacy(this.businessCircle).subscribe(
      res => {
        this.dialogRef.close();
        this.router.navigateByUrl('', { skipLocationChange: true }).then(() =>
          this.router.navigate(['social', this.sUuid, 'my-connection-home']));
      }
    )
  }
}

