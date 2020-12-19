import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { CustomHttpResponse } from '@models/custom.response';
import { SMECertificate } from '@models/certificate';
import { SMEGallery } from '@models/gallery';
import { SMEInfrastrcture } from '@models/infrastructure';
import { SMEManagementTeam } from '@models/management-team';
import { Product, ProductDTO } from '@models/product';
import { Service, ServiceDTO } from '@models/service';
import { SMEFilterResponse, SMEInformationVo, SMEInformationDto } from '@models/sme';
import { debounceTime, shareReplay } from 'rxjs/operators';
import { ItemsCount } from '@models/sme-items-count';

@Injectable({
  providedIn: 'root'
})
export class SmeService {

  private smeObjectCountViewMode$: Observable<CustomHttpResponse<ItemsCount>>;

  constructor(private http: HttpClient) { }

  public getSmeNameAndImage(sUuid: string) {
    return this.http.get<CustomHttpResponse<SMEInformationVo>>(environment.SME_INFORMATION_URL + sUuid + '/vo')
  }

  public circleStatus(sUuid: string)
  {
    return this.http.get<CustomHttpResponse<SMEInformationVo>>(environment.CIRCLE_URL_FOR_SMES + '/status',{ params: { smeId: sUuid } })
  }
  public editSme() {
    return this.http.get<CustomHttpResponse<SMEInformationDto>>(environment.SME_INFORMATION_URL + 'sme')
  }
  public smeCategories() {
    return this.http.get<CustomHttpResponse<any>>(environment.SME_INFORMATION_URL + 'categories')
  }

  /*SME ADMIN SERVICE*/
  public smeCertificates(status: string) {
    if (status == null) {
      return this.http.get<CustomHttpResponse<Array<SMECertificate>>>(environment.SME_INFORMATION_URL + 'certificates')
    }
    return this.http.get<CustomHttpResponse<Array<SMECertificate>>>(environment.SME_INFORMATION_URL + 'certificates', { params: { status: status } })

  }
  public smeGalleries(status: string) {
    if (status == null) {
      return this.http.get<CustomHttpResponse<Array<SMEGallery>>>(environment.SME_INFORMATION_URL + 'galleries')

    }
    return this.http.get<CustomHttpResponse<Array<SMEGallery>>>(environment.SME_INFORMATION_URL + 'galleries', { params: { status: status } })
  }
  public smeInfrastructure(status: string) {
    if (status == null) {
      return this.http.get<CustomHttpResponse<Array<SMEInfrastrcture>>>(environment.SME_INFORMATION_URL + 'infrastructures')
    }
    return this.http.get<CustomHttpResponse<Array<SMEInfrastrcture>>>(environment.SME_INFORMATION_URL + 'infrastructures', { params: { status: status } })
  }

  public smeManagementTeam(status: string) {
    if (status == null) {
      return this.http.get<CustomHttpResponse<Array<SMEManagementTeam>>>(environment.SME_INFORMATION_URL + 'teams')
    }
    return this.http.get<CustomHttpResponse<Array<SMEManagementTeam>>>(environment.SME_INFORMATION_URL + 'teams', { params: { status: status } })
  }
  public servicesOfSME(status: string) {
    return this.http.get<CustomHttpResponse<Array<Service>>>(environment.SERVICE_URL + 'sme', { params: { status: status } })
  }
  /*SME ADMIN SERVICE*/
  public smeProducts(status: string) {
    if (status == null) {
      return this.http.get<CustomHttpResponse<Array<Product>>>(environment.PRODUCT_URL + 'sme')
    }
    return this.http.get<CustomHttpResponse<Array<Product>>>(environment.PRODUCT_URL + 'sme', { params: { status: status } })
  }
  public autoQuotationService(serviceUuid: string, autoQuotation: ServiceDTO) {
    return this.http.put<CustomHttpResponse<Product>>(environment.SERVICE_URL + serviceUuid +
      '/auto-quotation', autoQuotation).pipe(debounceTime(1000))
  }
  public autoQuotationProduct(productUuid: string, autoQuotation: ProductDTO) {
    return this.http.put<CustomHttpResponse<Product>>(environment.PRODUCT_URL + productUuid +
      '/auto-quotation', autoQuotation).pipe(debounceTime(1000))
  }
  /*For Filter Response*/
  public smes(url) {
    return this.http.get<CustomHttpResponse<SMEFilterResponse>>(environment.SEARCH_URL + url)
  }

