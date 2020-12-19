import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { SMECategoryDto } from '@models/sme';
import { GloqrAdminService } from 'app/gloqr-admin/gloqr-admin-services/gloqr-admin.service';
import { SnackBarService } from '@services/common/snack-bar.service';

@Component({
  selector: 'app-add-sme-category',
  templateUrl: './add-sme-category.component.html',
  styleUrls: ['./add-sme-category.component.css']
})

//Add SME Category from gloqr-admin
export class AddSmeCategoryComponent implements OnInit {
  showButton: boolean = true

  smeCategoryName = new FormControl();
  smeCategoryNameReq: boolean
  private headers: HttpHeaders = new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('s_Token')
  });
  constructor(private gloqrAdminService: GloqrAdminService, private snackBar: SnackBarService) { }

  ngOnInit() {
  }
  onSubmit() {
    if (this.smeCategoryName.value) {
      this.showButton = false
      this.smeCategoryNameReq = false
      let sMECategoryDto = new SMECategoryDto();
      sMECategoryDto.categoryName = this.smeCategoryName.value

      this.gloqrAdminService.addSMECategory(sMECategoryDto).subscribe(
        res => {
          if (!res.error) {
            this.snackBar.open("SME Category Added Successfully")
            this.showButton = true
            this.smeCategoryName.reset();
          }
        }
      )
    }
    else {
      this.showButton = true

      this.smeCategoryNameReq = true
    }
  }
}
