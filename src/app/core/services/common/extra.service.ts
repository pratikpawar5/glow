import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CustomHttpResponse } from '@models/custom.response';
import { environment } from 'environments/environment';
import { JobSeekerBasicProfileInfo } from '@models/jobs';
import { BusinessCircle } from '@models/business-circle';

@Injectable({
  providedIn: 'root'
})
export class ExtraService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  })

  constructor(private http: HttpClient) { }

  public cancelRequest(cancelReq) {
    return this.http.post<CustomHttpResponse<any>>(environment.CIRCLE_URL + 'cancel-sent-request', cancelReq)
  }
  public deniedConnection(delCon) {
    return this.http.post<CustomHttpResponse<any>>(environment.CIRCLE_URL + 'reject-received-request', delCon)
  }
  public removeConnection(removeCon) {
    return this.http.post<CustomHttpResponse<any>>(environment.CIRCLE_URL + 'remove-connection', removeCon, { headers: this.headers })
  }

  public deleteResume() {
    return this.http.delete<CustomHttpResponse<any>>(environment.JOB_SEEKER + 'resume')
  }

  public deleteCertificate(crtiUuid) {
    return this.http.delete<CustomHttpResponse<any>>(environment.SME_INFORMATION_URL + 'certificate/' + crtiUuid)
  }

  public deleteInfrastructure(infraUuid) {
    return this.http.delete<CustomHttpResponse<any>>(environment.SME_INFORMATION_URL + 'infrastructure/' + infraUuid)
  }

  public deleteTeam(teamUuid) {
    return this.http.delete<CustomHttpResponse<any>>(environment.SME_INFORMATION_URL + 'team/' + teamUuid)
  }

  public deleteVacancy(vacancyUuid) {
    return this.http.delete<CustomHttpResponse<any>>(environment.SME_INFORMATION_URL + ' ' + '/sme/vacancy/' + vacancyUuid)
  }

  public deleteGallery(galleryUuid) {
    return this.http.delete<CustomHttpResponse<any>>(environment.SME_INFORMATION_URL + 'gallery/' + galleryUuid)
  }

  public removeProduct(productUuid: string) {
    return this.http.delete<CustomHttpResponse<string>>(environment.PRODUCT_URL + productUuid + '/product')
  }

  public removeService(serviceUUID: string) {
    return this.http.delete<CustomHttpResponse<string>>(environment.SERVICE_URL + serviceUUID + '/service')
  }

  public postBasicProfileInfo(formData) {
    return this.http.post<CustomHttpResponse<JobSeekerBasicProfileInfo>>(environment.JOB_SEEKER + 'basic-profile-info', formData)
  }

  public getCircleCount() {
    return this.http.get<CustomHttpResponse<any>>(environment.CIRCLE_URL + 'circle-counts')
  }

  public updateCircleConnectionPrivacy(value: BusinessCircle) {
    return this.http.put<CustomHttpResponse<any>>(environment.CIRCLE_URL + 'privacy', value)
  }

  public unSubscribeEmail(unsubscribeEmail: UnSubscribeEmail) {
    return this.http.post<CustomHttpResponse<any>>(environment.NOTIFICATION_URL + '/unsubscribe-email', unsubscribeEmail)
  }

  public getCircleConnectionPrivacy() {
    return this.http.get<CustomHttpResponse<any>>(environment.CIRCLE_URL + 'privacy')
  }

  public rejectedCandidate(formData) {
    return this.http.post<CustomHttpResponse<any>>(environment.JOBS_URL + 'shortlist', formData)
  }

}
