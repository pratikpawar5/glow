import { Component, OnInit } from '@angular/core';
import { BusinessPostDto } from '@models/business-posts';
import { environment } from 'environments/environment';
import { PageTitleService } from '@services/page-title/page-title.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessPostService } from '@services/business-post/business-post.service';
import { LazySmeViewService } from 'app/sme-view/http-service/lazy-sme-view.service';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { MatDialog } from '@angular/material';
import { TokenService } from '@services/token/token.service';
import { AuthRouteComponent } from 'app/auth/auth-route/auth-route.component';
import { NgxGalleryImage, NgxGalleryOptions, INgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
declare var ga: Function;
@Component({
  selector: 'app-sme-social-post-view',
  templateUrl: './sme-social-post-view.component.html',
  styleUrls: ['./sme-social-post-view.component.css']
})
export class SmeSocialPostViewComponent implements OnInit {
  displayFeeds = new Array<BusinessPostDto>();
  contentServer: string = environment.CONTENT_SERVER
  socialPostNotFound: boolean = false
  showImages: boolean
  imageBusinessPostMap = new Map<string, Array<NgxGalleryImage>>();
  sUuid: string
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  // PAGINATIONS
  page: number = 1;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;


  constructor(private socialService: BusinessPostService, private dialog: DialogService, private matDialog: MatDialog, private token: TokenService, private route: ActivatedRoute, private titleService: PageTitleService, private businessPostService: LazySmeViewService,
    router: Router) {
    ga('set', 'page', router.url);
    ga('send', 'pageview');
  }
  ngOnInit() {
    this.titleService.updateTitle('Business Post')
    this.sUuid = this.route.snapshot.root.firstChild.children[0].params['sUuid']

    this.galleryOptions = [
      {
        imageSize: 'contain',
        thumbnailsColumns: 3,
        imageAnimation: NgxGalleryAnimation.Slide,
        "previewFullscreen": true,
        "previewKeyboardNavigation": true,
        "previewCloseOnClick": true,
        "previewCloseOnEsc": true,
        "previewZoom": true,
        "previewRotate": true,
        "image": false,
        "thumbnailsRemainingCount": true,
        "height": "100px",
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '200px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20,
        imageSize: 'contain',
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: true,
        width: '100%',
        height: '100px',
      }
    ];
    this.getViewTimeLinePosts(this.page);
  }

  getViewTimeLinePosts(page: number) {
    this.businessPostService.getAllFeedsforView(this.sUuid, page).subscribe(
      res => {
        if (!res.error && res.code == 200) {
          this.displayFeeds.push(...res.data);

          this.displayFeeds.forEach(feed => {
            let images = new Array<NgxGalleryImage>();
            if (feed.files) {
              feed.files.forEach(image => {
                let ingxGalleryImage: INgxGalleryImage = {
                  small: environment.CONTENT_SERVER + image.fileLocationTwo,
                  medium: environment.CONTENT_SERVER + image.fileLocationTwo,
                  big: environment.CONTENT_SERVER + image.fileLocationOne,
                };
                let ngxGalleryImage = new NgxGalleryImage(ingxGalleryImage)
                images.push(ngxGalleryImage)
                this.showImages = true
              })
            }
            this.imageBusinessPostMap.set(feed.businessPostId, images)
          })
        }
      },
      err => {
        this.socialPostNotFound = true
      }
    )
  }
  onScrollDown() {
    this.getViewTimeLinePosts(++this.page);
  }
  getImageFromBusinessPostMap(id: string) {
    let images: Array<NgxGalleryImage> = []
    images = this.imageBusinessPostMap.get(id);
    return images;
  }

  onClickLike(i: number, postId: string) {
    if (!this.token.isLoggedIn()) {
      const dialogRef = this.matDialog.open(AuthRouteComponent, this.dialog.loginConfig())
      dialogRef.afterClosed().subscribe(
        res => {
          if (this.token.isLoggedIn()) {
            this.likePost(i, postId)
          }
        }
      )
    }
    else {
      this.likePost(i, postId)
    }
  }

  likePost(i: number, postId: string) {
    this.displayFeeds[i].liked = true;
    let likesCount = this.displayFeeds[i].likesCount == undefined ? 0 : this.displayFeeds[i].likesCount;
    this.displayFeeds[i].likesCount = likesCount + 1;
    this.socialService.likePost(postId).subscribe(res => {
      if (!res.error) {

      }
    })
  }
}
