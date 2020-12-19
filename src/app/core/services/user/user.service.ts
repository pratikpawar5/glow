import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserUpdate, User } from '@models/user';
import { CustomHttpResponse } from '@models/custom.response';
import { AuthToken } from 'app/auth/models/auth';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  /*POST API START*/
  public uploadProfileImage(uploadFormData) {
    return this.http.post<CustomHttpResponse<AuthToken>>(environment.USER_URL + 'upload/profile/image', uploadFormData)
  }
  public sendOtp(userUpdateObj: UserUpdate): Observable<any> {
    return this.http.post(environment.USER_URL + 'send/otp', userUpdateObj, { observe: 'response' })
  }

  public checkExistEmailAndMobileAndSendOtp(userUpdate: UserUpdate) {
    return this.http.post<CustomHttpResponse<any>>(environment.USER_URL + 'check/username/otp/generate', userUpdate)
  }
  /*POST API END*/

  /*GET API START*/
  public getUserProfile() {
    return this.http.get<CustomHttpResponse<User>>(environment.USER_URL+'account')
  }
  
  /*GET API  END*/

  /*PUT API START*/
  public updateFullName(userUpdateObj: UserUpdate) {
    return this.http.put<CustomHttpResponse<AuthToken>>(environment.USER_URL + 'fullname', userUpdateObj)
  }
  public updateUsername(userUpdateObj: UserUpdate, otp: string) {
    return this.http.put<CustomHttpResponse<any>>(environment.USER_URL + 'username', userUpdateObj, { params: { otp: otp } })
  }
  /*PUT API END*/

  /*DELETE API START*/
  public removeProfileImage(): Observable<any> {
    return this.http.delete(environment.USER_URL + 'remove/profile/image')
  }
  /*DELETE API END*/

}
