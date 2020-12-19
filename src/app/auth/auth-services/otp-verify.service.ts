import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomHttpResponse } from '@models/custom.response';
import { AuthToken, OtpData } from '../models/auth';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OtpVerifyService {

  constructor(private http: HttpClient) { }

  /** OtpVerifyService POST REQUEST  START*/
  
  public verifyUser(data: OtpData) {
    return this.http.post<CustomHttpResponse<AuthToken>>(environment.USER_URL + 'verify/', data)
  } //AFTER SIGNUP VERIFY USER 

  public generateOtp(sendOtp: OtpData) {
    return this.http.post<CustomHttpResponse<any>>(environment.USER_URL + 'otp/generate', sendOtp)
  } // OTP GENREATE API

  /** OtpVerifyService POST REQUEST  END*/
}
