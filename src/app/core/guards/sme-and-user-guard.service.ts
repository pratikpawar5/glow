import { Injectable } from '@angular/core';
import { TokenService } from '@services/token/token.service';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SmeAndUserGuardService implements CanActivate{
  //IT CHECKS THE USER TYPE FROM TOKEN IS NORMAL USER OR IS SME USER
  constructor(private token: TokenService, private router: Router) { }

  canActivate(): boolean {
    if (this.token.isNormalUser() || this.token.isSME()) {
      return true
    }
    this.router.navigate(['/'])
  }
}
