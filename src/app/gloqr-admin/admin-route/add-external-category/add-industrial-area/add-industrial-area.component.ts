import { Component, OnInit } from '@angular/core';
import { IndustrialAreaDto } from '@models/jobs';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { GloqrAdminService } from 'app/gloqr-admin/gloqr-admin-services/gloqr-admin.service';
import { SnackBarService } from '@services/common/snack-bar.service';

@Component({
  selector: 'app-add-industrial-area',
  templateUrl: './add-industrial-area.component.html',
  styleUrls: ['./add-industrial-area.component.css']
})


export class AddIndustrialAreaComponent implements OnInit {

  jobCategoryForm: FormGroup;
  industrialAreaDto: IndustrialAreaDto;
  showButton: boolean = true;
  constructor(private gloqrAdminService: GloqrAdminService, private formBuilder: FormBuilder, private snackBar: SnackBarService) { }

  ngOnInit() {
    this.jobCategoryForm = this.formBuilder.group({
      industrialAreaName: new FormControl(null, [Validators.maxLength(100), Validators.required]),
    })
  }

  onSubmit() {
    if (this.jobCategoryForm.value) {
      this.showButton = false

      //Add Industrial Area from gloqr-admin

      this.gloqrAdminService.addIndustrialArea(this.jobCategoryForm.value).subscribe(
        res => {
          if (!res.error) {
            this.snackBar.open("Industrial Area Added Successfully");
            this.showButton = true;
            this.jobCategoryForm.reset();
          }
        }
      )
    }
    else {
      this.showButton = true
    }
  }

}
