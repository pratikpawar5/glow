import { Injectable } from '@angular/core';
import { CustomHttpResponse } from '@models/custom.response';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { City, State, Country } from '@models/sme';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

  public getCountries() {
    return this.http.get<CustomHttpResponse<Array<Country>>>(environment.COMMON_SERVICE_URL + 'countries')
  }

  public getStates(countryCode: string) {
    return this.http.get<CustomHttpResponse<Array<State>>>(environment.COMMON_SERVICE_URL + 'states', { params: { code: countryCode } })
  }

  public getCities(stateCode: string) {
    return this.http.get<CustomHttpResponse<Array<City>>>(environment.COMMON_SERVICE_URL + 'cities', { params: { code: stateCode } })
  }

  public getStatesForJobs() {
    return this.http.get<CustomHttpResponse<any>>(environment.COMMON_SERVICE_URL + 'india/states')
  }

  public getCitiesInVacancy()
  {
    return this.http.get<CustomHttpResponse<any>>(environment.COMMON_SERVICE_URL + 'india/cities')
  }
  public saveContactUs(contactUs: any) {
    return this.http.post<CustomHttpResponse<string>>(environment.COMMON_SERVICE_URL + 'contact-us',contactUs)
  }
  public updateAddressInfo(formData) {
    return this.http.put<CustomHttpResponse<any>>(environment.SME_INFORMATION_URL + 'address', formData)
  }
}
