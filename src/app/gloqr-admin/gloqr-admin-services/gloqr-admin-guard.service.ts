import { Injectable } from '@angular/core';
import { GloqrAdminTokenService } from './gloqr-admin-token.service';
import { Router, CanActivate} from '@angular/router';
import { GloqrAdminModule } from '../gloqr-admin.module';

@Injectable({
  providedIn: GloqrAdminModule
})
export class GloqrAdminGuardService implements CanActivate {

  //this service is use to check the user is logged in or not
  constructor(private token: GloqrAdminTokenService, private router: Router) { }

  canActivate(): boolean {
    if (this.token.checkLoggedIn()) {
      return true
    }
    this.router.navigate(['/gloqr-admin/login'])
  }
}
