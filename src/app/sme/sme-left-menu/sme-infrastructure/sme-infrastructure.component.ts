import { Component, OnInit } from '@angular/core';
import { SMEInfrastrcture } from '@models/infrastructure';
import { environment } from 'environments/environment';
import { SmeService } from '@services/sme/sme.service';
import { PageTitleService } from '@services/page-title/page-title.service';
import { Router } from '@angular/router';
import { NgxGalleryImage, NgxGalleryOptions, NgxGalleryAnimation, INgxGalleryImage } from 'ngx-gallery';
declare var ga: Function;
@Component({
  selector: 'app-sme-infrastructure',
  templateUrl: './sme-infrastructure.component.html',
  styleUrls: ['./sme-infrastructure.component.css']
})
export class SmeInfrastructureComponent implements OnInit {


  smeInfrastructures: Array<SMEInfrastrcture>
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
    this.title.updateTitle('Infrastrcture')

    this.galleryOptions = [
      {
        imageSize: 'contain',
        width: '500px',
        height: '300px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        "previewFullscreen": true,
        "previewKeyboardNavigation": true,
        "previewCloseOnClick": true,
        "previewCloseOnEsc": true,
        "previewZoom": true,
        "previewRotate": true,
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


    this.smeService.smeInfrastructure(null).subscribe(
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

      }
    )
  }
  getImageFromInfraMap(id: string) {
    let images: Array<NgxGalleryImage> = []
    images = this.imageGalleryMap.get(id);
    return images;
  }
}
