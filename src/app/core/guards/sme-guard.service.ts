import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { TokenService } from '@services/token/token.service';

@Injectable({
  providedIn: 'root'
})
export class SmeGuardService implements CanActivate {

  // IT CHECK ONLY THE USER HAS SME FROM TOKEN
  constructor(private token: TokenService, private router: Router) { }

  canActivate(): boolean {
    if (this.token.isSME()) {
      return true
    }
    this.router.navigate(['/'])
  }
}
