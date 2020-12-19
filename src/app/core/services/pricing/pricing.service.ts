import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomHttpResponse } from '@models/custom.response';
import { UserPricing, PricingTable, CreditType, PricingHistory } from '@models/pricing';
import { environment } from 'environments/environment';
import { PlanCosting, CreditsResponse, PaymentRequest } from '@models/payment';

@Injectable({
  providedIn: 'root'
})
export class PricingService {

  constructor(private http: HttpClient) { }

  pricingPlans() {
    return this.http.get<CustomHttpResponse<PricingTable>>(environment.PRICING_URL + 'plans')
  }

  userPricing() {
    return this.http.get<CustomHttpResponse<UserPricing>>(environment.PRICING_URL + 'user')
  }

  planCosting(request: PaymentRequest) {
    return this.http.post<CustomHttpResponse<any>>(environment.PRICING_URL + 'plan-cost', request)
  }

  checkCredits(creditType: CreditType) {
    return this.http.get<CustomHttpResponse<CreditsResponse>>(environment.PRICING_URL + 'credits', { params: { type: creditType } })
  }

  creditConsumptions(page: number, filterBy: string,sortBy: string) {
    return this.http.get<CustomHttpResponse<Array<PricingHistory>>>(
      environment.PRICING_URL + 'credit-consumptions', { params: { page: page.toLocaleString(), filterBy: filterBy,sortBy:sortBy } })
  }

}
