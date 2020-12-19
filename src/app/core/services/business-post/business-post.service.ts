import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { CustomHttpResponse } from '@models/custom.response';
import { BusinessPost} from '@models/business-posts';

@Injectable({
  providedIn: 'root'
})
export class BusinessPostService {

  constructor(private http: HttpClient) { }

  /*Post API START*/
  public businessPost(formData) {
    return this.http.post<CustomHttpResponse<any>>(environment.BUSINESS_POST + 'post', formData)
  }
  /*Post API END*/

  /*GET API START*/

  public getRejectedOrPendingPosts() {
    return this.http.get<CustomHttpResponse<any>>(environment.BUSINESS_POST + "sme-admin/posts")
  }

  public getAllFeedsForEditMode(page: any) {
    return this.http.get<CustomHttpResponse<any>>(environment.BUSINESS_POST + 'posts', {
      params: {
        page: page
      }
    })
  }

  public getBusinessPostById(businessPostId: string) {
    return this.http.get<CustomHttpResponse<any>>(environment.BUSINESS_POST + businessPostId + '/post')
  }
  /*GET API END*/

  /*DELETE API START*/
  public deleteFeed(businessPostId) {
    return this.http.delete<CustomHttpResponse<any>>(environment.BUSINESS_POST + businessPostId + '/post')
  }

  public deleteImage(fileLocation: string): Observable<any> {
    return this.http.delete(environment.CONTENT_SERVER_DELETE_API + fileLocation)
  }
  /*DELETE API END*/

  /*PUT API START*/
  public updateBusinessPost(post: BusinessPost) {
    return this.http.put<CustomHttpResponse<any>>(environment.BUSINESS_POST + 'post', post)
  }
  /*PUT API END*/

  //like post 
  public likePost(postId: string) {
    return this.http.put<CustomHttpResponse<any>>(environment.BUSINESS_POST + 'post/' + postId + '/like', {})
  }
}
