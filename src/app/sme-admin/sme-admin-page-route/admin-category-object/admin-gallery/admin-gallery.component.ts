import { Component, OnInit } from '@angular/core';
import { SMEItemStatus, SmeEntity, SMEItemsType } from '@models/sme';
import { SMEGallery } from '@models/gallery';
import { SmeAdminServiceService } from 'app/sme-admin/sme-admin-service/sme-admin-service.service';
import { SmeService } from '@services/sme/sme.service';
import { PageTitleService } from '@services/page-title/page-title.service';
import { TokenService } from '@services/token/token.service';
import { GalleryDelete, DeleteObject, ObjectType } from '@models/common-delete';
import * as $ from 'jquery';
import { SnackBarService } from '@services/common/snack-bar.service';
import { DeleteObjectsComponent } from 'app/shared/components/delete-objects/delete-objects.component';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';


declare var ga: Function;
@Component({
  selector: 'app-admin-gallery',
  templateUrl: './admin-gallery.component.html',
  styleUrls: ['./admin-gallery.component.css']
})
export class AdminGalleryComponent implements OnInit {

  smeGallery: Array<SMEGallery>
  disablePublishButton: boolean = true;
  disableDeactiveButton: boolean = true;
  map = new Map<string, SMEItemStatus>();
  sUuid: string
  edit: boolean = false
  delete: boolean = false
  status: string = 'active'
  selectedGallerySize: any = 0;
  status1: string = 'deactive'
  publishGalleryButton: boolean = true
  showSpinner: boolean = true
  notFound: boolean
  showButton: boolean = true

  constructor(private smeAdminServiceService: SmeAdminServiceService, private smeService: SmeService,
    private snackBar: SnackBarService, private dialog: DialogService, private matDialog: MatDialog,
    private pageTitleService: PageTitleService, private token: TokenService,router:Router) { 
      ga('set', 'page', router.url);
      ga('send', 'pageview');
    }

  ngOnInit() {
    this.pageTitleService.updateTitle('Gallery | Admin')

    this.selectedGallerySize = 0;
    this.sUuid = this.token.getSmeId()
    this.getGalleryofSMEs(this.status)
  }
  getGalleryofSMEs(status: string) {
    this.smeService.smeGalleries(status).subscribe(
      res => {
        if (res.error) {
          this.showSpinner = false
          this.notFound = true
        }
        else {
          this.smeGallery = res.data
          this.showSpinner = false
        }
      },
    )
  }

  onDelete(gallery: SMEGallery, index) {

    let removeGallery = new GalleryDelete();
    removeGallery.galleryUuid = gallery.galleryUuid;
    removeGallery.galleryTitle = gallery.galleryTitle

    let deleteObj: DeleteObject<any> = {
      type: ObjectType.GALLERY,
      uuid: null,
      cirlceObjects: removeGallery

    }
    let ref = this.matDialog.open(DeleteObjectsComponent, this.dialog.getDeleteDialogConfig(deleteObj))
    ref.afterClosed().subscribe(
      res => {
        if (res) {
          this.smeGallery.splice(index, 1)
        }
      }
    )
  }

  onActive() {
    this.edit = false
    this.delete = false
    this.selectedGallerySize = 0
    this.publishGalleryButton = true
    this.disableDeactiveButton = true
    this.map.clear()
    this.smeGallery = undefined
    this.getGalleryofSMEs(this.status)
    this.notFound = false

  }

  onInActive() {
    this.edit = true
    this.delete = true
    this.selectedGallerySize = 0
    this.publishGalleryButton = false
    this.disablePublishButton = true
    this.map.clear()
    this.smeGallery = undefined
    this.getGalleryofSMEs(this.status1)
    this.notFound = false

  }

  onclickCheckbox(galleryUuid: string, active: boolean) {
    if (!this.map.has(galleryUuid)) {
      if (active) {
        this.map.set(galleryUuid, SMEItemStatus.ACTIVE);
      }
      else {
        this.map.set(galleryUuid, SMEItemStatus.DEACTIVE);
      }

    } else {
      this.map.delete(galleryUuid)
    }
    this.selectedGallerySize = this.map.size
    if (this.map.size > 0) {
      this.disablePublishButton = false
      this.disableDeactiveButton = false
    } else {
      this.disablePublishButton = true
      this.disableDeactiveButton = true
    }
  }

  onClickPublish() {
    this.showButton = false
    let publishDataArr = new Array<SmeEntity>();

    this.map.forEach((itemStatus: SMEItemStatus, galleryUuid: string) => {
      let smeItem = new SmeEntity();
      smeItem.id = galleryUuid;
      smeItem.smeAction = itemStatus;
      publishDataArr.push(smeItem);

    });
    this.smeAdminServiceService.publishSmeInfo(publishDataArr, SMEItemsType.GALLERY).subscribe(
      res => {
        if (res.error) {
          this.showButton = true
        }
        else {
          this.snackBar.open('Publish Data Successfully')
          this.map.clear()
          this.disablePublishButton = true
          this.showButton = true
          this.smeGallery = undefined
          this.onInActive()
        }

      },
    )
  }
  onClickDeactive() {
    this.showButton = false
    let publishDataArr = new Array<SmeEntity>();
    this.map.forEach((itemStatus: SMEItemStatus, galleryUuid: string) => {
      let smeItem = new SmeEntity();
      smeItem.id = galleryUuid;
      smeItem.smeAction = itemStatus;
      publishDataArr.push(smeItem);

    });
    this.smeAdminServiceService.publishSmeInfo(publishDataArr, SMEItemsType.GALLERY).subscribe(
      res => {
        if (res.error) {
          this.showButton = true
        }
        else {
          this.snackBar.open('Deactivate Successfully')
          this.map.clear()
          this.showButton = true
          this.disablePublishButton = true
          this.smeGallery = undefined
          this.onActive()
        }
      },
    )
  }

  addGallery() {
    let url = '/my-sme/'+this.sUuid+'/add-gallery'
    window.open(url, '_blank')
  }
  viewAllGallery() {
    let url = '/my-sme/'+this.sUuid+'/galleries'
    window.open(url, '_blank')
  }
  onMouseOver() {
    $(document).ready(function () {
      (<any>$('[data-toggle="tooltip"]')).tooltip();
    });
  }

}
