import { Component, OnInit } from '@angular/core';
import { BusinessPost, BusinessPostImages } from '@models/business-posts';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { environment } from 'environments/environment';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { ConstantService } from '@services/common/constant-service.service';
import { BusinessPostService } from '@services/business-post/business-post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenService } from '@services/token/token.service';
import { CustomHttpResponse } from '@models/custom.response';
declare var ga: Function;
@Component({
  selector: 'app-update-business-post',
  templateUrl: './update-business-post.component.html',
  styleUrls: ['./update-business-post.component.css']
})
export class UpdateBusinessPostComponent implements OnInit {

  biPost: BusinessPost
  updateBusinessPostForm: FormGroup
  smeId: string

  /*Image*/
  imageRequired: boolean
  imageUploadFail: boolean
  showUploadProgress: boolean
  progressPercent: number
  uploadedImages = new Array<BusinessPostImages>();
  selectedImages = new Array<BusinessPostImages>();
  newAddedImages = new Array<BusinessPostImages>();
  allowedImageSize: number
  indexCount: number = 0
  imageTypes: Array<string>
  imageSizeError: boolean
  imageTypeError: boolean
  showButton: boolean = true
  showSpinner: boolean = true
  contentServer: string = environment.CONTENT_SERVER
  showError: boolean
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private token: TokenService,
    private ConstantService: ConstantService, private businessPostService: BusinessPostService,
    private router: Router, private route: ActivatedRoute) {
    this.imageTypes = ConstantService.getImageFormats();
    this.allowedImageSize = ConstantService.getMaxFileSize();
    ga('set', 'page', router.url);
    ga('send', 'pageview');
  }

  ngOnInit() {
    this.smeId = this.token.getSmeId();
    this.updateBusinessPostForm = this.formBuilder.group({
      businessPostId: new FormControl(null),
      description: new FormControl(null, [Validators.maxLength(2000), Validators.minLength(20), Validators.required]),
    });
    this.route.queryParams.subscribe(
      post => {
        let businessPostId = post['post']
        if (businessPostId != undefined) {
          this.getBusinessPostData(businessPostId)
        }
      }
    )
  }

  getBusinessPostData(businessPostId) {
    this.businessPostService.getBusinessPostById(businessPostId).subscribe(
      res => {
        this.biPost = res.data
        this.updateBusinessPostForm.patchValue(
          {
            businessPostId: this.biPost.businessPostId,
            description: this.biPost.description,
          }
        )
        for (let i = 0; i < res.data.files.length; i++) {
          this.uploadedImages[this.indexCount] = res.data.files[i];
          this.selectedImages.push(res.data.files[i]);
          ++this.indexCount;
        }
      },
      err => {
        this.showError = true;
      }
    )
  }

  onFileChanged(files: Array<any>) {
    let images = new Array<File>()
    this.imageSizeError = false
    this.imageTypeError = false

    for (let i = 0; i < files.length; i++) {
      if (this.imageTypes.indexOf(files[i].type) === -1) {
        this.imageTypeError = true
        return false
      } else if (files[i].size > this.allowedImageSize) {
        this.imageSizeError = true
        return false
      }
    }

    for (let i = 0; i < files.length; i++) {
      if (this.selectedImages.length < 5) {
        this.selectedImages.push(files[i])
        images.push(files[i])
      } else {
        break
      }
    }

    if (images.length > 0) {
      this.uploadImagesToServer(images)
    }
  }

  uploadImagesToServer(images: Array<File>) {
    this.showUploadProgress = true
    this.imageUploadFail = false
    this.imageSizeError = false
    this.imageTypeError = false

    let formData = new FormData()
    Array.from(images).forEach(file => {
      formData.append('files', file)
    })
    this.http.post<CustomHttpResponse<any>>(environment.BUSINESS_POST + '/upload-files', formData, {
      reportProgress: true, observe: 'events'
    }).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressPercent = Math.round(100 * event.loaded / event.total);
        }
        else if (event instanceof HttpResponse) {
          for (let i = 0; i < this.selectedImages.length; i++) {
            if (event.body.data[i] != null || event.body.data[i] != undefined) {
              this.uploadedImages[this.indexCount] = event.body.data[i]
              ++this.indexCount
            }
          }
          this.showUploadProgress = false
          this.imageRequired = false
        }
      },
      err => {
        this.imageUploadFail = true
        this.showUploadProgress = false
        Array.from(images).forEach(file => {
          this.selectedImages.pop()
        })
      },
    )
  }

  deleteImageBusinessPost(index: number, image: BusinessPostImages) {
    this.selectedImages.splice(index, 1);
    this.uploadedImages.splice(index, 1)
    this.newAddedImages.splice(this.newAddedImages.indexOf(image), 1)
    this.uploadedImages.push(undefined)
    --this.indexCount
  }

  onUpdateBusinessPost() {
    if (this.updateBusinessPostForm.valid) {
      this.showButton = false
      let post: BusinessPost = this.updateBusinessPostForm.value;
      post.privacy = this.biPost.privacy
      post.smeUuid = this.biPost.smeUuid
      post.postType = this.biPost.postType
      let images = new Array<BusinessPostImages>()

      this.uploadedImages.filter(img => img != null || img != undefined).forEach(img => {
        images.push(img);
      })
      if (this.selectedImages.length > 0) {
        post.files = images
        post.totalFilesSize = images[0].size
      }
      this.businessPostService.updateBusinessPost(post).subscribe(
        res => {

          this.router.navigateByUrl('/my-sme/' + this.smeId + '/admin/business-post')

        },
        err => {
          this.showButton = true

        }
      );
    }
    else {
      if (this.selectedImages.length <= 0) {
        this.imageRequired = true
      }
      window.scrollTo(0, 0)

    }
  }
  onClickCancel() {
    this.router.navigateByUrl('/my-sme/' + this.smeId + '/admin/business-post');

  }
}
