import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CustomHttpResponse } from '@models/custom.response';
import { environment } from 'environments/environment';
import { ProductResponse } from '@models/product';
import { ServiceResponse } from '@models/service';
import { FilterResult } from '@models/filter';
import { SMEFilterResponse } from '@models/sme';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {


  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  })

  constructor(private http: HttpClient) { }

  public allSearchSuggest(searchText: string, searchModule: string) {
    return this.http.get<CustomHttpResponse<any>>(environment.COMMON_SERVICE_URL + 'homepage-search/suggest-result', {
      params: {
        searchText: searchText,
        searchModule: searchModule
      }
    })
  }

  public productSearchSuggest(searchText: string) {
    return this.http.get<CustomHttpResponse<Array<string>>>(environment.PRODUCT_URL + 'search-suggests', {
      params: {
        searchText: searchText
      }
    })
  }

  public serviceSearchSuggest(searchText: string) {
    return this.http.get<CustomHttpResponse<Array<string>>>(environment.SERVICE_URL + 'search-suggests', {
      params: {
        searchText: searchText
      }
    })
  }

  public smeSearchSuggest(searchText: string) {
    return this.http.get<CustomHttpResponse<Array<string>>>(environment.SME_INFORMATION_URL + 'search-suggest', {
      params: {
        searchText: searchText
      }
    })
  }


  public combinSearchResult(searchText: string) {
    return this.http.get<CustomHttpResponse<any>>(environment.COMMON_SERVICE_URL + 'combine/search', {
      params: {
        searchText: searchText
      }
    })
  }

  public getProductSearchResult(url: string, page: string) {
    return this.http.get<CustomHttpResponse<FilterResult<ProductResponse>>>(environment.PRODUCT_URL +
      url, { params: { page: page } })
  }

  public getServiceSearchResult(url: string, page: string) {
    return this.http.get<CustomHttpResponse<FilterResult<ServiceResponse>>>(environment.SERVICE_URL +
      url, { params: { page: page } })
  }

  public getSMESearchResult(url: string, isSME: boolean, page: string) {

    if (isSME) {
      return this.http.get<CustomHttpResponse<SMEFilterResponse>>(environment.CIRCLE_URL +
        url, {
          params: {
            page: page
          }
        })
    } else {
      return this.http.get<CustomHttpResponse<SMEFilterResponse>>(environment.SME_INFORMATION_URL +
        url, {
          params: {
            page: page
          }
        })
    }
  }
}
