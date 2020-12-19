import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomHttpResponse } from '@models/custom.response';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SmeAddressService {

  constructor(private http:HttpClient) { }

  public getCountries() {
    return this.http.get<CustomHttpResponse<any>>(environment.COMMON_SERVICE_URL + 'countries')
  }

  public getStates(countryCode: string) {
    return this.http.get<CustomHttpResponse<any>>(environment.COMMON_SERVICE_URL + 'states', { params: { code: countryCode } })
  }

  public getCities(stateCode: string) {
    return this.http.get<CustomHttpResponse<any>>(environment.COMMON_SERVICE_URL + 'cities', { params: { code: stateCode } })
  }
}
