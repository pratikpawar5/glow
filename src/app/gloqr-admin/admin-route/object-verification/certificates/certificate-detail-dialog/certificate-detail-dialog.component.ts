import { Component, OnInit, Inject } from '@angular/core';
import { SmeEntity, ItemState, SMEConstant } from '@models/sme';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'environments/environment';
import { ConstantService } from '@services/common/constant-service.service';
import { GloqrAdminService } from 'app/gloqr-admin/gloqr-admin-services/gloqr-admin.service';
import { SnackBarService } from '@services/common/snack-bar.service';

@Component({
  selector: 'app-certificate-detail-dialog',
  templateUrl: './certificate-detail-dialog.component.html',
  styleUrls: ['./certificate-detail-dialog.component.css']
})
export class CertificateDetailDialogComponent implements OnInit {
  showImages: boolean
  public itemStatus: ItemState;
  feedbackMessage = new FormControl(null);
  contentServer: string = environment.CONTENT_SERVER
  smeEntity: SmeEntity;
  file: File
  imageTypes: Array<string>
  imageLocationOneSize: number = 102400
  imageLocationTwoSize: number = 51200
  imageSizeErrorLocationOne: boolean;
  imageSizeErrorLocationTwo: boolean;
  imageTypeError: boolean;
  saveImages: boolean
  selectedImages = new Array<File>()
  imageLocationOne = 'LocationOne'
  imageLocationTwo = 'LocationTwo'
  sUuid: string
  constructor(private dialogRef: MatDialogRef<CertificateDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: SnackBarService, private constantService: ConstantService, private gloqrAdminService: GloqrAdminService) {
    this.imageTypes = constantService.getImageFormats();
  }

  ngOnInit() {
  }

  onFileChangedOne(event, index: number, location: string) {
    if (event.target.files) {
      this.file = event.target.files[0];

      if (this.imageTypes.indexOf(this.file.type) === -1) {
        this.imageTypeError = true
        window.alert("Supported file formats are: .png .jpeg .jpg")

      }

      else if (location === this.imageLocationOne && this.file.size > this.imageLocationOneSize) {
        window.alert("Image file size should be less than 100kb")
      }

      else if (location === this.imageLocationTwo && this.file.size > this.imageLocationTwoSize) {
        window.alert("Image file size should be less than 50kb")
      }
      else {
        if (this.file) {
          let reader = new FileReader();
          reader.readAsDataURL(this.file);
          this.uploadImagesToServer(index, location)
        }
      }
    }

  }

  uploadImagesToServer(index: number, location: string) {
    let formData = new FormData()
    formData.append('images', this.file)
    this.gloqrAdminService.postNewSMEImages(formData, this.data.sUuid, SMEConstant.CERTIFICATES).subscribe(
      event => {
        if (event.error) {

        }
        else {
          this.selectedImages = event.data
          if (location === this.imageLocationOne) {
            this.saveImages = false
            this.data.certificate.images[index].imageLocationOne = event.data[0].imageLocationOne
          }
          else if (location === this.imageLocationTwo) {
            this.saveImages = false
            this.data.certificate.images[index].imageLocationTwo = event.data[0].imageLocationTwo
          }
        }
      },
    )
  }

  deleteImage(index: number, location: string) {
    if (location === this.imageLocationOne) {
      this.data.certificate.images[index].imageLocationOne = undefined
      this.saveImages = false
    }
    else if (location === this.imageLocationTwo) {
      this.data.certificate.images[index].imageLocationTwo = undefined
      this.saveImages = false
    }
  }

  onSaveCertificateImage() {
    let smeEntity = new SmeEntity();
    smeEntity.images = this.data.certificate.images
    smeEntity.id = this.data.sUuid
    this.gloqrAdminService.updateSMEImages(smeEntity, 'other').subscribe(
      res => {
        this.saveImages = true
        this.snackBar.open("Images Save Successfully")
      }
    )
  }

  onApprove() {
    this.smeEntity = new SmeEntity();
    this.smeEntity.id = this.data.certificate.crtiUuid
    this.smeEntity.feedbackMessage = this.feedbackMessage.value
    this.smeEntity.state = ItemState.APPROVED;
    this.dialogRef.close(this.smeEntity)
  }

  onReject() {
    this.smeEntity = new SmeEntity();
    this.smeEntity.id = this.data.certificate.crtiUuid
    this.smeEntity.feedbackMessage = this.feedbackMessage.value
    this.smeEntity.state = ItemState.REJECTED;
    this.dialogRef.close(this.smeEntity)
  }
  onClickClose() {
    this.dialogRef.close(this.smeEntity)
  }

}
