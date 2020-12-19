import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomHttpResponse } from '@models/custom.response';
import { environment } from 'environments/environment';
import { ServiceResponse, ServiceCategory } from '@models/service';
import { ProductResponse, ProductCategory } from '@models/product';
import { SMECircleDto } from '@models/business-circle';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { SMEFilterDto } from '@models/sme';
import { JobFilter } from '@models/jobs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private serviceCategory$: Observable<CustomHttpResponse<Array<ServiceCategory>>>
  private productCategory$: Observable<CustomHttpResponse<Array<ProductCategory>>>

  constructor(private http: HttpClient) { }

  public services() {
    return this.http.get<CustomHttpResponse<Array<ServiceResponse>>>(environment.SERVICE_URL + 'top');
  }

  public topProducts() {
    return this.http.get<CustomHttpResponse<Array<ProductResponse>>>(environment.PRODUCT_URL + 'top');
  }

  public topJobs()
  {
    return this.http.get<CustomHttpResponse<Array<any>>>(environment.JOBS_URL + 'top');
  }

  public topSmes() {
    return this.http.get<CustomHttpResponse<Array<any>>>(environment.SME_INFORMATION_URL + 'top')
  }

  public topSmesWithLogin() {
    return this.http.get<CustomHttpResponse<Array<SMECircleDto>>>(environment.CIRCLE_URL + "top-smes")
  }

  public smeCategoriesDto() {
    return this.http.get<CustomHttpResponse<SMEFilterDto>>(environment.SME_INFORMATION_URL + "menu/filter")
  }

  public vacancyCategories() {
    return this.http.get<CustomHttpResponse<JobFilter>>(environment.JOBS_URL + 'menu/filter')
  }
  
  public productCategories() {
    this.productCategory$ = this.http.
      get<CustomHttpResponse<Array<ProductCategory>>>(environment.PRODUCT_URL + 'nav-categories')
      .pipe(
        shareReplay(1)
      );
    return this.productCategory$
  }

  public serviceCategories() {
    this.serviceCategory$ = this.http.
      get<CustomHttpResponse<Array<ServiceCategory>>>(environment.SERVICE_URL + 'nav-categories')
      .pipe(
        shareReplay(1)
      );;
    return this.serviceCategory$;
  }

  public sentConnectionRequest(circle) {
    return this.http.post<CustomHttpResponse<any>>(environment.CIRCLE_URL + 'send-request', circle)
  }

  public serviceCategoriesObservable() {
    return this.serviceCategory$;
  }

  public productCategoriesObservable() {
    return this.productCategory$;
  }
}
