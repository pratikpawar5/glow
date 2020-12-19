import { Injectable } from '@angular/core';
import { ProductModule } from '../product.module';
import { HttpClient } from '@angular/common/http';
import { CustomHttpResponse } from '@models/custom.response';
import { Product, ProductResponse } from '@models/product';
import { environment } from 'environments/environment';
import { FilterResult } from '@models/filter';

@Injectable({
  providedIn: ProductModule
})
export class LazyProductService {

  constructor(private http: HttpClient) { }

  public productDetail(productUuid: string) {
    return this.http.get<CustomHttpResponse<Product>>(environment.PRODUCT_URL + productUuid + '/product')
  }

  public similarProducts(subCategoryUuid: string, productUuid: string) {
    return this.http.get<CustomHttpResponse<Array<ProductResponse>>>(environment.PRODUCT_URL + 'similar',
      { params: { s: subCategoryUuid, p: productUuid } })
  }

  public productsByCategory(url: string, page: string) {
    return this.http.get<CustomHttpResponse<FilterResult<ProductResponse>>>(environment.SEARCH_URL + url,
      { params: { page: page } })
  }

}
