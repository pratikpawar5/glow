import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomHttpResponse } from '@models/custom.response';
import { ProductDTO } from '@models/product';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public productDetail(productUuid: string) {
    return this.http.get<CustomHttpResponse<ProductDTO>>(environment.PRODUCT_URL + productUuid + '/product')
  }
}
