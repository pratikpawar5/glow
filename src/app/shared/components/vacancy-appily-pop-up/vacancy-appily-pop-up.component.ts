import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConstantService } from '@services/common/constant-service.service';
import { CustomJobApply } from '@models/jobs';
import { JobPostService } from '@services/job-post/job-post.service';

@Component({
  selector: 'app-vacancy-appily-pop-up',
  templateUrl: './vacancy-appily-pop-up.component.html',
  styleUrls: ['./vacancy-appily-pop-up.component.css']
})
export class VacancyAppilyPopUpComponent implements OnInit {
  customJobSeekerForm: FormGroup
  emailPattern = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
    + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
  resumeFileTypes: Array<string>
  imageUploadFail: boolean
  imageSizeError: boolean
  imageTypeError: boolean
  allowedImageSize: number
  file: File
  selectedImages: boolean
  urls = new Array<string>();
  fileName: string

  constructor(private dialogRef: MatDialogRef<VacancyAppilyPopUpComponent>, private jobService: JobPostService, private constantService: ConstantService, private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public vacancyUuid: any) {
    this.resumeFileTypes = constantService.getResumeFormats();
    this.allowedImageSize = constantService.getMaxResumeSize()
  }

  ngOnInit() {
    this.customJobSeekerForm = this.formBuilder.group(
      {
        fullName: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z. ]*$'), Validators.maxLength(50)]),
        contactNumber: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+$')]),
        emailId: new FormControl(null, [Validators.pattern(this.emailPattern)]),
      }
    )
  }

  onFileChanged(e: any) {
    this.imageSizeError = false
    this.imageTypeError = false
    this.file = e.target.files[0]
    if (this.file != null || this.file != undefined) {
      this.fileName = this.file.name
      this.selectedImages = true
    }
    if (this.resumeFileTypes.indexOf(this.file.type) === -1) {
      this.fileName = null;
      this.imageTypeError = true
      this.selectedImages = false
      return false
    } else if (this.file.size > this.allowedImageSize) {
      this.fileName = null;
      this.imageSizeError = true
      this.selectedImages = false
      return false
    }
    else {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.urls.push(e.target.result);
      }
      reader.readAsDataURL(this.file);
    }
  }

  onRemoveFile() {
    this.fileName = undefined
    this.selectedImages = false
    this.file = null
  }
  getFormData() {
    let formData: FormData = new FormData();
    if(this.file)
    {
      if (this.file.size <= this.allowedImageSize) {
        formData.append("resume", this.file);
      }
    }
    
    return formData
  }
  submit() {
    if (this.customJobSeekerForm.valid) {
      let formData = this.getFormData();
      let customApply = new CustomJobApply();
      customApply.fullName = this.customJobSeekerForm.controls['fullName'].value
      customApply.contactNumber = this.customJobSeekerForm.controls['contactNumber'].value
      customApply.emailId = this.customJobSeekerForm.controls['emailId'].value
      formData.append("applicant", JSON.stringify(customApply))
      this.jobService.customApplyJob(this.vacancyUuid, formData).subscribe(
        res => {
          location.reload();
        }
      )
    }
    else {
      window.scroll(0, 0)
    }
  }
  close() {
    this.dialogRef.close()
  }
}
