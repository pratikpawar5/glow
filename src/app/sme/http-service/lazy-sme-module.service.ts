import { Injectable } from '@angular/core';
import { SmeModule } from '../sme.module';
import { HttpClient } from '@angular/common/http';
import { CustomHttpResponse } from '@models/custom.response';
import { ProductVO, ProductSubCategory, ProductDTO, Product } from '@models/product';
import { environment } from 'environments/environment';
import { ServiceVO, ServiceSubCategory, ServiceDTO, Service } from '@models/service';
import { Observable } from 'rxjs';
import { JobPost } from '@models/jobs';
import { SMEInformationVo, SMEInformationDto, BarChartValue, VacancyApplicantCountVo } from '@models/sme';
import { EditModeItemsPercentage, ItemsCount } from '@models/sme-items-count';

@Injectable({
  providedIn: SmeModule
})
export class LazySmeModuleService {

  constructor(private http: HttpClient) { }

  /* Product */

  public smeProducts(status: string) {
    return this.http.get<CustomHttpResponse<Array<ProductVO>>>(environment.PRODUCT_URL + 'sme',
      { params: { status: status } })
  }

  public productsCategories() {
    return this.http.get<CustomHttpResponse<any>>(environment.PRODUCT_URL + 'categories')
  }

  public productsSubCategories(categoryUuid: string) {
    return this.http.get<CustomHttpResponse<Array<ProductSubCategory>>>(environment.PRODUCT_URL +
      'categories/' + categoryUuid + '/subcategories')
  }

  public productsSpecifications(subCategoryUuid: string) {
    return this.http.get<CustomHttpResponse<Array<string>>>(environment.PRODUCT_URL +
      'subcategories/' + subCategoryUuid + '/specifications')
  }

  public saveProduct(product: ProductDTO) {
    return this.http.post<CustomHttpResponse<string>>(environment.PRODUCT_URL + 'product', product)
  }

  public updateProduct(productUuid: string, product: ProductDTO) {
    return this.http.put<CustomHttpResponse<string>>(environment.PRODUCT_URL + productUuid + '/product', product)
  }

  public getProduct(productUuid: string) {
    return this.http.get<CustomHttpResponse<ProductDTO>>(environment.PRODUCT_URL + productUuid + '/product-details')
  }

  // public getAllBarChartValue()
  // {
  //   return this.http.get<CustomHttpResponse<BarChartValue>>(environment.CART_URL + 'bar-chart');
  // }

  public getValueForPieChart()
  {
    return this.http.get<CustomHttpResponse<any>>(environment.CART_URL + 'summary');
  }

  public getJobApplicantDashboard()
  {
    return this.http.get<CustomHttpResponse<VacancyApplicantCountVo>>(environment.JOBS_URL + 'vacancy/applicant/count');
  }
  /* Services */

  public smeServices(status: string) {
    return this.http.get<CustomHttpResponse<Array<ServiceVO>>>(environment.SERVICE_URL + 'sme',
      { params: { status: status } })
  }

  public serviceCategories() {
    return this.http.get<CustomHttpResponse<any>>(environment.SERVICE_URL + 'categories')
  }

  public serviceSubCategories(categoryUuid: string) {
    return this.http.get<CustomHttpResponse<Array<ServiceSubCategory>>>(environment.SERVICE_URL +
      'categories/' + categoryUuid + '/subcategories')
  }

  public serviceSpecifications(subCategoryUuid: string) {
    return this.http.get<CustomHttpResponse<Array<string>>>(environment.SERVICE_URL +
      'subcategories/' + subCategoryUuid + '/specifications')
  }

  public saveService(service: ServiceDTO) {
    return this.http.post<CustomHttpResponse<string>>(environment.SERVICE_URL + 'service', service)
  }

  public updateService(serviceUuid: string, service: ServiceDTO) {
    return this.http.put<CustomHttpResponse<string>>(environment.SERVICE_URL + serviceUuid + '/service', service)
  }

  public getService(serviceUuid: string) {
    return this.http.get<CustomHttpResponse<ServiceDTO>>(environment.SERVICE_URL + serviceUuid + '/service-details')
  }


