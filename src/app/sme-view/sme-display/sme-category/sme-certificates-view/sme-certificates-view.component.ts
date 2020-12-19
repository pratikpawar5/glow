import { Component, OnInit } from '@angular/core';
import { SMECertificate } from '@models/certificate';
import { ActivatedRoute, Router } from '@angular/router';
import { PageTitleService } from '@services/page-title/page-title.service';
import { environment } from 'environments/environment';
import { LazySmeViewService } from 'app/sme-view/http-service/lazy-sme-view.service';
import { NgxGalleryImage, NgxGalleryOptions, NgxGalleryAnimation, INgxGalleryImage } from 'ngx-gallery';
declare var ga: Function;
@Component({
  selector: 'app-sme-certificates-view',
  templateUrl: './sme-certificates-view.component.html',
  styleUrls: ['./sme-certificates-view.component.css']
})
export class SmeCertificatesViewComponent implements OnInit {

  smeCertificates: Array<SMECertificate>
  showSpinner: boolean = true
  notFound: boolean
  certificatesNotFound: boolean = false
  sUuid: string
  imageCertMap = new Map<string, Array<NgxGalleryImage>>();
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  showImages: boolean
  constructor(private route: ActivatedRoute, private pageTitleService: PageTitleService, private smeService: LazySmeViewService,
    router: Router) {
    ga('set', 'page', router.url);
    ga('send', 'pageview');
  }

  ngOnInit() {

    this.sUuid = this.route.snapshot.root.firstChild.children[0].params['sUuid']
    this.pageTitleService.updateTitle('Certificate')

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

    this.smeService.smeCertificate(this.sUuid).subscribe(
      res => {
        if (res.error) {
          this.showSpinner = false
          this.notFound = true
        }
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
    )
  }
  getImageFromCertificateMap(id: string) {
    let images: Array<NgxGalleryImage> = []
    images = this.imageCertMap.get(id);
    return images;
  }
}
