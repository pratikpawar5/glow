import { Component, OnInit } from '@angular/core';
import { SMEGallery } from '@models/gallery';
import { environment } from 'environments/environment';
import { SmeService } from '@services/sme/sme.service';
import { PageTitleService } from '@services/page-title/page-title.service';
import { Router } from '@angular/router';
import { NgxGalleryImage, NgxGalleryOptions, INgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
declare var ga: Function;
@Component({
  selector: 'app-sme-gallery',
  templateUrl: './sme-gallery.component.html',
  styleUrls: ['./sme-gallery.component.css']
})
export class SmeGalleryComponent implements OnInit {

  smeGalleries: Array<SMEGallery>
  showImages: boolean
  showSpinner: boolean = true
  notFound: boolean
  contentServer: string = environment.CONTENT_SERVER
  imageGalleryMap = new Map<string, Array<NgxGalleryImage>>();
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private smeService: SmeService, private title: PageTitleService, router: Router) {
    ga('set', 'page', router.url);
    ga('send', 'pageview');
  }

  ngOnInit() {    
    this.title.updateTitle('Gallery')
    this.galleryOptions = [
      {
        imageSize: 'contain',
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
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
        "previewSwipe": true

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

    this.smeService.smeGalleries(null).subscribe(
      res => {
        if (res.error) {
          this.showSpinner = false
          this.notFound = true
        }
        else {
          this.smeGalleries = res.data

          this.smeGalleries.forEach(gallery => {
            let images = new Array<NgxGalleryImage>();
            gallery.images.forEach(image => {
              let ingxGalleryImage: INgxGalleryImage = {
                small: environment.CONTENT_SERVER + image.imageLocationTwo,
                medium: environment.CONTENT_SERVER + image.imageLocationOne,
                big: environment.CONTENT_SERVER + image.imageLocationOne,
                description: gallery.description
              };
              let ngxGalleryImage = new NgxGalleryImage(ingxGalleryImage)
              images.push(ngxGalleryImage)
            })
            this.imageGalleryMap.set(gallery.galleryUuid, images)
            this.showImages = true
            this.showSpinner = false
          })
        }
      }
    )

  }
  getImageFromGalleryMap(id: string) {
    let images: Array<NgxGalleryImage> = []
    images = this.imageGalleryMap.get(id);
    return images
  }
}