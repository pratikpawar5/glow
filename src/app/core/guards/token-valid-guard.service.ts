import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router, CanActivate } from '@angular/router';
import { TokenService } from '@services/token/token.service';

@Injectable({
  providedIn: 'root'
})
export class TokenValidGuardService implements CanActivate {
  //IT CHECK THE USER IS LOGGED-IN OR TOKEN IS EXPIRED
  constructor(private jwt: JwtHelperService, private token: TokenService,
    private router: Router) { }

  canActivate() {

    if (this.token.isLoggedIn() && this.jwt.isTokenExpired(this.token.getToken())) {
      this.token.clearTokenAndLogout();
      this.router.navigateByUrl('/');
    }
    return true;
  }

}
