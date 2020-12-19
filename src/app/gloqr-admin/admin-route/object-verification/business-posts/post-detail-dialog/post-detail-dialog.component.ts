import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SmeEntity, ItemState, SMEConstant } from '@models/sme';
import { FormGroup, FormControl } from '@angular/forms';
import { Image } from '@models/common';
import { environment } from 'environments/environment';
import { GloqrAdminService } from 'app/gloqr-admin/gloqr-admin-services/gloqr-admin.service';
import { SnackBarService } from '@services/common/snack-bar.service';
import { ConstantService } from '@services/common/constant-service.service';


@Component({
  selector: 'app-post-detail-dialog',
  templateUrl: './post-detail-dialog.component.html',
  styleUrls: ['./post-detail-dialog.component.css']
})
export class PostDetailDialogComponent implements OnInit {

  name: string;
  smeEntities = new Array<SmeEntity>();
  showImages: boolean
  images: Image[] = []
  public itemStatus: ItemState;
  certificateForm: FormGroup;
  feedbackMessage = new FormControl();
  contentServer: string = environment.CONTENT_SERVER;
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

  constructor(private dialogRef: MatDialogRef<PostDetailDialogComponent>,

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
    formData.append('files', this.file)
    this.gloqrAdminService.uploadbusinessPostImage(formData, this.data.smeInfo.sUuid).subscribe(
      event => {
        if (event.error) {

        }
        else {
          this.selectedImages = event.data
          if (location === this.imageLocationOne) {
            this.saveImages = false
            this.data.files[index].fileLocationOne = event.data[0].fileLocationOne
          }
          else if (location === this.imageLocationTwo) {
            this.saveImages = false
            this.data.files[index].fileLocationTwo = event.data[0].fileLocationTwo
          }
        }
      },
    )
  }

  deleteImage(index: number, location: string) {
    if (location === this.imageLocationOne) {
      this.data.files[index].fileLocationOne = undefined
      this.saveImages = false
    }
    else if (location === this.imageLocationTwo) {
      this.data.files[index].fileLocationTwo = undefined
      this.saveImages = false

    }
  }
  onClickSave() {
    if (this.data.files) {
      this.onSaveImages();
    }
    else {
      this.onApprove();
    }
  }
  onSaveImages() {
    this.smeEntity = new SmeEntity();
    this.smeEntity.editedImages = this.data.files
    this.smeEntity.id = this.data.businessPostId
    this.gloqrAdminService.updateBusinessPostImage(this.smeEntity).subscribe(
      res => {
        if (res.error) {

        }
        else {
          this.saveImages = true

        }
      }
    )

  }

  onApprove() {
    this.smeEntity = new SmeEntity();
    this.smeEntity.id = this.data.businessPostId
    this.smeEntity.feedbackMessage = this.feedbackMessage.value
    this.smeEntity.state = ItemState.APPROVED;
    this.dialogRef.close(this.smeEntity)
  }
  onReject() {
    this.smeEntity = new SmeEntity();
    this.smeEntity.id = this.data.businessPostId
    this.smeEntity.feedbackMessage = this.feedbackMessage.value
    this.smeEntity.state = ItemState.REJECTED;
    this.dialogRef.close(this.smeEntity)
  }
  close() {
    this.dialogRef.close(this.smeEntity)
  }

}
