import { Injectable } from '@angular/core';
import { SmeViewModule } from '../sme-view.module';
import { HttpClient } from '@angular/common/http';
import { CustomHttpResponse } from '@models/custom.response';
import { ProductResponse } from '@models/product';
import { environment } from 'environments/environment';
import { ServiceResponse } from '@models/service';
import { Observable, BehaviorSubject } from 'rxjs';
import { SMECertificate } from '@models/certificate';
import { SMEGallery } from '@models/gallery';
import { SMEInfrastrcture } from '@models/infrastructure';
import { SMEManagementTeam } from '@models/management-team';
import { SMEInformationDto } from '@models/sme';

@Injectable({
  providedIn: SmeViewModule
})
export class LazySmeViewService {

  private smeInformationDto = new BehaviorSubject(SMEInformationDto);
  smeInfo = this.smeInformationDto.asObservable();


  constructor(private http: HttpClient) { }

  /*SME*/
  public viewSME(sUuid) {
    return this.http.get<CustomHttpResponse<SMEInformationDto>>(environment.SME_INFORMATION_URL + sUuid)
  }

  

  /*GET SERVICE START*/
  public smeCertificate(sUuid: string) {
    return this.http.get<CustomHttpResponse<Array<SMECertificate>>>(environment.SME_INFORMATION_URL + sUuid + '/certificates')
  }

  public smeInfrastuctures(sUuid: string) {
    return this.http.get<CustomHttpResponse<Array<SMEInfrastrcture>>>(environment.SME_INFORMATION_URL + sUuid + '/infrastructures')
  }

  public smeGallery(sUuid: string) {
    return this.http.get<CustomHttpResponse<Array<SMEGallery>>>(environment.SME_INFORMATION_URL + sUuid + '/galleries')
  }

  public smeTeams(sUuid: string) {
    return this.http.get<CustomHttpResponse<Array<SMEManagementTeam>>>(environment.SME_INFORMATION_URL + sUuid + '/teams')
  }

  public getAllFeedsforView(viewerSmeId: string, page: any) {
    return this.http.get<CustomHttpResponse<any>>(environment.BUSINESS_POST + viewerSmeId + '/posts', { params: { page: page } })
  }

  /*GET SERVICE END*/

  /* Products */
  public smeProducts(sUuid: string) {
    return this.http.get<CustomHttpResponse<Array<ProductResponse>>>(environment.PRODUCT_URL + sUuid + '/sme')
  }

  /* Services */
  public smeServices(sUuid: string) {
    return this.http.get<CustomHttpResponse<Array<ServiceResponse>>>(environment.SERVICE_URL + sUuid + '/sme')
  }

  public smeCircle(sUuid: string): Observable<any> {
    return this.http.get<CustomHttpResponse<any>>(environment.CIRCLE_URL + 'sme/' + sUuid + '/circle-connections')
  }
  public addBusinessRequest(circle) {
    return this.http.post<CustomHttpResponse<any>>(environment.CIRCLE_URL + 'send-request', circle)
  }


}