  public getSMEsFromCircle(url: string) {
    return this.http.get<CustomHttpResponse<any>>(environment.CIRCLE_URL_FOR_SMES + url)
  }

  public getSMEs(filterByCategories, filterByCities,sortBy:string, page:string, isSME: boolean) {
    if (isSME) {
      return this.http.get<CustomHttpResponse<SMEFilterResponse>>(environment.CIRCLE_URL_FOR_SMES + '/smes/fetch', {
        params: {
          categoriesFilterParam: filterByCategories,
          citiesFilterParam: filterByCities,
          sort:sortBy,
          page: page,
        }
      })
    } else {
      return this.http.get<CustomHttpResponse<SMEFilterResponse>>(environment.SME_INFORMATION_URL + 'fetch', {
        params: {
          categoriesFilterParam: filterByCategories,
          citiesFilterParam: filterByCities,
          sort:sortBy,
          page: page
        }
      })
    }
  }

  public addBusinessRequest(circle: any) {
    return this.http.post<CustomHttpResponse<any>>(environment.CIRCLE_URL + 'send-request', circle)
  }

  /*For Filter Response*/

  /*Add SME Objects Start*/

  public addCompanyInfo(smeData)//1st step
  {
    return this.http.post<CustomHttpResponse<any>>(environment.SME_INFORMATION_URL + 'sme', smeData)
  }

  public saveSMEDetails(smeData)//2nd step
  {
    return this.http.patch<CustomHttpResponse<any>>(environment.SME_INFORMATION_URL + 'sme', smeData)
  }

  /*Add SME Objects End*/

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

  public getCitySuggestion(searchText, pincode): Observable<any> {

    return this.http.get(environment.COMMON_SERVICE_URL + 'address/suggest', {
      params: {
        searchText: searchText,
        pincode: pincode,
      }
    })
  }


  public getBasicInfo(sUuid): Observable<any> {
    return this.http.get(environment.SME_INFORMATION_URL + '' + sUuid)
  }

  public getLoginSmeInfo(sUuid): Observable<any> {
    return this.http.get(environment.SME_INFORMATION_URL + sUuid + '/vo')
  }

  public getInfraByUuid(infraUuid): Observable<SMEInfrastrcture> {
    return this.http.get<SMEInfrastrcture>(environment.SME_INFORMATION_URL + ' ' + '/sme' + '/infrastructures/' + infraUuid)
  }

  public gstNumberValidate(gstNumber: string) {
    return this.http.get<CustomHttpResponse<any>>(environment.SME_INFORMATION_URL + gstNumber + '/validate')
  }
  /*get SME Objects End */

  /*get sme objects count*/
  public getSmeObjectCountForEditMode(countType:string) {
    return this.http.get<CustomHttpResponse<ItemsCount>>(environment.SME_INFORMATION_URL + 'items/count', { params: {countType: countType } })
  }

  public getSmeObjectCountForViewMode(sUuid: string, countType: string) {
    this.smeObjectCountViewMode$ = this.http.
      get<CustomHttpResponse<ItemsCount>>(environment.SME_INFORMATION_URL + 'items/count', { params: { smeUuid: sUuid, countType: countType } })
      .pipe(
        shareReplay(1)
      );;
    return this.smeObjectCountViewMode$;
  }

  public getSmeObjectCountForViewModeObservable() {
    return this.smeObjectCountViewMode$;
  }



  /*get sme objects count*/
}
