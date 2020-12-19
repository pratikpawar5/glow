import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CustomHttpResponse } from '@models/custom.response';
import { AuthToken, Credentials, OtpData } from '../models/auth';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { ResetPassword } from '@models/user';
const CACHE_SIZE = 1;

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private userDetail$: Observable<any>

  constructor(private http: HttpClient) { }

  /** Login POST REQUEST  START*/
  login(credentials: Credentials) {
    return this.http.post<CustomHttpResponse<AuthToken>>(environment.USER_URL + 'login', credentials)
  } //IT IS USED TO LOGIN WITH PASSWORD

  loginWithOTP(otpData: OtpData) {
    return this.http.post<CustomHttpResponse<AuthToken>>(environment.USER_URL + 'login/otp', otpData)
  } //IT IS USED TO LOGIN WITH OTP

  resetPassword(resetPass: ResetPassword, otp: string) {
    return this.http.post<CustomHttpResponse<any>>(environment.USER_URL + 'password/reset', resetPass, { params: { otp: otp } })
  } //IT IS USED TO RESET PASSWORD WITH OTP


  googleSocialLogin(data) {
    return this.http.post<CustomHttpResponse<any>>(environment.USER_URL + 'login/google', data)
  } //IT IS USED FOR LOGIN WITH GOOGLE [SOCIAL LOGIN]

  facebookSocialLogin(fbdata) {
    return this.http.post<CustomHttpResponse<any>>(environment.USER_URL + 'login/facebook', fbdata)
  } //IT IS USED FOR LOGIN WITH FACEBOOK [SOCIAL LOGIN]

  /** Login POST REQUEST  END*/


  /** Login GET REQUEST  START*/
  public getUserVo(uuid: string) {
    if (!this.userDetail$) {
      this.userDetail$ = this.http.get<CustomHttpResponse<any>>(environment.USER_URL + uuid + '/basic-info').pipe(
        shareReplay(CACHE_SIZE)
      )
    }
    return this.userDetail$; //IT IS USED FOR GET USER BASIC INFO
  }
  /** Login GET REQUEST  END*/
}
