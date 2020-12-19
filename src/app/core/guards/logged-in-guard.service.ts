import { Injectable } from '@angular/core';
import { TokenService } from '@services/token/token.service';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AuthRouteComponent } from 'app/auth/auth-route/auth-route.component';
import { DialogService } from '@services/mat-dialog/dialog.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuardService implements CanActivate {
//THE PURPOSE OF THIS SERVICE IS TO IF THE USER IS LOGGED-IN THEN HE CAN ACCESS THE FEATURES THAT IS FOR AVAILABLE TO USER AFTER LOGIN.
//CHECK THE USER IS LOGGED-IN OR NOT  
constructor(private token: TokenService, private router: Router,
    private matDialog: MatDialog, private dialog: DialogService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.token.isLoggedIn()) {
      return true;
    } else {
      this.router.navigateByUrl('/')
      let ref = this.matDialog.open(AuthRouteComponent, this.dialog.loginConfig())
      ref.afterClosed().subscribe(
        res => {
          if (res) {
            this.router.navigateByUrl(state.url)
          }
        }
      )
    }
  }

}
