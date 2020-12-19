import { Component, OnInit } from '@angular/core';
import { BusinessPostDto } from '@models/business-posts';
import { BusinessPostService } from '@services/business-post/business-post.service';
import { environment } from 'environments/environment';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation, INgxGalleryImage } from 'ngx-gallery';

@Component({
  selector: 'app-display-business-post',
  templateUrl: './display-business-post.component.html',
  styleUrls: ['./display-business-post.component.css']
})
export class DisplayBusinessPostComponent implements OnInit {

  displayFeeds = new Array<BusinessPostDto>();
  showImages: boolean
  contentServer: string = environment.CONTENT_SERVER
  imageBusinessPostMap = new Map<string, Array<NgxGalleryImage>>();
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  // PAGINATIONS
  page: number = 1;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  show = false;

  constructor(private socialService: BusinessPostService) { }

  ngOnInit() {
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

    this.getTimelinePosts(this.page);

  }

  getTimelinePosts(page: number) {
    this.socialService.getAllFeedsForEditMode(page).subscribe(
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
        this.displayFeeds = []
      }
    )
  }

  onScrollDown() {
    this.getTimelinePosts(++this.page);
  }

  getImageFromBusinessPostMap(id: string) {
    let images: Array<NgxGalleryImage> = [];
    images = this.imageBusinessPostMap.get(id);
    return images;
  }

  likePost(postId: string, i: number) {
    this.displayFeeds[i].liked = true;
    let likesCount = this.displayFeeds[i].likesCount == undefined ? 0 : this.displayFeeds[i].likesCount;
    this.displayFeeds[i].likesCount = likesCount + 1;
    this.socialService.likePost(postId).subscribe(res => {
      if (!res.error) {

      }
    })
  }
}
