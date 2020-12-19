import { Injectable } from '@angular/core';
import { ServiceModule } from '../service.module';
import { HttpClient } from '@angular/common/http';
import { FilterResult } from '@models/filter';
import { ServiceResponse, Service } from '@models/service';
import { CustomHttpResponse } from '@models/custom.response';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: ServiceModule
})
export class LazySmeService {

  constructor(private http: HttpClient) { }

  public serviceDetail(serviceUuid: string) {
    return this.http.get<CustomHttpResponse<Service>>(environment.SERVICE_URL + serviceUuid + '/service')
  }

  public similarServices(subCategoryUuid: string, serviceUuid: string) {
    return this.http.get<CustomHttpResponse<Array<ServiceResponse>>>(environment.SERVICE_URL + 'similar',
      { params: { s: subCategoryUuid, p: serviceUuid } })
  }

  public servicesByCategory(url: string, page: string) {
    return this.http.get<CustomHttpResponse<FilterResult<ServiceResponse>>>(environment.SEARCH_URL + url,
      { params: { page: page } })
  }

}
