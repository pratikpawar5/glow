import { Component, OnInit } from '@angular/core';
import { SMEInfrastrcture } from '@models/infrastructure';
import { ActivatedRoute, Router } from '@angular/router';
import { PageTitleService } from '@services/page-title/page-title.service';
import { environment } from 'environments/environment.prod';
import { LazySmeViewService } from 'app/sme-view/http-service/lazy-sme-view.service';
import { NgxGalleryImage, NgxGalleryOptions, NgxGalleryAnimation, INgxGalleryImage } from 'ngx-gallery';
declare var ga: Function;
@Component({
  selector: 'app-sme-infrastructures-view',
  templateUrl: './sme-infrastructures-view.component.html',
  styleUrls: ['./sme-infrastructures-view.component.css']
})
export class SmeInfrastructuresViewComponent implements OnInit {

  smeInfrastructures: Array<SMEInfrastrcture>
  sUuid: string
  infraNotFound: boolean = false
  showSpinner: boolean = true
  notFound: boolean
  status: string = 'active'
  imageGalleryMap = new Map<string, Array<NgxGalleryImage>>();
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  showImages: boolean

  constructor(private route: ActivatedRoute, private pageTitleService: PageTitleService, private smeService: LazySmeViewService,
    router:Router) { 
    ga('set', 'page', router.url);
    ga('send', 'pageview');
  }
  ngOnInit() {

    this.pageTitleService.updateTitle('Infrastructure')

    this.sUuid = this.route.snapshot.root.firstChild.children[0].params['sUuid']

    this.galleryOptions = [
      {
        imageSize: 'contain',
        width: '500px',
        height: '300px',
        imageAnimation: NgxGalleryAnimation.Slide,
        "previewFullscreen": true,
        "previewKeyboardNavigation": true,
        "previewCloseOnClick": true,
        "previewCloseOnEsc": true,
        "previewZoom": true,
        "previewRotate": true,
        "imageArrows": false,
        "imageSwipe": true,
        "thumbnailsArrows": false,
        "thumbnailsSwipe": true,
        "previewSwipe": true,
        "thumbnails": false
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20,
        imageSize: 'contain',

      },
      // max-width 400
      {
        breakpoint: 400,
        preview: true
      }
    ];
    
    this.smeService.smeInfrastuctures(this.sUuid).subscribe(
      res => {
        if (res.error) {
          this.showSpinner = false
          this.notFound = true
        }
        else {
          this.smeInfrastructures = res.data
          this.smeInfrastructures.forEach(infra => {
            let images = new Array<NgxGalleryImage>();
            infra.images.forEach(image => {
              let ingxGalleryImage: INgxGalleryImage = {
                small: environment.CONTENT_SERVER + image.imageLocationTwo,
                medium: environment.CONTENT_SERVER + image.imageLocationTwo,
                big: environment.CONTENT_SERVER + image.imageLocationOne,
                description: infra.description
              };
              let ngxGalleryImage = new NgxGalleryImage(ingxGalleryImage)
              images.push(ngxGalleryImage)
            })
            this.imageGalleryMap.set(infra.infraUuid, images)
            this.showImages = true
            this.showSpinner = false
          })
        }
      },
    )
  }
  getImageFromInfraMap(id: string) {
    let images: Array<NgxGalleryImage> = []
    images = this.imageGalleryMap.get(id);
    return images;
  }
}


