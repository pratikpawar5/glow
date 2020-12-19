import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { GloqrAdminTokenService } from './gloqr-admin-token.service';
import { GloqrAdminModule } from '../gloqr-admin.module';

@Injectable({
  providedIn: GloqrAdminModule
})
export class AccessLevelService implements CanActivate {

  //this service used  for access rights is only give to Gloqr Super Admin Module
  constructor(private gloqrAdminToken: GloqrAdminTokenService, private router: Router) { }
  canActivate(): boolean {
    if (this.gloqrAdminToken.isSuperAdmin()) {
      return true
    }
    else {
      this.router.navigateByUrl('/gloqr-admin/new-smes');
    }

  }
}
