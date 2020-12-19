import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { TokenService } from '@services/token/token.service';
import { PageTitleService } from '@services/page-title/page-title.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantService } from '@services/common/constant-service.service';
import { CustomHttpResponse } from '@models/custom.response';
import { SMEManagementTeam } from '@models/management-team';
import { SnackBarService } from '@services/common/snack-bar.service';
import { SelectedCreditType, CreditErrorCode, CreditType } from '@models/pricing';
import { LazySmeModuleService } from 'app/sme/http-service/lazy-sme-module.service';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { NoCreditsLeftComponent } from 'app/shared/components/no-credits-left/no-credits-left.component';
import { BuyCreditsComponent } from 'app/shared/components/buy-credits/buy-credits.component';
import { ImageCropperComponent } from 'ngx-image-cropper';
import { CroppedImageComponent } from '../../add forms/add-management-team/cropped-image/cropped-image.component';
declare var ga: Function;
@Component({
  selector: 'app-update-management-team',
  templateUrl: './update-management-team.component.html',
  styleUrls: ['./update-management-team.component.css']
})

export class UpdateManagementTeamComponent implements OnInit {

  updateTeam: FormGroup
  smeId: string
  draft: boolean = false
  publish: boolean = true
  showButton: boolean = true
  emailPattern = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@" + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
  url: string
  uploadedImage: string
  selectedImages: boolean
  imageTypes: Array<string>
  allowedImageSize: number
  progressPercent: number
  imageUploadFail: boolean
  showUploadProgress: boolean
  imageRequired: boolean
  imageSizeError: boolean
  imageTypeError: boolean
  contentServer: string = environment.CONTENT_SERVER

  /*New*/
  imageChangedEvent: any = '';
  croppedImage: any = '';
  showCropper = false;
  imageCropper: ImageCropperComponent;
  file: any
  croppedImageDialog: MatDialogRef<CroppedImageComponent>;

  constructor(private formBuilder: FormBuilder, private http: HttpClient,
    private constants: ConstantService, private token: TokenService,
    private router: Router, private title: PageTitleService, private matDialog: MatDialog,
    private route: ActivatedRoute, private smeInfoService: LazySmeModuleService,
    private dialog: DialogService, private snackBar: SnackBarService) {
    this.imageTypes = constants.getImageFormats();
    this.allowedImageSize = constants.getMaxFileSize();
    ga('set', 'page', router.url);
    ga('send', 'pageview');
  }

