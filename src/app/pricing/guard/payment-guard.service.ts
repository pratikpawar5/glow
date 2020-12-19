import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from '@services/token/token.service';
import { PricingModule } from '../pricing.module';

@Injectable({
  providedIn: PricingModule
})
export class PaymentGuardService implements CanActivate {

  constructor(private token: TokenService,private router:Router) { }

  canActivate() {

    if (this.token.isLoggedIn()) {
      if (this.token.isNormalUser() || this.token.isSME()) {
        return true
      }
    }
    this.router.navigateByUrl('/')
    return false
  }
}
