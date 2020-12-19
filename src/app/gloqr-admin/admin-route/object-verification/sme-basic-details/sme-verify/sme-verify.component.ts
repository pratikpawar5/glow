import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GloqrSMEDto, SMECategoryDto } from '@models/sme';
import { GloqrAdminService } from 'app/gloqr-admin/gloqr-admin-services/gloqr-admin.service';
import { SnackBarService } from '@services/common/snack-bar.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sme-verify',
  templateUrl: './sme-verify.component.html',
  styleUrls: ['./sme-verify.component.css']
})
export class SmeVerifyComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<SmeVerifyComponent>, private snackBar: SnackBarService, private router: Router, private route: ActivatedRoute, private gloqrAdminService: GloqrAdminService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    window.scroll(0,0)
  }
  onClickClose() {
    this.dialogRef.close();
  }
  yes() {
    let sme = new GloqrSMEDto()
    sme.sUuid = this.data.sUuid
    let smeCategory = new SMECategoryDto();
    smeCategory.categoryUuid = this.data.categoryName
    sme.smeCategory = smeCategory
    this.gloqrAdminService.verifySME(sme).subscribe(
      res => {
        if (res.error) {

        }
        else {
          this.dialogRef.close();
          this.snackBar.open('SME Verified Successfully ');
          this.router.navigateByUrl('/gloqr-admin/new-smes');
        }
      }
    )
  }
}