  ngOnInit() {
    this.title.updateTitle('Update Management Team')
    this.route.queryParams.subscribe(
      t => {
        let teamUuid = t['t']
        if (teamUuid != undefined) {
          this.getTeamData(teamUuid)

        }
      }
    )
    this.updateTeam = this.formBuilder.group({
      teamUuid: new FormControl(null),
      fullName: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z. ]*$'), Validators.maxLength(50)]),
      designation: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]*$'), Validators.minLength(1), Validators.maxLength(80)]),
      experience: new FormControl(null, [Validators.pattern('[0-9]+'), Validators.required]),
      mail: new FormControl(null, [Validators.required, Validators.pattern(this.emailPattern), Validators.required]),
      profileDesc: new FormControl(null, [Validators.maxLength(500), Validators.minLength(20), Validators.required]),
      profileImageUrl: new FormControl(null),
      fbLink: new FormControl(null, [Validators.minLength(5), Validators.maxLength(50)]),
      linkedinLink: new FormControl(null, [Validators.minLength(5), Validators.maxLength(50)]),
      twitterLink: new FormControl(null, [Validators.minLength(5), Validators.maxLength(50)]),
    })
  }

  getTeamData(teamUuid) {
    this.smeInfoService.getTeam(teamUuid).subscribe(
      res => {
        if (!res.error && res.code == 200) {
          if (res.data.profileImageUrl) {
            this.selectedImages = true
          }
          this.updateTeam.patchValue(
            {
              teamUuid: res.data.teamUuid,
              fullName: res.data.fullName,
              designation: res.data.designation,
              experience: res.data.experience,
              profileDesc: res.data.profileDesc,
              fbLink: res.data.fbLink,
              linkedinLink: res.data.linkedinLink,
              twitterLink: res.data.twitterLink,
              mail: res.data.mail,
              profileImageUrl: res.data.profileImageUrl
            }
          )
          this.uploadedImage = res.data.profileImageUrl
        }
      },
    )
  }

  // onFileChanged(e: any) {
  //   this.imageSizeError = false
  //   this.imageTypeError = false

  //   this.file = e.target.files[0]

  //   if (this.file != null || this.file != undefined) {
  //     this.selectedImages = true
  //   }

  //   if (this.imageTypes.indexOf(this.file.type) === -1) {
  //     this.imageTypeError = true
  //     this.selectedImages = false
  //     return false
  //   } else if (this.file.size > this.allowedImageSize) {
  //     this.imageSizeError = true
  //     this.selectedImages = false

  //     return false
  //   }
  //   if (this.file) {
  //     let reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       this.url = e.target.result;
  //     }
  //     reader.readAsDataURL(this.file);
  //   }
  //   this.uploadImagesToServer()

  // }

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
          if (event.body.data[0] != null || event.body.data[0] != undefined) {
            this.uploadedImage = event.body.data[0].imageLocation
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

  // uploadImagesToServer() {
  //   this.showUploadProgress = true
  //   this.imageUploadFail = false
  //   this.imageSizeError = false
  //   this.imageTypeError = false
  //   let formData = new FormData()
  //   formData.append('images', this.file)

  //   this.http.post<CustomHttpResponse<any>>(environment.SME_INFORMATION_URL + 'images', formData, {
  //     reportProgress: true, observe: 'events', params: { entityType: "teams" }
  //   }).subscribe(
  //     event => {
  //       if (event.type === HttpEventType.UploadProgress) {
  //         this.progressPercent = Math.round(100 * event.loaded / event.total);
  //       }
  //       else if (event instanceof HttpResponse) {

  //         if (event.body.data[0] != null || event.body.data[0] != undefined) {
  //           this.uploadedImage = event.body.data[0].imageLocation
  //         }
  //       }
  //       this.showUploadProgress = false
  //       this.imageRequired = false

  //     },
  //     err => {
  //       this.imageUploadFail = true
  //       this.showUploadProgress = false
  //       this.selectedImages = undefined
  //     },
  //   )
  // }

  deleteImageTeam() {
    this.uploadedImage = undefined
    this.selectedImages = false
  }
  onUpdateTeam(status: boolean) {
    if (this.updateTeam.valid && this.uploadedImage) {
      this.showButton = false
      this.smeId = this.token.getSmeId()
      let updateTeam: SMEManagementTeam = this.updateTeam.value;
      updateTeam.active = status
      updateTeam.profileImageUrl = this.uploadedImage

      if (updateTeam.profileDesc != null && updateTeam.profileDesc.length <= 0) {
        updateTeam.profileDesc = null
      }
      if (updateTeam.fbLink != null && updateTeam.fbLink.length <= 0) {
        updateTeam.fbLink = null
      }
      if (updateTeam.twitterLink != null && updateTeam.twitterLink.length <= 0) {
        updateTeam.twitterLink = null
      }
      if (updateTeam.linkedinLink != null && updateTeam.linkedinLink.length <= 0) {
        updateTeam.linkedinLink = null
      }
      if (updateTeam.fullName != null && updateTeam.fullName.length <= 0) {
        updateTeam.fullName = null
      }
      if (updateTeam.designation != null && updateTeam.designation.length <= 0) {
        updateTeam.designation = null
      }
      if (updateTeam.profileDesc != null && updateTeam.profileDesc.length <= 0) {
        updateTeam.profileDesc = null
      }
      let suUid = this.token.getSmeId();

      this.smeInfoService.updateTeam(updateTeam).subscribe(

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
                          this.onUpdateTeam(status);
                        }
                      }
                    )
                  }
                }
              )
            }
          }
          else {
            this.snackBar.open('Management Team Update Successfully !!')
            this.router.navigateByUrl('/my-sme/' + this.smeId + '/management-teams');
          }

        },
      );
    }
    else {
      if (!this.uploadedImage) {
        this.imageRequired = true
      }
      window.scroll(0, 0)
    }

  }

}
