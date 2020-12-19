import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreditsCosting } from '@models/pricing';
import { CustomHttpResponse } from '@models/custom.response';
import { environment } from 'environments/environment';
import { CreatePayment, PaymentRequest, CapturePayment } from '@models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  public creditsPrice(credits: string, creditType: string) {
    return this.http.get<CustomHttpResponse<CreditsCosting>>(environment.PAYMENT_URL + 'credits-cost',
      { params: { credits: credits, type: creditType } })
  }

  public createOfflinePayment(formData: FormData) {
    return this.http.post<CustomHttpResponse<any>>(environment.PAYMENT_URL + 'offline', formData)
  }

  public createPayment(request: PaymentRequest) {
    return this.http.post<CustomHttpResponse<CreatePayment>>(environment.PAYMENT_URL + 'make', request)
  }

  public capturePayment(request: CapturePayment) {
    return this.http.post<CustomHttpResponse<string>>(environment.PAYMENT_URL + 'capture', request)
  }

  public isPaymentCompleted(userUuid: string) {
    return this.http.get<CustomHttpResponse<string>>(environment.PAYMENT_URL + 'check', { params: { u: userUuid } })
  }

}
