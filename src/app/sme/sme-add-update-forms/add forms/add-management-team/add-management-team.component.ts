import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SMEImage } from '@models/sme-image';
import { environment } from 'environments/environment';
import { PageTitleService } from '@services/page-title/page-title.service';
import { Router } from '@angular/router';
import { ConstantService } from '@services/common/constant-service.service';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { CustomHttpResponse } from '@models/custom.response';
import { SMEManagementTeam } from '@models/management-team';
import { TokenService } from '@services/token/token.service';
import { SnackBarService } from '@services/common/snack-bar.service';
import { SelectedCreditType, CreditErrorCode, CreditType } from '@models/pricing';
import { LazySmeModuleService } from 'app/sme/http-service/lazy-sme-module.service';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { NoCreditsLeftComponent } from 'app/shared/components/no-credits-left/no-credits-left.component';
import { BuyCreditsComponent } from 'app/shared/components/buy-credits/buy-credits.component';
import { ImageCropperComponent} from 'ngx-image-cropper';
import { CroppedImageComponent } from './cropped-image/cropped-image.component';
declare var ga: Function;
@Component({
  selector: 'app-add-management-team',
  templateUrl: './add-management-team.component.html',
  styleUrls: ['./add-management-team.component.css']
})
export class AddManagementTeamComponent implements OnInit {

  draft: boolean = false
  publish: boolean = true
  manageTeamForm: FormGroup;
  teamUuid: string;
  emailPattern = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@" + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";

  /*Image*/
  imageRequired: boolean
  imageUploadFail: boolean
  showUploadProgress: boolean
  progressPercent: number
  uploadedImages = new Array<SMEImage>(1)
  allowedImageSize: number
  selectedImages: boolean
  imageTypes: Array<string>
  imageSizeError: boolean
  imageTypeError: boolean
  showButton: boolean = true
  contentServer: string = environment.CONTENT_SERVER
  sUuid: string

  /*New*/
  imageChangedEvent: any = '';
  croppedImage: any = '';
  showCropper = false;
  imageCropper: ImageCropperComponent;
  file: any
  croppedImageDialog: MatDialogRef<CroppedImageComponent>;

  constructor(private pageTitleService: PageTitleService, private matDialog: MatDialog,
    private dialog: DialogService, private token: TokenService, private router: Router,
    private smeService: LazySmeModuleService, private snackBar: SnackBarService,
    private constantsService: ConstantService, private formBuilder: FormBuilder,
    private http: HttpClient) {
    this.imageTypes = constantsService.getImageFormats();
    this.allowedImageSize = constantsService.getMaxFileSize();
    ga('set', 'page', router.url);
    ga('send', 'pageview');
  }

