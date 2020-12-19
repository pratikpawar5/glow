import { Component, OnInit, Input } from '@angular/core';
import { SmeEntity } from '@models/sme';
import { BusinessPost } from '@models/business-posts';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PostDetailDialogComponent } from './post-detail-dialog/post-detail-dialog.component';
import { GloqrAdminService } from 'app/gloqr-admin/gloqr-admin-services/gloqr-admin.service';
@Component({
  selector: 'app-business-posts',
  templateUrl: './business-posts.component.html',
  styleUrls: ['./business-posts.component.css']
})
export class BusinessPostsComponent implements OnInit {

  smeEntities = new Array<SmeEntity>();
  businessPosts: Array<BusinessPost>
  approveSelectedSize: any = 0;
  rejectSelectedSize: any = 0;
  @Input()
  sUuid: string
  isSelect: boolean = false
  disableFlag: boolean = true;
  approveBIPostDialog: MatDialogRef<PostDetailDialogComponent>;
  @Input()
  uuid: string
  showSpinner: boolean = true
  notFound: boolean
  showButton: boolean = true

  constructor(private gloqrAdminService: GloqrAdminService, private matDialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit() {
    this.approveSelectedSize = 0
    this.rejectSelectedSize = 0

    //ALL NEW GENRATED OR EXIXSTING MODIFY BUSINESS POST WILL BE DISPLAY HERE
    this.gloqrAdminService.getBusinessPost(this.sUuid).subscribe(
      res => {
        if (res.error) {
          this.showSpinner = false
          this.notFound = true
        }
        else {
          this.businessPosts = res.data
          this.showSpinner = false
        }
      },
    )
  }

  //ON CLICK VIEW DETAIL LINK
  onViewDetail(businessPost: BusinessPost, index: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = false;
    dialogConfig.width = '1000px';
    dialogConfig.height = '800px';
    dialogConfig.data = businessPost
    this.approveBIPostDialog = this.matDialog.open(PostDetailDialogComponent, dialogConfig);
    this.approveBIPostDialog.afterClosed().subscribe(
      res => {
        if (res) {
          this.rejectSelectedSize = 0
          this.approveSelectedSize = 0
          if (res.state === 1) {
            businessPost.isApprove = true
            businessPost.isReject = false
          }

          if (res.state === 2) {
            businessPost.isReject = true
            businessPost.isApprove = false
          }

          let entityIndex: number = this.smeEntities.findIndex(entity => entity.id == res.id);
          if (entityIndex != -1) {
            this.smeEntities.splice(entityIndex, 1);
          }
          this.smeEntities.push(res)
          this.smeEntities.forEach(smeEntity => {
            let businessPost: BusinessPost = this.businessPosts.find(businessPost => businessPost.businessPostId === smeEntity.id)
            if (businessPost) {
              businessPost.frontFeedBackMessage = smeEntity.feedbackMessage

              if (smeEntity.state == 2) {
                this.businessPosts[index].isSelected = true
                ++this.rejectSelectedSize;
              }

              if (smeEntity.state == 1) {
                this.businessPosts[index].isSelected = true
                ++this.approveSelectedSize
              }

            }
          })

        }
      }
    )
  }

  onSubmit() {
    let adminBIPostPublish = {
      userId: this.uuid,
      smeId: this.sUuid,
      postsInfo: this.smeEntities
    }
    if (adminBIPostPublish.postsInfo.length > 0) {
      this.showButton = false

      this.gloqrAdminService.updateBiPost(adminBIPostPublish).subscribe(
        res => {
          this.smeEntities.forEach(smeEntity => {
            let index: number = this.businessPosts.findIndex(post => post.businessPostId === smeEntity.id)
            if (index != -1) {
              this.businessPosts.splice(index, 1)
              this.smeEntities = []
              this.showButton = true
              this.rejectSelectedSize = 0
              this.approveSelectedSize = 0
            }
          })
        }
      )
    }
  }



}
