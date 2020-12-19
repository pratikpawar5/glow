import { Component, OnInit } from '@angular/core';
import { BusinessPost, BusinessPostDto } from '@models/business-posts';
import { BusinessPostService } from '@services/business-post/business-post.service';
import { PageTitleService } from '@services/page-title/page-title.service';
import { DeleteObject, ObjectType, BusinessPostDelete } from '@models/common-delete';
import { TokenService } from '@services/token/token.service';
import { DeleteObjectsComponent } from 'app/shared/components/delete-objects/delete-objects.component';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
declare var ga: Function;
@Component({
  selector: 'app-admin-business-post',
  templateUrl: './admin-business-post.component.html',
  styleUrls: ['./admin-business-post.component.css']
})
export class AdminBusinessPostComponent implements OnInit {

  businessposts: Array<BusinessPostDto>
  noDataFound: boolean
  sUuid: string
  showSpinner: boolean = true
  notFound: boolean
  constructor(private businessPostService: BusinessPostService,
    private pageTitileService: PageTitleService, private token: TokenService,
    private dialog: DialogService, private matDialog: MatDialog, router: Router) {
    ga('set', 'page', router.url);
    ga('send', 'pageview');
  }

  ngOnInit() {
    this.pageTitileService.updateTitle('Business Post | Admin')
    this.sUuid = this.token.getSmeId();
    this.businessPostService.getRejectedOrPendingPosts().subscribe(
      res => {
        if (res.error) {
          this.showSpinner = false
          this.notFound = true
        }
        else {
          this.businessposts = res.data
          this.showSpinner = false
        }
      }
    )
  }

  onDelete(businessposts: BusinessPost, index) {
    let removeBuisnessPost = new BusinessPostDelete();
    removeBuisnessPost.businessPostId = businessposts.businessPostId;
    let deleteObj: DeleteObject<any> = {
      type: ObjectType.BUSINESS_POST_ID,
      uuid: null,
      cirlceObjects: removeBuisnessPost
    }
    let ref = this.matDialog.open(DeleteObjectsComponent, this.dialog.getDeleteDialogConfig(deleteObj))
    ref.afterClosed().subscribe(
      res => {
        if (res) {
          this.businessposts.splice(index, 1)
        }
      }
    )
  }

}
