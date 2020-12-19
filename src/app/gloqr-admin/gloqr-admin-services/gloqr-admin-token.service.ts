import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { GloqrAdminModule } from '../gloqr-admin.module';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtToken } from '@models/token';

const SUPER_TOKEN_KEY = 's_Token';

@Injectable({
  providedIn: GloqrAdminModule
})
export class GloqrAdminTokenService {

  //this service is use for gloqr admin token service 


  private login: BehaviorSubject<boolean>;

  constructor(private router: Router) {
    if (localStorage.getItem(SUPER_TOKEN_KEY)) {
      this.login = new BehaviorSubject<boolean>(true)
    } else {
      this.login = new BehaviorSubject<boolean>(false)
    }
  }

  private decodeToken(): JwtToken {
    let jwtHelper: JwtHelperService = new JwtHelperService()
    let token: JwtToken = jwtHelper.decodeToken(localStorage.getItem(SUPER_TOKEN_KEY))
    return token
  }

  public isLoggedIn(): Observable<boolean> {
    return this.login.asObservable();
  }

  public checkLoggedIn(): boolean {
    return this.login.getValue();
  }

  public clearTokenAndLogout() {
    localStorage.removeItem(SUPER_TOKEN_KEY)
    this.login.next(false)
    this.router.navigate(['/'])
  }

  public setSuperAdminToken(token: string) {
    localStorage.setItem(SUPER_TOKEN_KEY, token)
    this.login.next(true)
  }

  public getSuperAdminToken(): string {
    return localStorage.getItem(SUPER_TOKEN_KEY)
  }

  public isSuperAdmin(): boolean {
    return this.decodeToken().role === 'ROLE_GLOQR-SUPER-ADMIN';
  }

  public isGloqrAdminPune(): boolean {
    return this.decodeToken().role === 'ROLE_GLOQR-ADMIN-PUNE';
  }

  public isGloqrUser():boolean{
    return this.decodeToken().usertype === 'GLOQR';
  }
}
