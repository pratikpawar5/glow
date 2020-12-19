import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomHttpResponse } from '@models/custom.response';
import { environment } from 'environments/environment';
import { User, RegisterUser } from '@models/user';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private http: HttpClient) { }

  /** SignUpService POST REQUEST  END*/
  public signup(registerUser: RegisterUser) {
    return this.http.post<CustomHttpResponse<RegisterUser>>(environment.USER_URL + 'signup', registerUser)
  } // FOR SIGN UP ON GLQOR
  /** SignUpService POST REQUEST  END*/
}
