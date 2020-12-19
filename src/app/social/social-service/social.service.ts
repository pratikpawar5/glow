import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CustomHttpResponse } from '@models/custom.response';
import { environment } from 'environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { SocialModule } from '../social.module';
import { SMECircleDto, BusinessCircle, CountAndData } from '@models/business-circle';

@Injectable({
  providedIn: SocialModule
})
export class SocialService {

  private sentCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private myconnectionCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private receiveRequestCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  })

  public getSentReqCount(): Observable<number> {
    return this.sentCount.asObservable()
  }

  public setSentReqCount(count: number) {
    this.sentCount.next(count)
  }

  public incSentReqCount() {
    this.sentCount.next(this.sentCount.value + 1)

  }
  public decSentReqCount() {
    this.sentCount.next(this.sentCount.value - 1)
  }

  public getPendingReqCount(): Observable<number> {
    return this.receiveRequestCount.asObservable()
  }

  public setPendingReqCount(count: number) {
    this.receiveRequestCount.next(count)
  }

  public incPendingReqCount() {
    this.receiveRequestCount.next(this.receiveRequestCount.value + 1)
  }

  public decPendingReqCount() {
    this.receiveRequestCount.next(this.receiveRequestCount.value - 1)
  }

  public getMyConnReqCount(): Observable<number> {
    return this.myconnectionCount.asObservable()
  }

  public setMyConnReqCount(count: number) {
    this.myconnectionCount.next(count)
  }

  public incMyConnReqCount() {
    this.myconnectionCount.next(this.myconnectionCount.value + 1)
  }

  public decMyConnReqCount() {
    this.myconnectionCount.next(this.myconnectionCount.value - 1)

  }
  constructor(private http: HttpClient) { }

  /* Circle Post API Start*/
  public makeConnection(makeCon: SMECircleDto) {
    return this.http.post<CustomHttpResponse<any>>(environment.CIRCLE_URL + 'add-connection', makeCon)
  }

  public deniedConnection(delCon: any) {
    return this.http.post<CustomHttpResponse<any>>(environment.CIRCLE_URL + 'reject-received-request', delCon)
  }

  public removeConnection(removeCon: any) {
    return this.http.post<CustomHttpResponse<any>>(environment.CIRCLE_URL + 'remove-connection', removeCon, { headers: this.headers })
  }

  public addBusinessRequest(circle: BusinessCircle) {
    return this.http.post<CustomHttpResponse<any>>(environment.CIRCLE_URL + 'send-request', circle)
  }

  public cancelRequest(cancelReq: SMECircleDto) {
    return this.http.post<CustomHttpResponse<any>>(environment.CIRCLE_URL + 'cancel-sent-request', cancelReq)
  }

  /* Circle Post API End*/


  /* Circle GET API START*/

  public getAllReceivedRequest() {
    return this.http.get<CustomHttpResponse<Array<SMECircleDto>>>(environment.CIRCLE_URL + 'received-requests')
  }

  public getMyCircleConnection() {
    return this.http.get<CustomHttpResponse<CountAndData>>(environment.CIRCLE_URL + 'my-connections')
  }

  public getSuggestions(page: any, size: any) {

    if (page != null) {
      return this.http.get<CustomHttpResponse<Array<SMECircleDto>>>(environment.CIRCLE_URL + 'suggestions', {
        params: {
          page: page
        }
      })
    } else {
      return this.http.get<CustomHttpResponse<Array<SMECircleDto>>>(environment.CIRCLE_URL + 'suggestions', {
        params: {
          size: size
        }
      })
    }




  }

  public getAllSentRequest() {
    return this.http.get<CustomHttpResponse<Array<SMECircleDto>>>(environment.CIRCLE_URL + 'sent-requests')
  }

  public getCircleCount() {
    return this.http.get<CustomHttpResponse<BusinessCircle>>(environment.CIRCLE_URL + 'circle-counts')
  }

  public getSMEsFromCircle(url: string): Observable<any> {
    return this.http.get(environment.CIRCLE_URL_FOR_SMES + url)
  }

  public getSMEsFromCircleWithPagination(filterByCategories, filterByCities, page, firstResult): Observable<any> {
    return this.http.get(environment.CIRCLE_URL_FOR_SMES + '/smes/fetch', {
      params: {
        categoriesFilterParam: filterByCategories,
        citiesFilterParam: filterByCities,
        page: page,
        firstResult: firstResult
      }
    })
  }

  /*My Connection Privacy*/
  public getCircleConnectionPrivacy() {
    return this.http.get<CustomHttpResponse<any>>(environment.CIRCLE_URL + 'privacy')
  }

  public updateCircleConnectionPrivacy(value: BusinessCircle) {
    return this.http.put<CustomHttpResponse<any>>(environment.CIRCLE_URL + 'privacy', value)
  }

  /* Circle GET API End*/

}
