import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SmeEntity } from '@models/sme';
import { environment } from 'environments/environment';
import { CustomHttpResponse } from '@models/custom.response';
import { Observable } from 'rxjs';
import { SmeAdminModule } from '../sme-admin.module';

@Injectable({
  providedIn: SmeAdminModule
})
export class SmeAdminServiceService {

  constructor(private http: HttpClient) { }

  /*PUT SERVICE START*/
  public publishSmeInfo(smeItems: Array<SmeEntity>, itemType: any){
    return this.http.put<CustomHttpResponse<SmeEntity>>(environment.SME_INFORMATION_URL + 'sme/modify-status-of-sub-entities', smeItems, { params: { itemType: itemType } })
  }

  public publishProduct(publishData: Array<SmeEntity>){
    return this.http.put<CustomHttpResponse<SmeEntity>>(environment.PRODUCT_URL + 'product', publishData)
  }

  public publishService(publishData: Array<SmeEntity>) {
    return this.http.put<CustomHttpResponse<SmeEntity>>(environment.SERVICE_URL + 'service', publishData)
  }

  public publishVacancy(sUuid: string, publishData: Array<SmeEntity>): Observable<any> {
    return this.http.put(environment.JOBS_URL + sUuid + '/sme/' + ' ' + '/vacancy', publishData)
  }
  /*PUT SERVICE END*/
  
}
