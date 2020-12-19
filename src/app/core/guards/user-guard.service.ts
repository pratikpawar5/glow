import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { TokenService } from '@services/token/token.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuardService implements CanActivate {
  // IT CHECK ONLY THE USER  NORMAL USER ACCORDING TO THEIR USER TYPE FROM TOKEN

  constructor(private token: TokenService, private router: Router) { }

  canActivate(): boolean {
    if (this.token.isNormalUser()) {
      return true
    }
    this.router.navigate(['/'])
  }

}