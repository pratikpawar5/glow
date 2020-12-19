import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { CustomHttpResponse } from '@models/custom.response';
import { CartModule } from '../cart.module';
import { Cart, CartState, SecondStage, RejectRequest, FileResponse, ThirdStage } from '@models/cart';
import { User } from '@models/user';

@Injectable({
  providedIn: CartModule
})
export class LazyCartService {

  private url: string = environment.CART_URL

  constructor(private http: HttpClient) { }

  public receivedCartItems(page: any, cartState: CartState) {
    return this.http.get<CustomHttpResponse<Cart>>(this.url + 'received-items',
      { params: { page: page, state: cartState } });
  }

  public sentCartItems(page: any, cartState: CartState) {
    return this.http.get<CustomHttpResponse<Cart>>(this.url + 'sent-items',
      { params: { page: page, state: cartState } });
  }

  // SME Actions

  public viewUserDetails(cartUuid: string) {
    return this.http.get<CustomHttpResponse<User>>(this.url + cartUuid + '/items/user-details');
  }

  public acceptOrder(formData: FormData) {
    return this.http.post<CustomHttpResponse<SecondStage>>(this.url + 'accept-order', formData)
  }

  public rejectOrder(rejectOrder: RejectRequest) {
    return this.http.put<CustomHttpResponse<string>>(this.url + 'reject-order', rejectOrder)
  }

  public rejectPurchaseOrder(rejectOrder: RejectRequest) {
    return this.http.put<CustomHttpResponse<string>>(this.url + 'reject-purchase-order', rejectOrder)
  }

  public confirmOrder(cartUuid: string) {
    return this.http.put<CustomHttpResponse<string>>(this.url + cartUuid + '/items/confirm-order', null)
  }

  public generateQuotation(cartUuid: string) {
    return this.http.get<CustomHttpResponse<FileResponse>>(this.url + cartUuid + '/items/generate-quotation')
  }


  // User Actions

  public acceptQuotation(formData: FormData) {
    return this.http.post<CustomHttpResponse<ThirdStage>>(this.url + 'accept-quotation', formData)
  }

  public rejectQuotation(rejectOrder: RejectRequest) {
    return this.http.put<CustomHttpResponse<string>>(this.url + 'reject-quotation', rejectOrder)
  }

}