  /*sme*/
  public getSmeNameAndImage(sUuid: string) {
    return this.http.get<CustomHttpResponse<SMEInformationVo>>(environment.SME_INFORMATION_URL + sUuid + '/vo')
  }
  public editSme() {
    return this.http.get<CustomHttpResponse<Observable<SMEInformationDto>>>(environment.SME_INFORMATION_URL + 'sme')
  }
  public getSMEObjectPercentage() {
    return this.http.get<CustomHttpResponse<EditModeItemsPercentage>>(environment.SME_INFORMATION_URL + 'sme/percentage')
  }

  public getAllSMEObjectCount()
  {
     return this.http.get<CustomHttpResponse<ItemsCount>>(environment.SME_INFORMATION_URL + '')
  }

  /*sme-profile*/
  public changeSmeProfileImage(uploadFormData) {
    return this.http.post<CustomHttpResponse<any>>(environment.SME_INFORMATION_URL + 'change/logo-image', uploadFormData)
  }

  public updateBasicInfo(formData) {
    return this.http.put<CustomHttpResponse<any>>(environment.SME_INFORMATION_URL + 'sme', formData)
  }

  public updateAddressInfo(formData) {
    return this.http.put<CustomHttpResponse<any>>(environment.SME_INFORMATION_URL + 'address', formData)
  }
  /*sme-profile*/

  /*Slider Image*/
  public uploadSliderImage(images): Observable<any> {
    return this.http.post(environment.SME_INFORMATION_URL + 'upload/slider-image', images)
  }
  /*Slider Image*/

  public addCertificates(uploadCertificate) {
    return this.http.post<CustomHttpResponse<any>>(environment.SME_INFORMATION_URL + 'certificates', uploadCertificate)
  }

  public addInfrastrctures(formData) {
    return this.http.post<CustomHttpResponse<any>>(environment.SME_INFORMATION_URL + 'infrastructures', formData)
  }

  public addTeam(formData) {
    return this.http.post<CustomHttpResponse<any>>(environment.SME_INFORMATION_URL + 'teams', formData)
  }

  public addGallery(formData) {
    return this.http.post<CustomHttpResponse<any>>(environment.SME_INFORMATION_URL + 'galleries', formData)
  }

  public postJob(formData) {
    return this.http.post<CustomHttpResponse<any>>(environment.JOBS_URL, formData)
  }

  /*Update SME Objects Start*/

  public updateCertificates(formData) {
    return this.http.put<CustomHttpResponse<any>>(environment.SME_INFORMATION_URL + 'certificates', formData)
  }

  public updateInfrastructure(formData) {
    return this.http.put<CustomHttpResponse<any>>(environment.SME_INFORMATION_URL + 'infrastructures', formData)
  }

  public updateTeam(formData) {
    return this.http.put<CustomHttpResponse<any>>(environment.SME_INFORMATION_URL + 'teams', formData)
  }

  public updateGallery(formData) {
    return this.http.put<CustomHttpResponse<any>>(environment.SME_INFORMATION_URL + 'galleries', formData)
  }
  public updateJob(job: JobPost) {
    return this.http.put<CustomHttpResponse<any>>(environment.JOBS_URL, job)
  }
  /*Update SME Objects End*/

  /*get Particular SME Objects  Start*/
  public getCertificate(crtiUuid): Observable<any> {
    return this.http.get<CustomHttpResponse<any>>(environment.SME_INFORMATION_URL + 'certificate/' + crtiUuid)
  }

  public getInfrastructure(infraUuid): Observable<any> {
    return this.http.get<CustomHttpResponse<any>>(environment.SME_INFORMATION_URL + 'infrastructure/' + infraUuid)
  }

  public getTeam(teamUuid) {
    return this.http.get<CustomHttpResponse<any>>(environment.SME_INFORMATION_URL + 'team/' + teamUuid)
  }

  public getGallery(galleryUuid): Observable<any> {
    return this.http.get<CustomHttpResponse<any>>(environment.SME_INFORMATION_URL + 'gallery/' + galleryUuid)
  }


}
