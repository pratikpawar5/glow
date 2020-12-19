import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'environments/environment';
import { SMECategoryDto, GloqrSMEDto, SMEConstant, SmeEntity } from '@models/sme';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SmeService } from '@services/sme/sme.service';
import { GloqrAdminService } from 'app/gloqr-admin/gloqr-admin-services/gloqr-admin.service';
import { SMEImage } from '@models/sme-image';
import { HttpClient } from '@angular/common/http';
import { ConstantService } from '@services/common/constant-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SnackBarService } from '@services/common/snack-bar.service';
import { SmeVerifyComponent } from './sme-verify/sme-verify.component';
import { MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material';

@Component({
  selector: 'app-sme-basic-details',
  templateUrl: './sme-basic-details.component.html',
  styleUrls: ['./sme-basic-details.component.css']
})

export class SmeBasicDetailsComponent implements OnInit {

  smeData: GloqrSMEDto
  disableFlag = true
  @Input()
  sUuid: string;

  sliderImages: Array<SMEImage>
  contentServer: string = environment.CONTENT_SERVER
  showSpinner: boolean = true
  notFound: boolean
  showButton: boolean = true
  /*Custom*/
  userSelectedCategory: boolean
  smeCategoryForm: FormGroup
  smeCategories: Array<SMECategoryDto>
  selectedImages = new Array<SMEImage>();

  file: File
  logoFile: File
  imageLocationOne: string = 'LocationOne'
  imageLocationTwo: string = 'LocationTwo'
  temporary_image: any
  imageTypes: Array<string>
  imageLocationOneSize: number = 51200
  imageLocationTwoSize: number = 51200
  logoImageSize: number = 51200;
  imageTypeError: boolean;
  imageSizeErrorLocationOne: boolean;
  imageSizeErrorLocationTwo: boolean;
  existingImage: any = '';
  tempLogo: any;
  tempSlider: any;
  uploadSlider: boolean = true
  saveLogo: boolean = false
  saveBanner: boolean
  uuid: string
  smeVerifyComponentDialog: MatDialogRef<SmeVerifyComponent>;

  constructor(private gloqrAdminService: GloqrAdminService, private matDialog: MatDialog, private snackBar: SnackBarService, private router: Router, private sanitizer: DomSanitizer, private constantService: ConstantService, private http: HttpClient, private smeService: SmeService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.imageTypes = constantService.getImageFormats();
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.getCategories();
    this.smeCategoryForm = this.formBuilder.group({
      categoryName: new FormControl(null, [Validators.required]),
    })
    this.gloqrAdminService.smeData(this.sUuid).subscribe(
      res => {
        if (res.error) {
          this.showSpinner = false
          this.notFound = true
        }
        else {
          this.smeData = res.data
          this.sliderImages = res.data.homeSliderImages
          this.existingImage = this.smeData.logoImage;
          this.showSpinner = false
          if (this.smeData.smeCategory) {
            this.setCategory()
          } else {
            this.userSelectedCategory = true;
          }
        }
      }
    )
  }

  getCategories() {
    this.smeService.smeCategories().subscribe(
      res => {
        if (!res.error) {
          this.smeCategories = res.data
        }
      }
    )
  }

  setCategory() {
    this.smeCategoryForm.controls['categoryName'].setValue(this.smeData.smeCategory.categoryUuid)
  }

  /* LOGO IMAGE */
  onFileLogoChange(event) {
    if (event.target.files) {
      this.logoFile = event.target.files[0];
      if (this.imageTypes.indexOf(this.logoFile.type) === -1) {
        this.imageTypeError = true
        window.alert("Supported file formats are: .png .jpeg .jpg")
      }
      else if (this.logoFile.size > this.logoImageSize) {
        window.alert("Image file size should be less than 50kb")
      }
      else {
        if (this.logoFile) {
          let reader = new FileReader();
          reader.onload = (e: any) => {
            this.tempLogo = e.target.result;
          }
          this.saveLogo = true
          reader.readAsDataURL(this.logoFile);
        }
      }

    }
  }

  onSaveLogoImage() {
    let formData = new FormData()
    formData.append('logoImage', this.logoFile)
    if (this.logoFile) {
      this.showButton = false
      this.gloqrAdminService.changeSmeProfileImage(formData, this.sUuid).subscribe(
        res => {
          if (res.error) {
            this.showButton = true
          }
          else {
            this.snackBar.open('Logo Image Updated ');
            this.router.navigateByUrl('', { skipLocationChange: true }).then(() =>
              this.router.navigate(['gloqr-admin', 'existing-smes', this.sUuid, this.route.snapshot.params['uuid'], 'sme-basic-details']));
          }
        },
        err => {
          this.showButton = true
        }
      )
    }
  }

  deleteLogoImage(img: string) {
    if (img === 'existing') {
      this.existingImage = null;
      this.saveLogo = false
    }
    else {
      this.tempLogo = null;
      this.saveLogo = false
    }
  }
  /* LOGO IMAGE */

  /* SLIDER IMAGE */
  onFileChanged(event, index: number, location: string) {
    if (event.target.files) {
      this.file = event.target.files[0];

      if (this.imageTypes.indexOf(this.file.type) === -1) {
        this.imageTypeError = true
        window.alert("Supported file formats are: .png .jpeg .jpg")
      }
      else if (location === this.imageLocationOne && this.file.size > this.imageLocationOneSize) {
        this.imageSizeErrorLocationOne = true
        window.alert("Image file size should be less than 50kb")
      }
      else if (location === this.imageLocationTwo && this.file.size > this.imageLocationTwoSize) {
        this.imageSizeErrorLocationTwo = true
        window.alert("Image file size should be less than 50kb")

      }
      else {
        if (this.file) {
          let reader = new FileReader();
          reader.onload = (e: any) => {
          }
          reader.readAsDataURL(this.file);
          this.uploadImagesToServer(index, location)
        }
      }

    }
  }

  uploadImagesToServer(index: number, location: string) {
    let formData = new FormData()
    formData.append('images', this.file)
    this.gloqrAdminService.postNewSMEImages(formData, this.sUuid, 'sliderImages').subscribe(
      event => {
        if (event.error) {

        }
        else {
          if (location === this.imageLocationOne) {
            if (this.sliderImages.length > 0) {
              this.sliderImages[index].imageLocationOne = event.data[0].imageLocation;
            }
            else {
              let img = new SMEImage();
              img.imageLocationOne = event.data[0].imageLocation
              this.sliderImages.push(img)
            }
          }
          else if (location === this.imageLocationTwo) {
            if (this.sliderImages.length > 0) {
              this.sliderImages[index].imageLocationTwo = event.data[0].imageLocation;
            }
            else {
              let img = new SMEImage();
              img.imageLocationTwo = event.data[0].imageLocation
              this.sliderImages.push(img)
            }

          }
          if (event.data.length > 0) {
            this.saveBanner = true
          }
        }
      },
    )
  }

  deleteImage(index: number, location: string) {
    if (location === this.imageLocationOne) {
      this.sliderImages[index].imageLocationOne = undefined
      this.saveBanner = false
    }
    else if (location === this.imageLocationTwo) {
      this.sliderImages[index].imageLocationTwo = undefined
      this.saveBanner = false
    }
  }

  onSaveSliderImage() {
    let smeEntity = new SmeEntity();
    smeEntity.images = this.sliderImages
    smeEntity.id = this.sUuid
    if (smeEntity) {
      this.showButton = false
      this.gloqrAdminService.updateSMEImages(smeEntity, SMEConstant.SLIDER_IMAGES).subscribe(
        res => {
          if (res.error) {
            this.showButton = true
          }
          else {
            this.snackBar.open('Slider Image Updated ');
            this.router.navigateByUrl('', { skipLocationChange: true }).then(() =>
              this.router.navigate(['gloqr-admin', 'existing-smes', this.sUuid, this.route.snapshot.params['uuid'], 'sme-basic-details']));
          }
        }, err => {
          this.showButton = true
        }
      )
    }

  }
  /* SLIDER IMAGE */

  verifySME(sUuid: string) {
    if (this.smeCategoryForm.valid) {
      let categoryName = this.smeCategoryForm.controls['categoryName'].value
      let dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = false
      dialogConfig.width = '400px'
      dialogConfig.height = '180px'
      dialogConfig.disableClose = true
      dialogConfig.data = { sUuid: sUuid, smeName: this.smeData.smeName, categoryName: categoryName }
      let ref = this.matDialog.open(SmeVerifyComponent, dialogConfig);
      ref.afterClosed().subscribe(
        res => {
          if (res) {
            this.smeData.verified = false
          }
        })
    }
    else {
      window.scrollTo(0, 0)
    }
  }

}
