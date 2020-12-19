import { Component, OnInit } from '@angular/core';
import { SMECertificate } from '@models/certificate';
import { environment } from 'environments/environment';
import { SmeService } from '@services/sme/sme.service';
import { PageTitleService } from '@services/page-title/page-title.service';
import { Router } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation, INgxGalleryImage } from 'ngx-gallery';

declare var ga: Function;
@Component({
  selector: 'app-sme-certificates',
  templateUrl: './sme-certificates.component.html',
  styleUrls: ['./sme-certificates.component.css']
})
export class SmeCertificatesComponent implements OnInit {

  smeCertificates: Array<SMECertificate>
  showImages: boolean
  showSpinner: boolean = true
  notFound: boolean
  contentServer: string = environment.CONTENT_SERVER
  imageCertMap = new Map<string, Array<NgxGalleryImage>>();
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private smeService: SmeService, private title: PageTitleService, router: Router) {
    ga('set', 'page', router.url);
    ga('send', 'pageview');
  }
  ngOnInit() {
    this.title.updateTitle('Certificate')

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

    this.smeService.smeCertificates(null).subscribe(
      res => {
        if (res.error) {
          this.showSpinner = false
          this.notFound = true
        }
        else {
          this.smeCertificates = res.data
          this.smeCertificates.forEach(cert => {
            let images = new Array<NgxGalleryImage>();
            cert.images.forEach(image => {
              let ingxGalleryImage: INgxGalleryImage = {
                small: environment.CONTENT_SERVER + image.imageLocationTwo,
                medium: environment.CONTENT_SERVER + image.imageLocationOne,
                big: environment.CONTENT_SERVER + image.imageLocationOne,
                description: cert.certificateDesc
              };
              let ngxGalleryImage = new NgxGalleryImage(ingxGalleryImage)
              images.push(ngxGalleryImage)
            })
            this.imageCertMap.set(cert.crtiUuid, images)
            this.showImages = true
            this.showSpinner = false
          })

        }
      }
    )
  }
  getImageFromCertificateMap(id: string) {
    let images: Array<NgxGalleryImage> = []
    images = this.imageCertMap.get(id);
    return images
  }
}