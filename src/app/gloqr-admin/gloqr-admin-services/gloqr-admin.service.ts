import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { CustomHttpResponse } from '@models/custom.response';
import { GloqrSMEDto, GloqrAdmin, SMEItemsType, SMEConstant, SmeEntity, SMECategoryDto } from '@models/sme';
import { Service, ServiceSubCategory } from '@models/service';
import { VerifiedPayment } from '@models/payment';
import { ProductSubCategory } from '@models/product';
import { GloqrAdminModule } from '../gloqr-admin.module';
import { UserBasicInfo } from '@models/user';
import { VacancyApplicantInfo, ApplicantStatus, IndustrialAreaDto, JobRole } from '@models/jobs';
import { CircleInviteStatus } from '@models/business-circle';
import { CartItem } from '@models/cart';


@Injectable({
  providedIn: GloqrAdminModule
})
export class GloqrAdminService {



  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json;',
    'Authorization': 'Bearer ' + localStorage.getItem('s_Token')
  });

  private multiPartHeader: HttpHeaders = new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('s_Token')

  });

  constructor(private http: HttpClient) { }

  /*Post Mapping*/
  public verifyPlan(verifiedPayment: VerifiedPayment) {
    return this.http.put<CustomHttpResponse<VerifiedPayment>>(environment.PAYMENT_URL + 'verify', verifiedPayment, { headers: this.headers })
  }

  public addSMECategory(smeCategoryDto: SMECategoryDto) {
    return this.http.post<CustomHttpResponse<SMECategoryDto>>(environment.SME_INFORMATION_URL + 'gloqr-admin/category', smeCategoryDto, { headers: this.headers })
  }

  public addIndustrialArea(industrialAreaDto: IndustrialAreaDto) {
    return this.http.post<CustomHttpResponse<any>>(environment.JOBS_URL + 'gloqr-admin/industrial-area', industrialAreaDto, { headers: this.headers })
  }

  public addJobRole(jobRole: JobRole, industrialAreaId: string) {
    return this.http.post<CustomHttpResponse<any>>(environment.JOBS_URL + 'gloqr-admin/job-role', jobRole, { params: { industrialAreaId: industrialAreaId }, headers: this.headers })
  }
  public postProductImage(formData: any, sUuid: string) {
    return this.http.post<CustomHttpResponse<any>>(environment.PRODUCT_URL + 'files', formData, { params: { s: sUuid }, headers: this.multiPartHeader })
  }
  public postServiceImage(formData: any, sUuid: string) {
    return this.http.post<CustomHttpResponse<any>>(environment.SERVICE_URL + 'files', formData, { params: { s: sUuid }, headers: this.multiPartHeader })
  }
  public postNewSMEImages(formData: any, sUuid: string, entityType: string) {
    return this.http.post<CustomHttpResponse<any>>(environment.SME_INFORMATION_URL + 'images', formData, { params: { smeUuid: sUuid, entityType: entityType }, headers: this.multiPartHeader })
  }
  public changeSmeProfileImage(uploadFormData, sUuid: string) {
    return this.http.post<CustomHttpResponse<any>>(environment.SME_INFORMATION_URL + 'change/logo-image', uploadFormData, { params: { smeUuid: sUuid }, headers: this.multiPartHeader })
  }
  public uploadbusinessPostImage(formData: any, sUuid: string) {
    return this.http.post<CustomHttpResponse<any>>(environment.BUSINESS_POST + 'upload-files', formData, { params: { smeId: sUuid }, headers: this.multiPartHeader });
  }
  /*Post Mapping*/

  /*GET SERVICE START*/
  public getSMEs(page, VERIFIED: string) {
    return this.http.get<CustomHttpResponse<GloqrAdmin>>(environment.SME_INFORMATION_URL + 'gloqr-admin/smes-list', { params: { page: page, verified: VERIFIED }, headers: this.headers })
  }
  public productsCategories() {
    return this.http.get<CustomHttpResponse<any>>(environment.PRODUCT_URL + 'categories', { headers: this.headers })
  }
  public productsSubCategories(categoryUuid: string) {
    return this.http.get<CustomHttpResponse<Array<ProductSubCategory>>>(environment.PRODUCT_URL +
      'categories/' + categoryUuid + '/subcategories', { headers: this.headers })
  }
  public serviceCategories() {
    return this.http.get<CustomHttpResponse<any>>(environment.SERVICE_URL + 'categories', { headers: this.headers })
  }

  public serviceSubCategories(categoryUuid: string) {
    return this.http.get<CustomHttpResponse<Array<ServiceSubCategory>>>(environment.SERVICE_URL +
      'categories/' + categoryUuid + '/subcategories', { headers: this.headers })
  }

  public smeData(sUuid) {
    return this.http.get<CustomHttpResponse<any>>(environment.SME_INFORMATION_URL + 'gloqr-admin/' + sUuid + '/sme', { headers: this.headers })
  }
  public getVacancy(sUuid): Observable<any> {
    return this.http.get(environment.JOBS_URL + 'gloqr-admin/' + sUuid, { headers: this.headers })
  }

  public getBusinessPost(sUuid): Observable<any> {
    return this.http.get(environment.BUSINESS_POST + 'gloqr-admin/' + sUuid + '/pending-posts', { headers: this.headers })
  }

  public getSmeItems(smeId: string, itemType: any) {
    return this.http.get<CustomHttpResponse<any>>(environment.SME_INFORMATION_URL + 'gloqr-admin/items', { params: { smeUuid: smeId, itemType: itemType }, headers: this.headers })
  }

  public getProduct(sUuid: string) {
    return this.http.get<CustomHttpResponse<any>>(environment.PRODUCT_URL + 'admin/sme/' + sUuid + '/pending', { headers: this.headers })
  }
  public getService(sUuid: string) {
    return this.http.get<CustomHttpResponse<Array<Service>>>(environment.SERVICE_URL + 'admin/sme/' + sUuid + '/pending', { headers: this.headers })
  }

  getSmePackageDetails(userId: string, sUuid: string) {
    return this.http.get<CustomHttpResponse<any>>(environment.PAYMENT_URL + 'details', { params: { u: userId, s: sUuid }, headers: this.headers })
  }

  getNewlyRegisterUserDetails(userType: string, days: string, page: number) {
    return this.http.get<CustomHttpResponse<Array<UserBasicInfo>>>(environment.USER_URL + 'gloqr-admin/new', { params: { userType: userType, days: days, page: page.toLocaleString() }, headers: this.headers });
  }

  getNewJobDetails(applicantStatus: string, days: string, page: number) {
    return this.http.get<CustomHttpResponse<Array<VacancyApplicantInfo>>>(environment.JOBS_URL + 'gloqr-admin/new-applicant/sme-info', { params: { applicantStatus: applicantStatus, days: days, page: page.toLocaleString() }, headers: this.headers });
  }
  getJobApplicantCount(applicantStatus: string, days: string) {
    return this.http.get<CustomHttpResponse<any>>(environment.JOBS_URL + 'gloqr-admin/count', { params: { applicantStatus: applicantStatus, days: days }, headers: this.headers })
  }
  getUserCount(userType: string, days: string) {
    return this.http.get<CustomHttpResponse<any>>(environment.USER_URL + 'gloqr-admin/count', { params: { userType: userType, days: days }, headers: this.headers })
  }
  getCircleCount(circleState: string, days: string) {
    return this.http.get<CustomHttpResponse<any>>(environment.CIRCLE_URL + 'gloqr-admin/count', { params: { circleState: circleState, days: days }, headers: this.headers });
  }
  getAllCircleInviteStatus(circleState: string, days: string, page: number) {
    return this.http.get<CustomHttpResponse<Array<CircleInviteStatus>>>(environment.CIRCLE_URL + 'gloqr-admin/sent/requests', { params: { circleState: circleState, days: days, page: page.toLocaleString() }, headers: this.headers });
  }

  getBIStatus(state: string, days: string, page: number) {
    return this.http.get<CustomHttpResponse<Array<CartItem>>>(environment.CART_URL + 'items-summary', { params: { state: state, days: days, page: page.toLocaleString() }, headers: this.headers });
  }

  getBICount(days: string, state: string) {
    return this.http.get<CustomHttpResponse<any>>(environment.CART_URL + 'state-count', { params: { state: state, days: days }, headers: this.headers });
  }


  /*GET SERVICE END*/

  /*PUT SERVICE START*/

  public verifySME(smeApproveResponse: GloqrSMEDto) {
    return this.http.put<CustomHttpResponse<any>>(environment.SME_INFORMATION_URL + 'gloqr-admin' + '/verify', smeApproveResponse, { headers: this.headers })
  }

  public updateSmeItems(smeEntityForAdminPanel: any, itemType: any): Observable<any> {
    return this.http.put(environment.SME_INFORMATION_URL + 'gloqr-admin/items/state', smeEntityForAdminPanel, { params: { itemType: itemType }, headers: this.headers })
  }

  public updateVacancy(smeVacancyForAdminPanel: any): Observable<any> {
    return this.http.put(environment.JOBS_URL + 'gloqr-admin/modify-state-of-vacancy', smeVacancyForAdminPanel, { headers: this.headers })
  }

  public updateProduct(productForAdminPanel: any) {
    return this.http.put<CustomHttpResponse<any>>(environment.PRODUCT_URL + 'admin/state', productForAdminPanel, { headers: this.headers })
  }

  public updateService(serviceForAdminPanel: any) {
    return this.http.put<CustomHttpResponse<any>>(environment.SERVICE_URL + 'admin/state', serviceForAdminPanel, { headers: this.headers })
  }

  public updateBiPost(postForAdminPanel: any): Observable<any> {
    return this.http.put(environment.BUSINESS_POST + 'gloqr-admin/modify-state-of-posts', postForAdminPanel, { headers: this.headers })
  }
  public updateProductImages(productForAdminPanel: any) {
    return this.http.put<CustomHttpResponse<any>>(environment.PRODUCT_URL + 'admin/images', productForAdminPanel, { headers: this.headers })
  }
  public updateServiceImages(productForAdminPanel: any) {
    return this.http.put<CustomHttpResponse<any>>(environment.SERVICE_URL + 'admin/images', productForAdminPanel, { headers: this.headers })
  }
  updateSMEImages(smeEntity: SmeEntity, itemType: string) {
    return this.http.put<CustomHttpResponse<any>>(environment.SME_INFORMATION_URL + 'gloqr-admin/' + 'images', smeEntity, { params: { itemType: itemType }, headers: this.multiPartHeader });
  }

  public updateBusinessPostImage(smeEntity: SmeEntity) {
    return this.http.put<CustomHttpResponse<any>>(environment.BUSINESS_POST + 'gloqr-admin/' + 'files', smeEntity, { headers: this.multiPartHeader });

  }
  /*PUT SERVICE END*/  
}
