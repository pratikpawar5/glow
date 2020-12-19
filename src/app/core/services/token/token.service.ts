import { Injectable } from '@angular/core';
import { JwtToken } from '@models/token';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

const AUTH_TOKEN = "T"

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private login: BehaviorSubject<boolean>;

  constructor(private router: Router) {
    if (localStorage.getItem(AUTH_TOKEN)) {
      this.login = new BehaviorSubject<boolean>(true)
    } else {
      this.login = new BehaviorSubject<boolean>(false)
    }
  }

  private decodeToken(): JwtToken {
    let jwtHelper: JwtHelperService = new JwtHelperService()
    let token: JwtToken = jwtHelper.decodeToken(localStorage.getItem(AUTH_TOKEN))
    return token
  }

  public checkLogin(): Observable<boolean> {
    return this.login.asObservable()
  }

  public isLoggedIn(): boolean {
    return this.login.value;
  }

  public clearTokenAndLogout() {
    localStorage.removeItem(AUTH_TOKEN)
    localStorage.removeItem('searchHistory')
    this.login.next(false)
    this.router.navigateByUrl('/')
    window.location.reload()
  }

  public setToken(token: string) {
    localStorage.setItem(AUTH_TOKEN, token)
    this.login.next(true)
  }

  public getToken(): string {
    return localStorage.getItem(AUTH_TOKEN)
  }

  public updateToken(token: string) {
    localStorage.setItem(AUTH_TOKEN, token)
  }
  
  public isSME(): boolean {
    return this.decodeToken().usertype === 'SME'
  }

  public isNormalUser(): boolean {
    return this.decodeToken().usertype == 'NORMAL'
  }

  public getSmeId(): string {
    return this.decodeToken().smeid;
  }

  public getUserId(): string {
    return this.decodeToken().uuid;
  }

  public getUserName(): string {
    return this.decodeToken().name;
  }

  public getProfileImage(): string {
    return this.decodeToken().profileImage;
  }

  public getUserRole(): string {
    return this.decodeToken().role;
  }


}
