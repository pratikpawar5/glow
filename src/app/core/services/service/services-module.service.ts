import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomHttpResponse } from '@models/custom.response';
import { ServiceDTO } from '@models/service';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicesModuleService {

  constructor(private http:HttpClient) { }

  public serviceDetail(serviceUuid: string) {
    return this.http.get<CustomHttpResponse<ServiceDTO>>(environment.SERVICE_URL + serviceUuid + '/service')
  }
}
