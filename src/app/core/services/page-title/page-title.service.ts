import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PageTitleService {

  constructor(private title: Title, private meta: Meta) { }

  defaultTitle() {
    this.title.setTitle('gloqr: the business social app')
  }

  updateTitle(title: string) {
    this.title.setTitle(title + ' | gloqr')
  }

  updateMetaTitle(title: string) {
    this.meta.updateTag({ name: "og_title", property: 'og:title', content: title })
    this.meta.updateTag({ name: "twitter_title", property: 'twitter:title', content: title })
  }

  updateMetaInfo(description: string) {
    this.meta.updateTag({ name: 'Keywords', content: description })
    this.meta.updateTag({ name: 'Description', property: 'og:description', content: description })
    this.meta.updateTag({ property: 'twitter:description', content: description })
  }

  updateMetaImage(fileLocation: string) {
    this.meta.updateTag({ property: "og:image", content: environment.CONTENT_SERVER + fileLocation })
  }

  updateMetaURL(url: string) {
    this.meta.updateTag({ property: 'og:url', content: 'https://www.gloqr.com' + url })
  }

  getPageTitle() {
    return this.title.getTitle()
  }
  
}
