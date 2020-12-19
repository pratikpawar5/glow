import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BusinessInterest, CartFilterCount } from '@models/cart';
import { environment } from 'environments/environment';
import { CustomHttpResponse } from '@models/custom.response';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private url = environment.CART_URL
  private cartCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private sentCartCount: BehaviorSubject<CartFilterCount> = new BehaviorSubject<CartFilterCount>({
    activeCount: 0,
    deliveredCount: 0,
    rejectedCount: 0,
    activeGMV:0,
    rejectedGMV:0,
    deliveredGMV:0
  });

  private receiveCartCount: BehaviorSubject<CartFilterCount> = new BehaviorSubject<CartFilterCount>({
    activeCount: 0,
    deliveredCount: 0,
    rejectedCount: 0,
    activeGMV:0,
    rejectedGMV:0,
    deliveredGMV:0
  });

  constructor(private http: HttpClient) { }

  public generateBI(businessInterest: BusinessInterest) {
    return this.http.post<CustomHttpResponse<string>>(this.url + 'business-interest', businessInterest)
  }

  public countFromSever() {
    this.http.get<CustomHttpResponse<any>>(this.url + 'count').subscribe(
      res => {
        if (res.error) {

        } else {
          this.cartCount.next(res.data.count)
        }
      }
    )
  }

  public getCartCount(): Observable<number> {
    return this.cartCount.asObservable()
  }

  public setCartCount(count: number) {
    this.cartCount.next(this.cartCount.value + count)
  }

  public decrementCartCount() {
    this.cartCount.next(this.cartCount.value - 1)
  }

  public setSentCartCount(cartFilterCount:CartFilterCount){
    this.sentCartCount.next(cartFilterCount)
  }

  public setReceivedCartCount(cartFilterCount:CartFilterCount){
    this.receiveCartCount.next(cartFilterCount)
  }

  public getReceivedCartCount(): Observable<CartFilterCount> {
    return this.receiveCartCount.asObservable()
  }

  public getSentCartCount(): Observable<CartFilterCount> {
    return this.sentCartCount.asObservable()
  }

}