  ngOnInit() {
    this.sUuid = this.token.getSmeId();
    this.pageTitleService.updateTitle('Add Management Team')
    this.manageTeamForm = this.formBuilder.group({
      teamUuid: new FormControl(null),
      fullName: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z. ]*$'), Validators.maxLength(50)]),
      designation: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]*$'), Validators.minLength(1), Validators.maxLength(80)]),
      experience: new FormControl(null, [Validators.pattern('[0-9]+'), Validators.required]),
      mail: new FormControl(null, [Validators.required, Validators.pattern(this.emailPattern)]),
      profileDesc: new FormControl(null, [Validators.maxLength(500), Validators.minLength(20), Validators.required]),
      fbLink: new FormControl(null, [Validators.minLength(5), Validators.maxLength(50)]),
      linkedinLink: new FormControl(null, [Validators.minLength(5), Validators.maxLength(50)]),
      twitterLink: new FormControl(null, [Validators.minLength(5), Validators.maxLength(50)]),
    })

  }


  onFileChanged(e: any) {
    this.imageSizeError = false
    this.imageTypeError = false
    this.imageChangedEvent = e
    if (this.imageChangedEvent.target.files[0] != null || this.imageChangedEvent.target.files[0] != undefined) {
      this.selectedImages = true
    }

    if (this.imageTypes.indexOf(this.imageChangedEvent.target.files[0].type) === -1) {
      this.imageTypeError = true
      this.selectedImages = false
      return false
    } else if (this.imageChangedEvent.target.files[0].size > this.allowedImageSize) {
      this.imageSizeError = true
      this.selectedImages = false

      return false
    }
    else {
      this.openCroppedImageDialog();
    }
  }


  
  openCroppedImageDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = false;
    dialogConfig.width = '800px';
    dialogConfig.height = '550px';
    dialogConfig.data = this.imageChangedEvent
    let ref = this.croppedImageDialog = this.matDialog.open(CroppedImageComponent, dialogConfig);
    ref.afterClosed().subscribe(
      res => {
        if (res) {
          this.file = res
          this.uploadImagesToServer();
        }
        else {
          this.selectedImages = false
        }
      }
    )
  }

  uploadImagesToServer() {
    this.showUploadProgress = true
    this.imageUploadFail = false
    let formData = new FormData()
    formData.append('images', this.file)
    this.http.post<CustomHttpResponse<any>>(environment.SME_INFORMATION_URL + 'images', formData, {
      reportProgress: true, observe: 'events', params: { entityType: "teams" }
    }).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressPercent = Math.round(100 * event.loaded / event.total);
        }
        else if (event instanceof HttpResponse) {
          if (event.body.data != null || event.body.data != undefined) {
            this.uploadedImages = event.body.data
          }

          this.showUploadProgress = false
          this.imageRequired = false
        }
      },
      err => {
        this.imageUploadFail = true
        this.showUploadProgress = false
      },
    )
  }

  deleteImageFromServer(index: number, fileLocation: string) {
    this.imageUploadFail = false
    this.http.delete(environment.CONTENT_SERVER_DELETE_API + fileLocation)
      .subscribe(res => {
        this.uploadedImages.splice(index, 1)
        this.uploadedImages.push(undefined)
        this.selectedImages = false
      },
      )
  }

  onSubmit(status) {
    if (this.manageTeamForm.valid && this.uploadedImages.length > 0) {
      this.showButton = false
      let uploadTeam: SMEManagementTeam = this.manageTeamForm.value;

      let images = new Array<SMEImage>()

      this.uploadedImages.filter(img => img != null || img != undefined).forEach(img => {
        images.push(img);
      })

      uploadTeam.profileImageUrl = images[0].imageLocation;
      uploadTeam.totalFilesSize = images[0].size
      uploadTeam.active = status

      if (uploadTeam.profileDesc != null && uploadTeam.profileDesc.length <= 0) {
        uploadTeam.profileDesc = null
      }
      if (uploadTeam.fbLink != null && uploadTeam.fbLink.length <= 0) {
        uploadTeam.fbLink = null
      }
      if (uploadTeam.twitterLink != null && uploadTeam.twitterLink.length <= 0) {
        uploadTeam.twitterLink = null
      }
      if (uploadTeam.linkedinLink != null && uploadTeam.linkedinLink.length <= 0) {
        uploadTeam.linkedinLink = null
      }
      if (uploadTeam.fullName != null && uploadTeam.fullName.length <= 0) {
        uploadTeam.fullName = null
      }
      if (uploadTeam.designation != null && uploadTeam.designation.length <= 0) {
        uploadTeam.designation = null
      }
      if (uploadTeam.profileDesc != null && uploadTeam.profileDesc.length <= 0) {
        uploadTeam.profileDesc = null
      }

      this.smeService.addTeam(uploadTeam).subscribe(

        res => {
          if (res.error) {
            if (res.code === 402) {
              this.showButton = true
              let selectedCreditType: SelectedCreditType

              if (res.errorResponse.errorCode === CreditErrorCode.IMAGE_STORAGE) {
                selectedCreditType = {
                  creditType: CreditType.IMAGE_STORAGE,
                  displayName: res.errorResponse.typeDisplayName
                }
              }

              let ref = this.matDialog.open(NoCreditsLeftComponent, this.dialog.getNoCreditsDialogConfig(selectedCreditType))
              ref.afterClosed().subscribe(
                res => {
                  if (res) {
                    let ref = this.matDialog.open(BuyCreditsComponent, this.dialog.getBuyCreditsDialogConfig(selectedCreditType))
                    ref.afterClosed().subscribe(
                      res => {
                        if (res) {
                          this.onSubmit(status);
                        }
                      }
                    )
                  }
                }
              )
            }
          }
          else {
            this.snackBar.open('Management Team Added Successfully !!')
            this.router.navigateByUrl('/my-sme/' + this.sUuid + '/management-teams');
          }

        },
      );
    }
    else {
      if (this.uploadedImages.length <= 0) {
        this.imageRequired = true
      } window.scrollTo(0, 0)

    }
  }

  onCancel() {
    this.router.navigateByUrl('/my-sme/' + this.sUuid + '/management-teams');
  }
}
