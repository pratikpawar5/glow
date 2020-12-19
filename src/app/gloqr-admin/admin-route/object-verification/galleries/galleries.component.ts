import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { SmeEntity, SMEItemsType } from '@models/sme';
import { SMEGallery } from '@models/gallery';
import { ActivatedRoute } from '@angular/router';
import { GalleryDetailDialogComponent } from './gallery-detail-dialog/gallery-detail-dialog.component';
import { GloqrAdminService } from 'app/gloqr-admin/gloqr-admin-services/gloqr-admin.service';

@Component({
  selector: 'app-galleries',
  templateUrl: './galleries.component.html',
  styleUrls: ['./galleries.component.css']
})
export class GalleriesComponent implements OnInit {

  smeEntities = new Array<SmeEntity>();
  smeGallery: Array<SMEGallery>
  @Input()
  sUuid: string
  isSelect: boolean = false
  disableFlag: boolean = true;
  approveSelectedSize: any = 0;
  rejectSelectedSize: any = 0;
  name: string;
  approveGallerySMEfaceDialog: MatDialogRef<GalleryDetailDialogComponent>
  showSpinner: boolean = true
  notFound: boolean
  showButton: boolean = true

  constructor(private route: ActivatedRoute, private gloqrAdminService: GloqrAdminService, private matDialog: MatDialog) { }

  ngOnInit() {

    this.approveSelectedSize = 0
    this.rejectSelectedSize = 0
    this.gloqrAdminService.getSmeItems(this.sUuid, SMEItemsType.GALLERY).subscribe(
      res => {
        if (res.error) {
          this.showSpinner = false
          this.notFound = true
        }
        else {
          this.smeGallery = res.data
          this.showSpinner = false
        }
      }
    )
  }


  onViewGalleryDetail(gallery: SMEGallery, index: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = false;
    dialogConfig.width = '1000px';
    dialogConfig.height = '800px';
    dialogConfig.data = { gallery: gallery, sUuid: this.sUuid }
    this.approveGallerySMEfaceDialog = this.matDialog.open(GalleryDetailDialogComponent, dialogConfig);
    this.approveGallerySMEfaceDialog.afterClosed().subscribe(
      res => {
        if (res) {
          this.rejectSelectedSize = 0
          this.approveSelectedSize = 0
          if (res.state === 1) {
            gallery.isApprove = true
            gallery.isReject = false
          }

          if (res.state === 2) {
            gallery.isReject = true
            gallery.isApprove = false
          }

          let entityIndex: number = this.smeEntities.findIndex(entity => entity.id == res.id);
          if (entityIndex != -1) {
            this.smeEntities.splice(entityIndex, 1);
          }
          this.smeEntities.push(res)

          this.smeEntities.forEach(smeEntity => {
            let gallery: SMEGallery = this.smeGallery.find(gallery => gallery.galleryUuid === smeEntity.id)
            if (gallery) {
              gallery.frontFeedBackMessage = smeEntity.feedbackMessage

              if (smeEntity.state == 2) {
                this.smeGallery[index].isSelected = true
                ++this.rejectSelectedSize;
              }

              if (smeEntity.state == 1) {
                this.smeGallery[index].isSelected = true
                ++this.approveSelectedSize
              }

            }
          })

        }

      }
    )
  }

  onSubmit() {
    if (this.smeEntities.length > 0) {
      this.showButton = false
      this.gloqrAdminService.updateSmeItems(this.smeEntities, SMEItemsType.GALLERY).subscribe(
        res => {
          this.smeEntities.forEach(smeEntity => {
            let index: number = this.smeGallery.findIndex(gallery => gallery.galleryUuid === smeEntity.id)
            if (index != -1) {
              this.smeGallery.splice(index, 1)
              this.showButton = true
              this.rejectSelectedSize = 0
              this.smeEntities = []
              this.approveSelectedSize = 0
            }
          })

        }
      )
    }
  }


}
